import { create } from "zustand";

type Workspace = {
  id: string;
  name: string;
};

type WorkspaceState = {
  workspaces: Workspace[];
  activeTab: string;
  createWorkspace: () => void;
  setActiveTab: (tab: string) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  activeTab: "Dashboard",

  createWorkspace: () =>
    set((state) => ({
      workspaces: [
        ...state.workspaces,
        {
          id: crypto.randomUUID(),
          name: `Workspace ${state.workspaces.length + 1}`,
        },
      ],
    })),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));