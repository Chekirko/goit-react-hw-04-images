import { Audio } from 'react-loader-spinner';
import { Wrapper } from './Loader.slyled';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Loader = () => {
  return (
    <Wrapper>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
      />
    </Wrapper>
  );
};
