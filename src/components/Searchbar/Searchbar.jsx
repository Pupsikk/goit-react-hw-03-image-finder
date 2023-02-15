import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { CgSearch } from 'react-icons/cg';

class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  handleChangeWord = e => {
    const { value } = e.target;
    this.setState({ searchWord: value });
  };

  submitWord = e => {
    e.preventDefault();
    this.props.search(this.state.searchWord);
    this.setState({ searchWord: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.submitWord}>
          <button type="submit" className={s.button}>
            <CgSearch size="25" />
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeWord}
            value={this.state.searchWord}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Searchbar;
