const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Tpo init", function () {
    async function getData() {
        const [owner,add1] = await ethers.getSigners();
        const tpo = await ethers.getContractFactory("Tpo");
        const token = await tpo.deploy(50000000);
        const decimals = await token.decimals();
        return { owner,add1, token, decimals};
    }
    
    it("Should mint initial supply to deployer", async function () {
      const { owner, token ,decimals } = await loadFixture(getData);

      console.log("Token address:", token.target);
      console.log("Token deployed to:", await token.totalSupply());
      console.log("owner.address:", owner.address);

      const expectedBalance = 50000000n * (10n ** BigInt(decimals));

      expect(await token.balanceOf(owner.address)).to.equal(expectedBalance);
    });

    describe("get_mailgas_num", function () {
      it(" It should be the initialized value 5 * 10 ** decimals()", async function () {
        const {token ,decimals} = await loadFixture(getData);
        const mailgas_num = await token.get_mailgas_num();
        expect(5n * (10n ** BigInt(decimals))).to.equal(mailgas_num);
      });
    });

    describe("set_mailgas_num", function () {
      it(" The value should be ", async function () {
        const {token ,decimals} = await loadFixture(getData);
        await token.set_mailgas_num(10);
        const mailgas_num = await token.get_mailgas_num();
        expect(10n * (10n ** BigInt(decimals))).to.equal(mailgas_num);
      });
    });

    describe("mailgas", function () {
      it(" Mail deduction ", async function () {
        const {owner ,token ,decimals} = await loadFixture(getData);
        const mailgas_num = await token.get_mailgas_num();
        await token.connect(owner).approve(token.target, mailgas_num);
        await token.connect(owner).mailgas();
        const owner_balance = await token.balanceOf(owner.address);
        expect(50000000n * (10n ** BigInt(decimals)) - mailgas_num).to.equal(owner_balance);
      });
    });
});