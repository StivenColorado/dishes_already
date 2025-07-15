import React from 'react';
import { cartStore } from './cartStore';
import { productStore } from './productStore';
import { themeStore } from './themeStore';

export interface StoreContextType {
    cartStore: typeof cartStore;
    productStore: typeof productStore;
    themeStore: typeof themeStore;
}

export const StoreContext = React.createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const value = {
        cartStore,
        productStore,
        themeStore
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStores = () => {
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStores must be used within a StoreProvider');
    }
    return context;
};
