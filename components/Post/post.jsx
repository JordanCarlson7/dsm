import classes from './post.module.css'

const Post = () => {
  return (
    <div className={classes.container}>
        <form>
            <input type="text" placeholder='Enter your post here'></input>
            <button type="submit">Post</button>
        </form>
    </div>
    
  );
};
export default Post;
