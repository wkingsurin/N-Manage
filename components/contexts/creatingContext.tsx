import { createContext } from "react";
import { NewTaskContextType } from "@/app/types/new-task-context-type.types.";

export const NewTaskContext = createContext<NewTaskContextType | null>(null)