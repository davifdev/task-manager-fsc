import Header from "../components/Header";
import SectionWrapper from "../components/SectionWrapper";
import Sidebar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import DashboardItems from "../components/DashboardItems";
import { useGetTasks } from "../hooks/data/useGetTasks";

const Home = () => {
  const { data: tasks } = useGetTasks();

  return (
    <div className="flex">
      <Sidebar />
      <SectionWrapper>
        <Header title="Início" subtitle="Início" />
        <DashboardItems />
        <div className="grid grid-cols-2 gap-9">
          <div className="rounded-xl bg-white p-6">
            <div className="mb-6">
              <h2 className="text-dark-blue text-xl font-semibold">Tarefas</h2>
              <p className="text-text-gray text-sm">
                Resumo das tarefas disponíveis
              </p>
            </div>
            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem task={task} key={task.id} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-y-6 rounded-[10px] bg-white p-6">
            <p className="text-dark-gray">
              Cada pequena ação de hoje te aproxima das grandes conquistas de
              amanhã. Faça o que precisa ser feito!
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Home;
