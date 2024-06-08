pragma solidity 0.8.4; //Do not change the solidity version as it negativly impacts submission grading
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "./YourToken.sol";
import "hardhat/console.sol";

contract Vendor is Ownable {
	uint256 public constant tokensPerEth = 100;

	event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
	event SellTokens(
		address seller,
		uint256 amountOfTokens,
		uint256 amountOfETH
	);

	YourToken public yourToken;

	constructor(address tokenAddress) {
		transferOwnership(msg.sender);

		yourToken = YourToken(tokenAddress);
	}

	// ToDo: create a payable buyTokens() function:
	function buyTokens() public payable {
		require(msg.value > 0, "ETH is required for transaction!");
		uint256 amountOfTokens = msg.value * tokensPerEth;

		require(
			yourToken.balanceOf(address(this)) >= amountOfTokens,
			"Not enough tokens in the contract!"
		);
		yourToken.transfer(msg.sender, amountOfTokens);

		emit BuyTokens(msg.sender, msg.value, amountOfTokens);
	}

	// ToDo: create a withdraw() function that lets the owner withdraw ETH
	function withdraw() public onlyOwner {
		uint256 balance = address(this).balance;
		require(balance > 0, "No balance!");

		transfer(payable(msg.sender), address(this).balance);
	}

	// ToDo: create a sellTokens(uint256 _amount) function:
	function sellTokens(uint256 _amount) public {
		require(_amount > 0, "Amount must be greater than zero!");
		require(
			yourToken.balanceOf(msg.sender) >= _amount,
			"You cannot sell more than you own!"
		);

		uint256 ethAmount = _amount / tokensPerEth;
		require(
			address(this).balance >= ethAmount,
			"Contract does not have enough ETH!"
		);

		yourToken.transferFrom(msg.sender, address(this), _amount);
		transfer(payable(msg.sender), ethAmount);

		emit SellTokens(msg.sender, _amount, ethAmount);
	}

	function transfer(address payable _to, uint256 _amount) public {
		(bool success, ) = _to.call{ value: _amount }("");

		require(success, "Failed to send Ether!");
	}

	function transferOwnership(address newOwner) public override onlyOwner {
		super.transferOwnership(newOwner);
	}
}
