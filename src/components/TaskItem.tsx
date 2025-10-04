import { CheckIcon, DetailsIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

const TaskItem = () => {
  return (
    <div className="flex items-center justify-between rounded-md bg-[var(--primary-opacity)] p-3">
      <div className="flex items-center gap-3">
        <label
          htmlFor="status"
          className="bg-primary relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-md"
        >
          <input
            type="checkbox"
            id="status"
            className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
          />
          <CheckIcon />
        </label>
        <p className="text-md text-primary">Ir para academia</p>
      </div>
      <div className="flex items-center">
        <Button color="ghost">
          <TrashIcon />
        </Button>
        <a href="#">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
