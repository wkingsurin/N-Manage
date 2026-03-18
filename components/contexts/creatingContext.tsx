import { createContext } from "react";
import { NewTaskContextType } from "@/app/types/new-task.types";

export const NewTaskContext = createContext<NewTaskContextType | null>(null);
