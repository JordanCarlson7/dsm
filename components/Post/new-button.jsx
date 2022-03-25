import classes from './new-button.module.css'

const NewButton = (props) => {
  return (
    <div className={classes.container} onClick={props.click}>
        {props.modal ? '-' : '+'}
    </div>
    
  );
};
export default NewButton;
