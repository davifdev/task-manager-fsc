import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TasksPage from "../pages/TasksPage";
import TasksDetailsPage from "../pages/TaskDetailsPage";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tasks",
    element: <TasksPage />,
  },
  {
    path: "/tasks/:taskId",
    element: <TasksDetailsPage />,
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
