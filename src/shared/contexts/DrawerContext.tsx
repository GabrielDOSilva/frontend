import React, { createContext, useCallback, useContext, useState } from "react";


interface IDrawerContexData {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
}

interface IDrawerProviderProps {
    children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContexData);

export const useDrawerContext = () => {
    return useContext(DrawerContext)
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawerOpen = useCallback(() => {
        setDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []);

    const themeContextValue: IDrawerContexData = {
        isDrawerOpen: isDrawerOpen,
        toggleDrawer: toggleDrawerOpen,
    };
    return (
        <DrawerContext.Provider value={themeContextValue}>
            {children}
        </DrawerContext.Provider>
    )
}
