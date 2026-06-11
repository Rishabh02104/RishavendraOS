"use client";

import React, { createContext, useContext, useState } from "react";

export type ViewType =
  | "main"
  | "laptop"
  | "drone"
  | "brain"
  | "recruiter"
  | "voting"
  | "ai"
  | "domain_product"
  | "domain_ai"
  | "domain_vision"
  | "domain_security"
  | "lobe_frontal"
  | "lobe_parietal"
  | "lobe_occipital"
  | "lobe_cerebellum"
  | "lobe_spinal"
  | "lobe_temporal";

export type HoveredObjectType =
  | "laptop"
  | "drone"
  | "vault"
  | "head"
  | "brain_voting"
  | "brain_vision"
  | "brain_product"
  | "brain_ai"
  | "brain_frontal"
  | "brain_parietal"
  | "brain_occipital"
  | "brain_cerebellum"
  | "brain_spinal"
  | "brain_temporal"
  | null;

interface AppContextType {
  view: ViewType;
  setView: (view: ViewType) => void;
  hoveredObject: HoveredObjectType;
  setHoveredObject: (obj: HoveredObjectType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewType>("main");
  const [hoveredObject, setHoveredObject] = useState<HoveredObjectType>(null);

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        hoveredObject,
        setHoveredObject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    // Safe fallback for standalone usage
    return {
      view: "main" as any,
      setView: () => {},
      hoveredObject: null,
      setHoveredObject: () => {},
    };
  }
  return context;
}
