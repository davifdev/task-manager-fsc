import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <h2 className="text-danger">Hello World!</h2>
    </div>
  );
};

export default App;
