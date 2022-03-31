import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AccountContext } from "../../store/context";
import classes from "./navigate.module.css";

const Navigate = () => {
  const [context, setContext] = useContext(AccountContext);
  const router = useRouter();

  const logoutHandler = () => {
    setContext(null);
    router.push("/");
  };

  return (
    <div className={classes.menu}>
      <div className={classes.menu__item}>
        <Link href="https://github.com/JordanCarlson7/dsm">Decentralized Social Media</Link>
      </div>
      <div className={classes.menu__item}>
        <Link href="https://thegraph.com/hosted-service/subgraph/jordancarlson7/dsm?version=current">The Graph</Link>
      </div>
      <div className={classes.menu__item}>
        <Link href="https://mumbai.polygonscan.com/address/0xC2410455a5Be3380721C17cF8a43dA53D243c465">Chain</Link>
      </div>
      <div className={classes.menu__divider}></div>
      <div className={classes.menu__item__right}>
        {context && <button className={classes.btn} onClick={logoutHandler}>Logout</button>}
      </div>
    </div>
  );
};
export default Navigate;
