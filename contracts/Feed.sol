//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Feed {
    ///////////////////////////////////
    address public author;
    struct Post {
        uint id;
        string author;
        string title;
        string content;
    }
    ///////////////////////////////////

    ///////////////////////////////////
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;
    mapping(uint => Post) private postsById;
    ///////////////////////////////////

    ///////////////////////////////////    
    constructor(string memory _author) {
        console.log("New Post by: ", _author);
        // author = _author;
        createPost("test1", "test2","test3");
    }
    ///////////////////////////////////   

    ///////////////////////////////////
    function viewData() public view returns (Post[] memory) {
        uint itemCount = _postIds.current();

        Post[] memory posts = new Post[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Post storage currentItem = postsById[currentId];
            posts[i] = currentItem;
        }
        return posts;
    }

    function createPost(string memory _author, string memory _title, string memory _content) public returns (Post memory) {
        _postIds.increment();
        uint id = _postIds.current();
        postsById[id] = Post(id, _author, _title, _content);
        return postsById[id];
        // Post memory currentPost = postsById[id];
        // console.log("Created post:", id, currentPost);
    }
    ///////////////////////////////////    

    ///////////////////////////////////
}
