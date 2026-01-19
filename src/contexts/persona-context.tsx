"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Persona {
  position: string;
  age: string;
  occupation: string;
}

interface PersonaContextType {
  persona: Persona | null;
  setPersona: (persona: Persona) => void;
  hasPersona: boolean;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona | null>(null);

  const setPersona = useCallback((newPersona: Persona) => {
    setPersonaState(newPersona);
  }, []);

  return (
    <PersonaContext.Provider value={{ persona, setPersona, hasPersona: persona !== null }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return context;
}
