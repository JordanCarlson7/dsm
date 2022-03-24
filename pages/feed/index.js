import { AccountContext } from "../../store/context";
import { useContext, Fragment } from "react";
import { css } from '@emotion/css'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Link from 'next/link'
/* import contract address and contract owner address */
import {
  contractAddress, ownerAddress
} from '../../config'

import Feed from '../../artifacts/contracts/Feed.sol/Feed.json'
import FeedCom from "../../components/Feed/feed-com";

function Posts(props) {
  const [context, setContext] = useContext(AccountContext);
  console.log("account posts", context);
  const { posts } = props;
  console.log(posts);

  return <Fragment>
    {posts.map((post, index) => (<FeedCom key={index} num={index} author={post[1]} title={post[2]} content={post[3]}></FeedCom>))}
  </Fragment>;

}
export async function getServerSideProps() {
  /* here we check to see the current environment variable */
  /* and render a provider based on the environment we're in */
  let provider
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } 
  // else if (process.env.ENVIRONMENT === 'testnet') {
  //   provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  // } 
  // else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  // }

  const contract = new ethers.Contract(contractAddress, Feed.abi, provider)
  const data = await contract.viewData()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(data))
    }
  }
}
export default Posts;
