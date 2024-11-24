import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TaskContext } from "../contexts/task-context";

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}

type InitialValueType<T> = T | (() => T);

export function useLocalStorage<T>(
  key: string,
  initialValue: InitialValueType<T>,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return deserialize(item);
      }

      return initialValue instanceof Function ? initialValue() : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const prevKeyRef = useRef(key);

  // Use useEffect to update localstorage when value changes
  useEffect(() => {
    try {
      if (prevKeyRef.current !== key) {
        window.localStorage.removeItem(prevKeyRef.current);
      }

      prevKeyRef.current = key;
      window.localStorage.setItem(key, serialize(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [storedValue, serialize, key]);

  return [storedValue, setStoredValue];
}
