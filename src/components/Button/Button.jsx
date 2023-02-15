import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button className={s.button} onClick={loadMore}>
      load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};

export default Button;
