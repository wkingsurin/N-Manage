import { useContext } from "react";
import { NewTaskContext } from "../contexts/creatingContext";

export function useNewTask() {
	const context = useContext(NewTaskContext);

	if (!context) {
		throw new Error("useNewTask must be used inside NewTaskProdiver");
	}

  return context
}
