import { AccountContext } from "../../store/context";
import { useContext } from "react";
function Posts() {
  const [context, setContext] = useContext(AccountContext);
  console.log("account posts", context);

  return <p>FEED</p>;
}
export default Posts;
