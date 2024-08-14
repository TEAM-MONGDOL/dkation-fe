// eslint-disable-next-line import/no-extraneous-dependencies
import { BeatLoader } from 'react-spinners';

const UserLoading = () => {
  return (
    <div className="flex h-screen w-full">
      <BeatLoader color="#FDE000" className="mx-auto my-auto" />
    </div>
  );
};

export default UserLoading;
