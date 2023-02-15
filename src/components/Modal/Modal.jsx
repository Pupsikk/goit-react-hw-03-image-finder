import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalContainer = document.getElementById('modal');

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleEscapePress);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleEscapePress);
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  handleEscapePress = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    const jsx = (
      <>
        <div className={s.overlay} onClick={this.handleBackdropClick}>
          <div className={s.modal}>
            <img src={this.props.largeImageURL} alt={this.props.tags} />
          </div>
        </div>
      </>
    );

    return createPortal(jsx, modalContainer);
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
