import { createContext } from "react";
import { StateContext } from "../Types/Types";

export const appContext = createContext<StateContext | null>(null);
