import { createContext } from "react";

import { TasksContextType } from "@/app/types/tasks-context-type";

export const TasksContext = createContext<TasksContextType | null>(null);
