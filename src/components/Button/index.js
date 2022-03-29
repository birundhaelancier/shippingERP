import React from 'react';
import Button from '@material-ui/core/Button';
import './button.css';

const CustomButton = (props) => {
  return (
    <Button
      variant='contained'
      color={props.btnColor}
      disabled={props.btnDisable}
      className={`${
        (props.custombtnCSS === 'Primary' && 'PrimaryBtn') ||
        (props.custombtnCSS === 'Cancel' && 'CancelBtn')
      } btnContainer`}
      onClick={props.onBtnClick}
      startIcon={props.startIcon}
    >
      {props.btnName}
    </Button>
  );
};
export default CustomButton;

{/* <div className='customBtn'>
      <div>
        <Button
          variant='contained'
          color={props.btnColor}
          disabled={props.btnDisable}
          className={`${(props.primarycustombtnCSS === 'Primary' && 'PrimaryBtn')} btnContainer`}
          onClick={props.onPrimaryBtnClick}
        >
          {props.primaryBtnName}
        </Button>
      </div>
      <div>
        <Button
          variant='contained'
          color={props.btnColor}
          disabled={props.btnDisable}
          className={`${(props.custombtnCSS === 'Cancel' && 'CancelBtn')
            } btnContainer`}
          onClick={props.onCancelBtnClick}
        >
          {props.cancelBtnName}
        </Button>
      </div>
    </div> */}

    // <CustomButton primaryBtnName="Submit" cancelBtnName="Cancel" primarycustombtnCSS="Primary" custombtnCSS="Cancel" />