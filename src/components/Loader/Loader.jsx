import { ColorRing } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.overlay}>
      <ColorRing
        visible={true}
        height="150"
        width="150"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={['#d8d8ef', '#abc2f3', '#385f8f', '#4153a4', '#282860']}
      />
    </div>
  );
};

export default Loader;
