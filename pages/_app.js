import "../styles/globals.css";
import Navigate from "../components/navigation/navigate";
import Login from '../components/login/login'
import { Fragment, useState } from "react";
import Link from 'next/link'
import { ethers } from 'ethers'
import { AccountContext } from '../store/context.js'
import { useRouter } from "next/router";
// import { ownerAddress } from '../config'
// import { createClient } from 'urql'

function MyApp({ Component, pageProps}) {

  /****************HOOKS***************************/
  // const [context, setContext] = useState('I/Context')
  const [userAddr, setUserAddr] = useState(false);
  console.log('initial state', userAddr)
  const [userBalance, setUserBalance] = useState(0);
//   const contractAddr = "0x3E93C39cBDb5188fF913e55688b5e19Ca9903095";
  const [error, setError] = useState(null);
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

//state={userAddr} setState={setUserAddr}
export default MyApp;
