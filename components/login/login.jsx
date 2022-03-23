import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { AccountContext } from "../../store/context";
import classes from "./login.module.css";
// import { useState, useContext } from "react";
// import { AccountContext } from "../../store/context";

const Login = (props) => {
    /******************* */
    const [context, setContext] = useContext(AccountContext)
    const router = useRouter();
    const [error, setError] = useState(false);
    /******************* */
      /****************HANDLERS***************************/
      const metamaskHandler = () => {
       if (window.ethereum) {
       window.ethereum
       .request({ method: "eth_requestAccounts" })
       .then((res) => {
           console.log('response', res);
           setContext(res[0]);
           router.push('/feed')
         })
         .catch((error) => {
             setError(error);
             console.log(error)
         });
     } else {
         setError("Metamask is not installed");
     }
   };
   /****************HANDLERS***************************/
  

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <h1>Welcome to Decentralized Social Media</h1>
        <h2>Please login with Metamask to continue</h2>
        <button className={classes.center} onClick={metamaskHandler}>Login</button>
        <br />
        <a href="#">Create Metamask account</a>
      </div>
    </div>
  );
};
export default Login;
