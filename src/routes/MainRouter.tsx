import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TasksPage from "../pages/TasksPage";
import TasksDetailsPage from "../pages/TaskDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
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
