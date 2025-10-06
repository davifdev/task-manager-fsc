import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";

const TasksDetails = () => {
  return (
    <SectionWrapper>
      <div className="flex items-end justify-between">
        <div className="space-y-6">
          <button className="bg-primary flex h-7 w-7 cursor-pointer items-center justify-center rounded-full">
            <ArrowLeftIcon />
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Link to="/" className="text-text-gray text-xs">
                Minhas Tarefas
              </Link>
              <span>
                <ChevronRightIcon className="text-text-gray" />
              </span>
              <span className="text-primary text-xs font-semibold">
                Ir para academia
              </span>
            </div>
            <h2 className="text-dark-blue text-xl font-semibold">
              Ir para academia
            </h2>
          </div>
        </div>
        <div>
          <Button size="small" color="danger">
            Deletar tarefa <TrashIcon />
          </Button>
        </div>
      </div>
      <div className="space-y-6 rounded-md bg-white p-6">
        <Input title="Título" />
        <InputSelect title="Horário" />
        <Input title="Descrição" />
      </div>
      <div className="flex justify-end">
        <Button color="primary" size="large">
          Salvar
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default TasksDetails;
