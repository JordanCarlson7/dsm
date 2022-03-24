import classes from "./feed-com.module.css";
import { useState } from "react";

const FeedCom = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
      <div className={classes.container__line}></div>

      <ul className={classes.container__items}>
        <li className={classes.container__item}>
          <div className={classes.container__top}>
            <div className={classes.container__circle}>{props.num}</div>

            <div className={classes.container__title}>{props.title}</div>
          </div>

          <div className={classes.container__desc}>{props.content}</div>
        </li>
      </ul>
      </div>
    </div>
  );
};
export default FeedCom;
