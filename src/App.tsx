import { Toaster } from "sonner";
import TasksPage from "./pages/TasksPage";

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            color: "#35383e",
          },
        }}
      />
      <TasksPage />
    </>
  );
};

export default App;
