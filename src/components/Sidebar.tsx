import { TasksIcon, HomeIcon } from "../assets/icons";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <aside className="w-full max-w-[272px] h-screen bg-white">
      <div className="px-8 py-6 space-y-4">
        <h1 className="text-primary font-semibold text-xl">Task Manager</h1>
        <p className="text-sm">
          Um simples{" "}
          <span className="text-primary font-semibold ">
            organizador de tarefas
          </span>
        </p>
      </div>
      <nav className="space-y-2 px-2">
        <SidebarButton color="ghost">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton color="primary">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </nav>
    </aside>
  );
};

export default Sidebar;
