/*********IMPORTS */
import {useState} from "react";
import { ethers } from "ethers";
import { createClient} from "urql";
/*******CONTRACT */
import { contractAddress } from "../../config";
import Feed from "../../compiledContracts/Feed.sol/Feed.json";
/*******CONTRACT */
/*******COMPONENTS */
import FeedCom from "../../components/Feed/feed-com";
import NewButton from "../../components/Post/new-button";
import PostForm from "../../components/Post/post-form";
/*******COMPONENTS */
/*********IMPORTS */
/**************PAGE */
function Posts(props) {
  const { initialPosts, graph } = props;
  const length = initialPosts.length;
  const [graphArray, setGraphArray] = useState(graph.data.newPosts);
  const [isModal, setIsModal] = useState(false);

  console.log(initialPosts);
  console.log("GRAPH: ", graphArray);

  /**********GRAPH************************ */
  const refreshData = async () => { //This function will refresh the data on the page
    //GraphQL "The Graph" queries
    const APIURL ="https://api.thegraph.com/subgraphs/name/jordancarlson7/dsm?version=current";
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
  };
  
  /**********HANDLERS************************ */
  function createPostHandler() {
    console.log("new post Click");
    setIsModal(!isModal);
    refreshData();
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
  // Get current state of blockchain from contract version 1
  let provider;
  if (process.env.ENVIRONMENT === "local") { //LOCAL
    provider = new ethers.providers.JsonRpcProvider();
  } else if (process.env.ENVIRONMENT === "testnet") { //MUMBAI TESTNET
    provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.matic.today"
    );
  }
  // else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/') //PRODUCTION (REAL CRYPTO CURRENCY)
  // }
  
  /**********URQL************************ */// Gets data from THE GRAPH version 2
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
  //GETS data from the contract
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
