// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MyContract {

    string _name;
    uint _balance;

    constructor(string memory name,uint balance){
        require(balance>=500 , "balance must be greater or equal 500");
        _name = name;
        _balance = balance;
    }

    function getMyBalance() public view returns(uint){
        return _balance;
    }

    function getMyName() public view returns(string memory){
        return _name;
    }

    function tagname() public pure returns(string memory){
        return "BlockChain";
    }

    function myDeposite(uint amount) public {
        _balance = _balance + amount;
    }
}