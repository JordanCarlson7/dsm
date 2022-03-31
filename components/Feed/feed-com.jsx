import classes from "./feed-com.module.css";
import Link from "next/link";

const FeedCom = (props) => {
  return (
    <Link href={`/feed/${props.hash}`}>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <ul className={classes.container__items}>
            <li className={classes.container__item}>
              <div className={classes.container__top}>
                <div className={classes.container__circle}>{props.num}</div>

                <div className={classes.container__title}>{props.title}</div>
                <div className={classes.item__right}>{props.author}</div>
              </div>

              <div className={classes.container__desc}>{props.content}</div>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};
export default FeedCom;
