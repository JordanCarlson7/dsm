import classes from "./feed.module.css";
import { useState } from "react";

const Feed = () => {
  return (
    <div className={classes.card && classes.menu && classes.center}>
      <div className={classes.card__cover}></div>

      <div className={classes.menu && classes.center}>
        <p>This is my paragraph post</p>
      </div>
    </div>
  );
};
export default Feed;
