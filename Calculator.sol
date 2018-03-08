pragma solidity ^0.4.17;

contract Calculator {
    uint number;

    function Calculator(uint val) public {
        number = val;
    }

    function getVal() public constant returns(uint) {
        return number;
    }

    function addNumber(uint val) public {
        number += val;
    }

    function subNumber(uint val) public {
        number -= val;
    }
}