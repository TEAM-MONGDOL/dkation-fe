import NavBar from '@/_components/common/containers/NavBar';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';

const Home = () => {
  // return <div>main page</div>;
  // return <NavBar />;
  return <SearchingBoxModule placeholder="이름을 입력하세요" />;
};

export default Home;
