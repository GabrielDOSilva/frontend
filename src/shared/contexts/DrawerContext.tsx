import React, { createContext, useCallback, useContext, useState } from "react";


interface IDrawerProviderProps {
    children: React.ReactNode
}

interface IDrawerOptions {
    path: string;
    label: string;
    icon: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOptions[];
    setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
  }
  
  const DrawerContext = createContext({} as IDrawerContextData);
  
  export const useDrawerContext = () => {
    return useContext(DrawerContext);
  };
  
  export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    const toggleDrawerOpen = useCallback(() => {
      setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);
  
    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
      setDrawerOptions(newDrawerOptions);
    }, []);
  
    return (
      <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
        {children}
      </DrawerContext.Provider>
    );
  };