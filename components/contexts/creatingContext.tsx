import { createContext } from "react";
import { NewTaskContextType } from "@/app/types/new-task-context-type";

export const NewTaskContext = createContext<NewTaskContextType | null>(null)