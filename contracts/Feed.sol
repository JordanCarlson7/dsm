//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Feed {
    ///////////////////////////////////
    string public author;
    struct Post {
        uint postId;
        string author; // should be address
        string title;
        string content;
        string hash;
        string name;
    }
   
    ///////////////////////////////////

    ///////////////////////////////////
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;
    Counters.Counter private _aliasIds;
    mapping(uint => Post) private postsById;
    mapping(string => Post) private postsByHash;

    event NewPost(
        uint postId,
        string author,
        string title,
        string content,
        string hash,
        string name
        );
    ///////////////////////////////////

    ///////////////////////////////////    
    constructor(string memory _author) {
        console.log("New Post Contract by: ", _author);
        author = _author;
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
    // function getAlias(string memory _address) public view returns (string memory) {
        
    //     if (bytes(aliasByAddress[_address].name).length < 1 ) {
    //         return "";
    //     }
    //     else { 
    //         return aliasByAddress[_address].name;
    //     }
    // }

    // function createAlias(string memory _alias, string memory _address) public returns (string memory) {
    //     //check if alias exists
    //     if (bytes(_alias).length == 0) {
    //         return "Error No Alias Sent";
    //     }
    //     else if (bytes(aliasByAddress[_address].name).length != 0) {
            
    //         string storage name = aliasByAddress[_address].name;
    //         emit AliasList(name, _address);
    //         return name;
    //     }
    //     //create new alias
    //     //_aliasIds.increment();
    //     //uint id = _aliasIds.current(); //contract keeps track of the ids
    //     AliasI storage aliasI = aliasByAddress[_address];
    //     aliasI.name = _alias;
    //     aliasI._address = _address;
    //     aliasByAddress[_address] = aliasI;
    //     emit AliasList(aliasI.name, aliasI._address);
    //     return aliasI.name;
    // } 
    
    // send the alias along with the post
    function createPost(string memory _author, string memory _title, string memory _content, string memory _hash, string memory _alias) public { //don't store content, only store hash
        _postIds.increment();
        uint id = _postIds.current(); //contract keeps track of the ids
        Post storage post = postsById[id];
        // if (bytes(aliasByAddress[_author].name).length != 0) {
        // post.author = aliasByAddress[_author].name;
        // } else {
        // }
        post.postId = id;
        post.author = _author;
        post.title =_title;
        post.content = _content;
        post.hash = _hash;
        post.name = _alias;
        postsById[id] = post;
        postsByHash[_hash] = post;
        emit NewPost(post.postId, post.author, post.title, post.content, post.hash, post.name);
        // return postsById[id];
        // Post memory currentPost = postsById[id];
        // console.log("Created post:", id, currentPost);
    }
    ///////////////////////////////////    

    ///////////////////////////////////
}
