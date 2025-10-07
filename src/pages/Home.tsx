import Header from "../components/Header";
import SectionWrapper from "../components/SectionWrapper";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <SectionWrapper>
        <Header title="Início" subtitle="Início" />
      </SectionWrapper>
    </div>
  );
};

export default Home;
