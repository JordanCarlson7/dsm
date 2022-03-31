/*********IMPORTS */
import { useContext, Fragment, useState, useEffect } from "react";
import { css } from "@emotion/css";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Link from "next/link";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createClient } from "urql";
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
  const { initialPosts, graph } = props;
  // const reverse = graph.data.newPosts.sort((a, b) => {
  //   return a.id - b.id;
  // });
  const length = initialPosts.length;
  // const [posts, setPosts] = useState(reverse);
  const [graphArray, setGraphArray] = useState(graph.data.newPosts);
  const [isModal, setIsModal] = useState(false);
  console.log(initialPosts);
  console.log("GRAPH: ", graphArray);

  /**********GRAPH************************ */
  const refreshData = async () => {
    const APIURL =
      "https://api.thegraph.com/subgraphs/name/jordancarlson7/dsm?version=current";

    const tokensQuery = `
    {
      newPosts(orderBy: postId, orderDirection: desc) {
        id
        postId
        author
        title
        content
        hash
        name
      }
    }
`;

    const client = createClient({
      url: APIURL,
    });

    const dataGraph = await client.query(tokensQuery).toPromise();
    setGraphArray(dataGraph.data.newPosts);
    /**********URQL************************ */
  };
  /**********GRAPH-CALL************************ */
  /**********GRAPH************************ */
  // useEffect(()=>{console.log('useEffect: ', graphArray)},[graphArray])
  /**********HANDLERS************************ */
  function createPostHandler() {
    console.log("new post Click");
    setIsModal(!isModal);
  }
  /**********HANDLERS************************ */

  /**********TEMPLATE************************ */
  return (
    <div>
      {isModal && (
        <PostForm
          edit={isModal}
          setEdit={setIsModal}
          reset={refreshData}
        ></PostForm>
      )}
      {!isModal &&
        graphArray.map((post, index) => (
          <FeedCom
            key={index}
            num={length - index}
            author={post.name}
            title={post.title}
            content={post.content}
            hash={post.hash}
          ></FeedCom>
        ))}
      <NewButton modal={isModal} click={createPostHandler} />
    </div>
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
  } else if (process.env.ENVIRONMENT === "testnet") {
    provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.matic.today"
    );
  }
  // else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  // }

  /**********URQL************************ */

  const APIURL =
    "https://api.thegraph.com/subgraphs/name/jordancarlson7/dsm?version=current";

  const tokensQuery = `
    {
      newPosts(orderBy: postId, orderDirection: desc) {
        id
        postId
        author
        title
        content
        hash
        name
      }
    }
`;

  const client = createClient({
    url: APIURL,
  });

  const dataGraph = await client.query(tokensQuery).toPromise();
  /**********URQL************************ */

  const contract = new ethers.Contract(contractAddress, Feed.abi, provider);
  const data = await contract.viewData();
  return {
    props: {
      initialPosts: JSON.parse(JSON.stringify(data)),
      graph: JSON.parse(JSON.stringify(dataGraph)),
    },
  };
}
/******************REACT SUPPORT********** */
export default Posts;
