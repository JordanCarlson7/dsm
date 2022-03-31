import classes from "./post-form.module.css";
import { create } from "ipfs-http-client";
import { AccountContext } from "../../store/context";
import { ethers } from "ethers";
import {useContext, useState, useRef} from 'react'
import { useRouter } from 'next/router'
/*******CONTRACT */
import { contractAddress, ownerAddress } from "../../config";
import Feed from "../../compiledContracts/Feed.sol/Feed.json";
/*******CONTRACT */
/**************GLOBALS */
const client = create("https://ipfs.infura.io:5001/api/v0");
/**************GLOBALS */

const PostForm = (props) => {
  const router = useRouter();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [context, setContext] = useContext(AccountContext);
  const titleEl = useRef(null);
  const contentEl = useRef(null);
  const contract = new ethers.Contract(contractAddress, Feed.abi, signer); // need a signer to send transaction
  let post = {
    author: "NO AUTHOR",
    title: "NO TITLE",
    content: "NO CONTENT",
  };
  console.log(contract);
  console.log("account: ", context);
  
  //Saves post and hash to contract
  async function savePostContract(hash) {
    try {
      const res = await contract.createPost( //contract will handle ids
        post.author,
        post.title,
        post.content,
        hash.path,
        post.alias
      ); 
      console.log("CONTRACT CREATEPOST (SUCCESS)", res);
    } catch (err) {
      console.log("CONTRACT CREATEPOST (ERROR)", err);
    }
    console.log("Add Post", post);
    await props.reset();
    props.setEdit(false);
    router.push('/feed');
  }

  //gets ipfs hash
  async function hashIpfs() {
    try {
      //store post data in IPFS and get hash address back
      const hash = await client.add(JSON.stringify(post));
      console.log("IPFS ADD (SUCCESS): ", hash);
      return hash;
    } catch (err) {
      console.log("IPFS ADD (ERROR): ", err);
    }
  }

  //initiate storage on contract and IPFS
  async function submitPostHandler($event) {
    event.preventDefault();
    console.log("IN SUBMIT");
    post.author = context.address;
    post.title = titleEl.current.value;
    post.content = contentEl.current.value;
    post.alias = context.alias;
    console.log('POST -> ', post)

    //get hash identifier for data saved in IPFS
    const hash = await hashIpfs();
    await savePostContract(hash).then((res) => {
      console.log('await', res)
    })
  }

  return (
    <div className={classes.container}>
      <form className={classes.formContainer} onSubmit={submitPostHandler}>
        <label htmlFor="title">Title</label>
        <input
          className={classes.text}
          type="text"
          name="title"
          placeholder="Title"
          ref={titleEl}
        ></input>
        <label htmlFor="content">Content</label>
        <textarea
          className={classes.textArea}
          name="content"
          placeholder="Enter your post here"
          ref={contentEl}
        ></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
export default PostForm;
