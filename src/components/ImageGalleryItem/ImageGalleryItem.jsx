import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };

  render() {
    return (
      <>
        <li className={s.item} onClick={this.toggleModal}>
          <img className={s.image} src={this.props.src} alt={this.props.tags} />
        </li>
        {this.state.showModal && (
          <Modal
            onCloseModal={this.toggleModal}
            largeImageURL={this.props.largeImageURL}
            tags={this.props.tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
