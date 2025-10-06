import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TasksPage from "../pages/TasksPage";
import TasksDetails from "../pages/TaskDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TasksPage />,
  },
  {
    path: "/tasks/:taskId",
    element: <TasksDetails />,
  },
]);

const MainRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default MainRouter;
