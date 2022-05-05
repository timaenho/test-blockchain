//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "./Purse.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PurseFactory {
    
    //owneraddress => purses
    mapping (address => Purse[]) owneraddressToPursesMap;
    mapping (address => bool) addressToFormCompleted;

   function CreateNewPurse() public {
     Purse purse = new Purse(msg.sender);
     owneraddressToPursesMap[msg.sender].push(purse);
   }

   function getPurses() public view returns (Purse[] memory ) {
       Purse [] memory purses ;
       purses = owneraddressToPursesMap[msg.sender];
       return purses;
   }

   function formCompleted () public view returns (bool) {
       bool isCompleted = addressToFormCompleted[msg.sender];
       return isCompleted;
   }
   function setFormCompleted () public {
       addressToFormCompleted[msg.sender] = true;
   }

  

}