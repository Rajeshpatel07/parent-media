import { createContext, useContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
}

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [darkMode, setDarkmode] = useState(false);
  useEffect(() => {
    const html = document.querySelector('html');
    html?.classList.add("light")
  }, [])

  const toggleDarkMode = () => {
    const html = document.querySelector('html');
    if (html?.classList.contains("light")) {
      html.classList.replace('light', "dark");
      setDarkmode(true);
    } else {
      html?.classList.replace('dark', 'light');
      setDarkmode(false);
    }
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
