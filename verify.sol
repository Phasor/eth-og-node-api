// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract verify {

address apiAddress = 0x14791697260E4c9A71f18484C9f997B308e59325;

    function splitSignature(bytes memory sig) pure public returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function checkSigner(string memory unhashedMessage, bytes memory sig) view public returns (bool)
    {
        ///hash the input message
        bytes32 message = keccak256(abi.encodePacked(unhashedMessage));
        
        ///split signature
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
        
        ///recover the signing address
        address signer =  ecrecover(message, v, r, s);

        ///check if the url was produced by the API
        return signer == apiAddress;
    }
}