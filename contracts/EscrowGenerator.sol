// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract EscrowsGenerator {

	uint public escrowCount = 0;

	struct Escrow{
		uint id;
		address arbiter;
		address beneficiary;
		address depositor;
		bool isApproved;
		uint balance;
	}
	event Created();
	event Approved(uint);

	mapping (uint => Escrow) public escrows;

	function createEscrow(address _arbiter, address _beneficiary) public payable {
		escrows[escrowCount] = Escrow(escrowCount, _arbiter, _beneficiary, msg.sender, false, msg.value);
		emit Created();
		escrowCount++;
	}

	function approve(uint _id) public {
		Escrow storage escrow = escrows[_id];
		require(msg.sender == escrow.arbiter,"Only arbiter can approve");
		require(!escrow.isApproved, "Escrow already approved");
		uint balance = escrow.balance;
		(bool sent, ) = payable(escrow.beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		escrow.isApproved = true;
	}

	function getEscrows() public view returns (Escrow[] memory) {
    uint count = 0;
    for (uint i = 0; i < escrowCount; i++) {
        Escrow memory escrow = escrows[i];
        if (escrow.arbiter == msg.sender || escrow.beneficiary == msg.sender || escrow.depositor == msg.sender) {
            count++;
        }
    }
    Escrow[] memory results = new Escrow[](count);
    count = 0;
    for (uint i = 0; i < escrowCount; i++) {
        Escrow memory escrow = escrows[i];
        if (escrow.arbiter == msg.sender || escrow.beneficiary == msg.sender || escrow.depositor == msg.sender) {
            results[count] = escrow;
            count++;
        }
    }
    return results;
}
}
