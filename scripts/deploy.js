async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
  
    const tpo = await ethers.getContractFactory("Tpo");
    const token = await tpo.deploy(50000000);
    
    console.log("合约地址 :", token.target);

  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });