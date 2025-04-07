// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 导入 OpenZeppelin 的 ERC20 合约
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tpo is ERC20, ERC20Burnable, Ownable {

    uint private mailgas_num = 0;
    uint private burn_mailgas_num = 0;
    uint private burn_reward_num = 0;
    

    constructor(uint initialSupply) ERC20("TimePostOffice","TPO") Ownable(msg.sender) {
        mailgas_num = 5 * 10 ** decimals();
        _mint(msg.sender, initialSupply  * 10 ** decimals());
    }

    function set_mailgas_num(uint new_mailgas_num) external onlyOwner  {
        mailgas_num = new_mailgas_num * 10 ** decimals();
    }

    function get_mailgas_num() public view returns (uint) {
        return mailgas_num; 
    }

    function mailgas() public {
        require(balanceOf(msg.sender) > mailgas_num, "Insufficient balance");
        burn(mailgas_num);
    }
    
}