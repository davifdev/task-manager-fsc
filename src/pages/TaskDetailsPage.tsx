import Sidebar from "../components/Sidebar";
import TasksDetails from "../components/TasksDetails";

const TaskDetailsPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <TasksDetails />
    </div>
  );
};

export default TaskDetailsPage;
