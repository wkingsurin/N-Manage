import { createContext } from "react";

import { TasksContextType } from "@/app/types/tasks-context-type.types";

export const TasksContext = createContext<TasksContextType | null>(null);
