import { createContext, useContext, useRef } from "react";

const CosmicTransitionContext = createContext(null);

export function CosmicTransitionProvider({ children, triggerRef }) {
  return (
    <CosmicTransitionContext.Provider value={triggerRef}>
      {children}
    </CosmicTransitionContext.Provider>
  );
}

export function useCosmicTransition() {
  const context = useContext(CosmicTransitionContext);
  if (!context) {
    throw new Error("useCosmicTransition must be used within a CosmicTransitionProvider");
  }
  return (context.current);
}
