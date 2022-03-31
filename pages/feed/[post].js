import FeedCom from "../../components/Feed/feed-com";

const ipfsURI = "https://ipfs.io/ipfs/";

export default function Post(props) {
  console.log(props);
  return (
    <FeedCom
      num={0}
      author={props.post.author}
      title={props.post.title}
      content={props.post.content}
    ></FeedCom>
  );
}

export async function getServerSideProps({ params }) {
  //reads directly from IPFS
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
