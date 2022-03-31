import { useRouter } from "next/router";
import { useState, useContext, useRef, Fragment } from "react";
import { AccountContext } from "../../store/context";
import classes from "./login.module.css";
import { createClient } from "urql";

const Login = (props) => {
  /*******************HOOKS */
  const [context, setContext] = useContext(AccountContext);
  const [getAlias, setGetAlias] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const inputAlias = useRef(null);
  const router = useRouter();
  // const [error, setError] = useState(false);
  let address;

  /*******************HOOKS */

  /****************HANDLERS***************************/
  const forwardFeed = () => {
    //logs user in with alias
    const aliasInput = inputAlias.current.value;
    console.log(address)
    console.log(userAddress)
    setContext({ address: userAddress, alias: aliasInput });
    setGetAlias(false);
    router.push("/feed");
  }
  //see if user is already in the system
  const aliasHandler = async () => {
    const APIURL =
      "https://api.thegraph.com/subgraphs/name/jordancarlson7/dsm?version=current";
    console.log("address", address);
    const tokensQuery = `
    {
      newPosts(where: {author: "${address}"}) {
        name
      }
    }
`;
    console.log(tokensQuery);

    const client = createClient({
      url: APIURL,
    });

    //determine to move forward or not based on user alias
    const dataGraph = await client.query(tokensQuery).toPromise();
    console.log("LOGIN: GRAPH: ", dataGraph);
    if (dataGraph.data.newPosts.length == 0) {
      console.log("No alias");
      setGetAlias(true);
    } else {
      console.log("Alias Found");
      const alias = dataGraph.data.newPosts[0].name;
      console.log(alias);
      setContext({ address: address, alias: alias });
      // setIsLoading(false);
      router.push("/feed");
    }
  };

  //access to the Web3 provider in the browser. (Extension: Metamask)
  const metamaskHandler = () => {
    setIsLoading(true);
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          console.log("response", res);
          address = res[0];
          setUserAddress(address);
          console.log(address)

          aliasHandler();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Metamask is not installed");
    }
  };
  /****************HANDLERS***************************/

  return (
    <div className={classes.container}>
      {isLoading && 'Loading...'}
      <div className={classes.menu}>
        <h1>Welcome to Decentralized Social Media</h1>
        <h2>{!getAlias && 'Please login with Metamask* to continue'}
        {getAlias && 'Welcome new account! Please create a username to continue'}
        </h2>
        {getAlias && (
          <Fragment>
            <input className={classes.alias} type="text" placeholder="alias" ref={inputAlias}></input>
            <button className={classes.center} onClick={forwardFeed}>
              Submit Alias
            </button>
          </Fragment>
        )}
        {!getAlias && (
          <button className={classes.center} onClick={metamaskHandler}>
            Login
          </button>
        )}
        <br />
        <a href="https://metamask.io/">*Create Metamask account</a>
      </div>
    </div>
  );
};

export default Login;
