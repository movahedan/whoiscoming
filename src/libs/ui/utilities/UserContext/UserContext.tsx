import { ReactNode, createContext } from "react";

const UserContext = createContext({});

export type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = ({
  children,
}: UserContextProviderProps) => {};
