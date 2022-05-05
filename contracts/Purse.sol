//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

//import  "./Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
 
contract Purse is Ownable {
    
    event MoneySent(address indexed _beneficiary, uint _amount);
    event MoneyReceived(address indexed _from, uint _amount);

     constructor (address owner) {
        transferOwnership(owner);
    }    

    function withdrawMoney(address payable _to, uint _amount) public onlyOwner {
         require(_amount <= address(this).balance, "Contract doesn't own enough money");
         require(_amount > 0, "Amount has to be bigger than 0");
         require(_to != address(0));
         emit MoneySent(_to, _amount);
        _to.transfer(_amount);
    }

    function getBalance () public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }

     function renounceOwnership() public pure override  {
        revert("can't renounceOwnership here"); 
    }


}