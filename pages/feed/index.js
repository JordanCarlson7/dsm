/*********IMPORTS */
import { useContext, Fragment, useState, useEffect } from "react";
import { css } from "@emotion/css";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Link from "next/link";
/*******CONTRACT */
import { contractAddress, ownerAddress } from "../../config";
import Feed from "../../artifacts/contracts/Feed.sol/Feed.json";
/*******CONTRACT */
/*******COMPONENTS */
import FeedCom from "../../components/Feed/feed-com";
import NewButton from "../../components/Post/new-button";
/*******COMPONENTS */
import PostForm from "../../components/Post/post-form";
/*********IMPORTS */
/**************PAGE */
function Posts(props) {
  const { initialPosts } = props;
  const reverse = initialPosts.sort((a,b) => {return b[0].hex - a[0].hex})
  const length = initialPosts.length;
  const [posts, setPosts] = useState(reverse);
  const [isModal, setIsModal] = useState(false);
  

 

  /**********HANDLERS************************ */
     function createPostHandler() {
      console.log("new post Click");
      setIsModal(!isModal);
    }
    /**********HANDLERS************************ */

  /**********TEMPLATE************************ */
  return (
    <Fragment>
      {isModal && <PostForm></PostForm>}
      {!isModal && posts.map((post, index) => (
        <FeedCom
          key={index}
          num={length - index}
          author={post[1]}
          title={post[2]}
          content={post[3]}
        ></FeedCom>
      ))}
      <NewButton modal={isModal} click={createPostHandler}/>
      <button onClick={createPostHandler}>CLICK TEST</button>
    </Fragment>
  );
  /**********TEMPLATE************************ */
}
/******************REACT SUPPORT********** */
export async function getServerSideProps() {
  /* here we check to see the current environment variable */
  /* and render a provider based on the environment we're in */
  let provider;
  if (process.env.ENVIRONMENT === "local") {
    provider = new ethers.providers.JsonRpcProvider();
  }
  // else if (process.env.ENVIRONMENT === 'testnet') {
  //   provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  // }
  // else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  // }

  const contract = new ethers.Contract(contractAddress, Feed.abi, provider);
  const data = await contract.viewData();
  return {
    props: {
     initialPosts: JSON.parse(JSON.stringify(data))
    },
  };
}
/******************REACT SUPPORT********** */
export default Posts;
