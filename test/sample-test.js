const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Feed", async function () {
  it("Should create a post", async function () {
    const Feed = await ethers.getContractFactory("Feed")
    const feed = await Feed.deploy("My feed")
    await feed.deployed()
    await feed.createPost("Me as author", "My first title", "CONTENT OF 1st post")

    const posts = await feed.viewData()
    expect(posts[0].title).to.equal("My first title")
  })

})
