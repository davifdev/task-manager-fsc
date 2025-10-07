import { TasksIcon, HomeIcon } from "../assets/icons";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <aside className="h-screen w-full max-w-[272px] bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-primary text-xl font-semibold">Task Manager</h1>
        <p className="text-sm">
          Um simples{" "}
          <span className="text-primary font-semibold">
            organizador de tarefas
          </span>
        </p>
      </div>
      <nav className="space-y-2 px-2">
        <SidebarButton href="/">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton href="/tasks">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </nav>
    </aside>
  );
};

export default Sidebar;
