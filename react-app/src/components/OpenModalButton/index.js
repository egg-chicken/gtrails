import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonType
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  const buttonClassName = buttonType === 'edit' ? 'edit-button'
  : buttonType === 'Delete' ? 'delete-button'
  : buttonType === 'add' ? 'write-button'
  : buttonType === 'LogIn' ? 'log-in-button'
  : buttonType === 'SignUp' ? 'sign-up-button'
  : buttonType === 'addtolist' ? 'style-butt'
  : buttonType === 'locdetsave' ? 'det-page-butt'
  : buttonType === 'createlist' ? 'style-list-create'
  : buttonType === 'exploreList' ? 'explore-list-button'
  : '';

  return (
    <button className={`custom-button ${buttonClassName}`} onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;
