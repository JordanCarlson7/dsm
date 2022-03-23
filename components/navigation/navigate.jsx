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
        <Link href="/">Home</Link>
      </div>
      <div className={classes.menu__item}>link 3</div>
      <div className={classes.menu__divider}></div>
      <div className={classes.menu__item}>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};
export default Navigate;
