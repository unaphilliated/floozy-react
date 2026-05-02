import { createContext } from "react";

export enum PodState {
  Stopped = 10,
  Stopping,
  Started = 20,
  Starting,
}

export type Pod = {
  id: string;
  name: string;
  state: PodState;
  upSince?: Date;
};

export type PodContextValue = {
  pod: Pod | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
};

export const PodContext = createContext<PodContextValue | null>(null);