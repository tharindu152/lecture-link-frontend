import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { InstituteRes } from "../types/instituteTypes/instituteRes.ts";
import { LecturerRes } from '../types/lecturerTypes/lecturerRes.ts';
import { Role } from '../types/enums/role.ts';

const usrType = "Lecturer"

type TAction = {
  type: "view" | "delete",
  [property: string] : any
}

function mainReducer(data: any | null, action: TAction): any | null {
  switch (action.type) {
    case "view":
      return action.data || null;
    case "delete":
      return null;
    default:
      return data;
  }
}

async function getInstituteById(id: number): Promise<InstituteRes | null> {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/institutes/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` , "Role": Role.INSTITUTE},
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching institute:", error);
    return null;
  }
}

async function getLecturerById(id: number): Promise<LecturerRes | null> {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/lecturers/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` , "Role": Role.LECTURER},
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching lecturer:", error);
    await getInstituteById(id)
    return null;
  }
}

const fetchedData = await getLecturerById(4);

const DataContext = usrType !== "Lecturer" ? createContext<LecturerRes | null>({} as LecturerRes) : createContext<InstituteRes | null>({} as InstituteRes);
const DispatcherContext = createContext<React.Dispatch<TAction>>(() => {});

export function MainProvider({ children }: { children: ReactNode }) {

  const [data, dispatch] = useReducer(mainReducer, fetchedData);

  return (
    <DataContext.Provider value={data}>
      <DispatcherContext.Provider value={dispatch}>{children}</DispatcherContext.Provider>
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

export function useDispatcher() {
  return useContext(DispatcherContext);
}
