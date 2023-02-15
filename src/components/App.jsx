import { Component } from 'react';
import { APP_STATE } from '../constants/appState';
import { FETCH_STATUS } from '../constants/fetchStatus';
import { getPictures } from 'services/pictures.service';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    ...APP_STATE,
  };

  componentDidUpdate = (_, prevState) => {
    this.makeRequest(prevState);
  };

  setRequest = word => {
    if (word === '') {
      Notify.info('The input field is empty!');
    } else if (word !== this.state.request) {
      this.setState({ ...APP_STATE, request: word.toLowerCase().trim() });
    }
  };

  makeRequest = async prevState => {
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: FETCH_STATUS.Loading });
      try {
        const receivedPictures = await getPictures(
          this.state.request,
          this.state.page
        );
        this.setState({ totalHits: receivedPictures.totalHits });

        if (receivedPictures.totalHits === 0) {
          Notify.warning(`No results for ${this.state.request}`);
        }
        //copy only the required properties
        const pictures = receivedPictures.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );
        this.setState(prev => ({
          pictures: [...prev.pictures, ...pictures],
          status: FETCH_STATUS.Success,
        }));
      } catch (error) {
        this.setState({ status: FETCH_STATUS.Error });
        console.log(error.message);
        Notify.failure('Something went wrong!');
      }
    }
  };

  handleChangePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar search={this.setRequest} />

        {this.state.status === FETCH_STATUS.Loading && <Loader />}

        <ImageGallery imageList={this.state.pictures} />

        {this.state.pictures.length < this.state.totalHits && (
          <Button loadMore={this.handleChangePage} />
        )}
      </>
    );
  }
}

export default App;
