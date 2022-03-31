/* pages/post/[id].js */
// import ReactMarkdown from 'react-markdown'
import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { css } from "@emotion/css";
import { ethers } from "ethers";
import { AccountContext } from "../../store/context";

/* import contract and owner addresses */
import { contractAddress, ownerAddress } from "../../config";
import Feed from "../../artifacts/contracts/Feed.sol/Feed.json";
import FeedCom from "../../components/Feed/feed-com";

const ipfsURI = "https://ipfs.io/ipfs/";

export default function Post(props) {
  console.log(props);
  return (
    <FeedCom
      author={props.post.author}
      title={props.post.title}
      content={props.post.content}
    ></FeedCom>
  );
}

export async function getServerSideProps({ params }) {
  /* using the id property passed in through the params object */
  /* we can us it to fetch the data from IPFS and pass the */
  /* post data into the page as props */
  const post = params.post;
  console.log(post);
  const ipfsUrl = `${ipfsURI}/${post}`;
  const response = await fetch(ipfsUrl);
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}
