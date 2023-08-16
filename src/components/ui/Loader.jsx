import { ClipLoader } from 'react-spinners';

const Loader = ({ isLoading }) => {
  return (
    <div className="w-screen h-screen">
      <div className="flex h-full w-full items-center justify-center">
        <ClipLoader
          color={'#3498db'}
          loading={isLoading}
          size={75}
          className="border-important"
        />
      </div>
    </div>
  );
};
export default Loader;
