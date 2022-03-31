//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Feed {
    ///////////////////////////////////
    string public author;
    struct Post {
        string author; // should be address
        string title;
        string content;
        string hash;
    }
    ///////////////////////////////////

    ///////////////////////////////////
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;
    mapping(uint => Post) private postsById;
    mapping(string => Post) private postsByHash;

    event NewPost(string author,
        string title,
        string content,
        string hash);
    // event ViewPost(string author, 
    //     string title,
    //     string content,
    //     string hash);
    ///////////////////////////////////

    ///////////////////////////////////    
    constructor(string memory _author) {
        console.log("New Post Contract by: ", _author);
        author = _author;
    }
    ///////////////////////////////////   

    ///////////////////////////////////
    //  function getPostByHash(string memory hash) public {
    //   emit ViewPost(postsByHash[hash]);
    // }

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

    function createPost(string memory _author, string memory _title, string memory _content, string memory _hash) public { //don't store content, only store hash
        _postIds.increment();
        uint id = _postIds.current(); //contract keeps track of the ids
        Post storage post = postsById[id];
        post.author =_author;
        post.title =_title;
        post.content = _content;
        post.hash = _hash;
        postsById[id] = post;
        postsByHash[_hash] = post;
        emit NewPost(post.author, post.title,post.content, post.hash);
        // return postsById[id];
        // Post memory currentPost = postsById[id];
        // console.log("Created post:", id, currentPost);
    }
    ///////////////////////////////////    

    ///////////////////////////////////
}
