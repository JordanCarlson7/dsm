import "../styles/globals.css";
import Navigate from "../components/navigation/navigate";
import Login from '../components/login/login'
import { Fragment, useState } from "react";
import { AccountContext } from '../store/context.js'

function MyApp({ Component, pageProps}) {

  /****************HOOKS***************************/
  const [userAddr, setUserAddr] = useState(false);
  console.log('initial state', userAddr)
  /****************HOOKS***************************/
  
  return (
    <Fragment>
      <AccountContext.Provider value={[userAddr, setUserAddr]}>
      <Navigate />
      {!userAddr && <Login />} 
      {userAddr && <Component {...pageProps} />}
      </AccountContext.Provider>
    </Fragment>
  );
}

export default MyApp;
