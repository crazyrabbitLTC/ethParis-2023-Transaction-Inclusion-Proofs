// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract TransactionPoster {

    // The EVENT is not used
    event TransactionPosted(bytes32 pendingSafeTx);

    function postTransactionHash(bytes32 pendingSafeTx) public {
        emit TransactionPosted(pendingSafeTx);
    }
}
