// eslint-disable-next-line import/no-extraneous-dependencies
import { BeatLoader } from 'react-spinners';

const AdminLoading = () => {
  return (
    <div className="flex h-screen w-full">
      <BeatLoader color="#000000" className="mx-auto my-auto" />
    </div>
  );
};

export default AdminLoading;
