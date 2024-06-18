//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Balloons is ERC20 {
	event Approve(address owner, address spender, uint256 amount);

	constructor() ERC20("Balloons", "BAL") {
		_mint(msg.sender, 1000 ether); // mints 1000 balloons!
	}

	function approve(
		address spender,
		uint256 amount
	) public override returns (bool) {
		bool approved = super.approve(spender, amount);
		emit Approve(msg.sender, spender, amount);

		return approved;
	}
}
