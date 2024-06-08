// SPDX-License-Identifier: MIT
pragma solidity 0.8.4; //Do not change the solidity version as it negativly impacts submission grading

import "hardhat/console.sol";
import "./ExampleExternalContract.sol";

contract Staker {
	ExampleExternalContract public exampleExternalContract;

	mapping(address => uint256) public balances;

	event Stake(address indexed sender, uint256 amount);

	uint256 public deadline = block.timestamp + 30 seconds;
	uint256 public currentTimestamp = block.timestamp;
	uint256 public constant threshold = 1 ether;

	bool public openForWithdraw = false;

	constructor(address exampleExternalContractAddress) {
		exampleExternalContract = ExampleExternalContract(
			exampleExternalContractAddress
		);
	}

	// Collect funds in a payable `stake()` function and track individual `balances` with a mapping:
	// (Make sure to add a `Stake(address,uint256)` event and emit it for the frontend `All Stakings` tab to display)
	function stake() public payable {
		require(
			block.timestamp < deadline,
			"Staking is not allowed after deadline has already passed!"
		);

		balances[msg.sender] += msg.value;

		emit Stake(msg.sender, msg.value);
	}

	// After some `deadline` allow anyone to call an `execute()` function
	// If the deadline has passed and the threshold is met, it should call `exampleExternalContract.complete{value: address(this).balance}()`
	function execute() public {
		require(block.timestamp >= deadline, "Deadline has not yet passed!");
		require(
			!openForWithdraw,
			"Deadline has passed and withdraw conditions have already been met!"
		);

		if (address(this).balance >= threshold) {
			exampleExternalContract.complete{ value: address(this).balance }();
		} else {
			openForWithdraw = true;
		}
	}

	// If the `threshold` was not met, allow everyone to call a `withdraw()` function to withdraw their balance
	function withdraw() public payable {
		require(openForWithdraw, "Withdraw not allowed!");
		require(balances[msg.sender] > 0, "No balance to withdraw!");

		uint256 amount = balances[msg.sender];
		balances[msg.sender] = 0;

		transfer(payable(msg.sender), amount);
	}

	function transfer(address payable _to, uint256 _amount) public {
		(bool success, ) = _to.call{ value: _amount }("");
		require(success, "Failed to send Ether");
	}

	// Add a `timeLeft()` view function that returns the time left before the deadline for the frontend
	function timeLeft() public view returns (uint256) {
		return deadline < block.timestamp ? 0 : deadline - block.timestamp;
	}

	// Add the `receive()` special function that receives eth and calls stake()
	receive() external payable {
		stake();
	}
}
