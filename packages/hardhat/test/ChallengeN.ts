//
// This script executes when you run 'yarn test'
//

import { ethers } from "hardhat";
import { YourCollectible } from "../typechain-types/contracts/YourCollectible";
import { expect } from "chai";
import { Transaction } from "ethers";

describe("YourCollectible", function () {
  let yourCollectible: YourCollectible;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const YourCollectible = await ethers.getContractFactory("YourCollectible");
    yourCollectible = await YourCollectible.deploy(owner.address);
    await yourCollectible.waitForDeployment();
  });

  it("should analyze generateSVG function", async function () {
    // First, mint an NFT
    await yourCollectible.requestMint();
    await yourCollectible.fulfillMint(1);

    // Call generateSVG
    const svg = await yourCollectible.generateSVG(1);
    console.log("SVG length:", svg.length);

    // Estimate gas (this doesn't reflect actual cost for external calls)
    const estimatedGas = await yourCollectible.generateSVG.estimateGas(1);
    console.log("Estimated gas for generateSVG (if called internally):", estimatedGas.toString());

    // You can add assertions here if needed
    // expect(svg).to.include("<svg");
    // expect(estimatedGas).to.be.lt(1000000);  // Example threshold
  });

  it("should measure impact of generateSVG on minting", async function () {
    await yourCollectible.requestMint();

    // Estimate gas for minting (which internally calls generateSVG)
    const estimatedGas = await yourCollectible.fulfillMint.estimateGas(1);
    console.log("Estimated gas for fulfillMint (including generateSVG):", estimatedGas.toString());

    // Perform the actual mint
    const tx = await yourCollectible.fulfillMint(1);
    const receipt = await tx.wait();
    console.log("Actual gas used for fulfillMint:", receipt?.gasUsed.toString());
  });
});
