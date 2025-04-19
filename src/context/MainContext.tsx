import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { InstituteRes } from "../types/instituteTypes/instituteRes.ts";
import { LecturerRes } from '../types/lecturerTypes/lecturerRes.ts';
import { Role } from '../types/enums/role.ts';

type TAction = {
  type: "view" | "delete" | "update",
  [property: string]: any
};

function mainReducer(data: any | null, action: TAction): any | null {
  switch (action.type) {
    case "view":
      return action.data || null;
    case "delete":
      return null;
    case "update":
      return { ...data, ...action.data };
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
    return null;
  }
}

const id = Number(localStorage.getItem('userId'));
const userRole = localStorage.getItem('role');

const fetchedData = userRole === Role.LECTURER ? await getLecturerById(id) : await getInstituteById(id);

const DataContext = userRole === Role.LECTURER ? createContext<LecturerRes | null>({} as LecturerRes) : createContext<InstituteRes | null>({} as InstituteRes);
const DispatcherContext = createContext<React.Dispatch<TAction>>(() => {});

export function MainProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(mainReducer, fetchedData);

  useEffect(() => {
    async function fetchData() {
      if (!data) {
        if (userRole === Role.LECTURER) {
          const lecturer = await getLecturerById(id);
          dispatch({ type: "view", data: lecturer });
        } else if (userRole === Role.INSTITUTE) {
          const institute = await getInstituteById(id);
          dispatch({ type: "view", data: institute });
        }
      }
    }
    fetchData();
  }, [data]);

  return (
    <DataContext.Provider value={data}>
      <DispatcherContext.Provider value={dispatch}>{children}</DispatcherContext.Provider>
    </DataContext.Provider>
  );
}

export function useData() {
  // @ts-ignore
  return useContext(DataContext);
}

export function useDispatcher() {
  return useContext(DispatcherContext);
}
