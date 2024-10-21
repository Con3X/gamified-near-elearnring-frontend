import React from 'react';
import Modal from 'react-modal';
import Popup from './Popup.style'

Modal.setAppElement('#root');

const PopupComponent = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h2>تنبيه</h2>
      <div>{message}</div>
      <button onClick={onClose}>إغلاق</button>
    </Modal>
  );
};

export default PopupComponent;
