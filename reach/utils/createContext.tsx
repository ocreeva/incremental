import * as React from 'react';

declare type ContextProvider<TContextValue> = React.FC<React.PropsWithChildren<TContextValue>>;
declare type UseContext<TContextValue> = (callerComponentName: string) => TContextValue;

const createContext: <TContextValue extends object>(rootComponentName: string) => [ ContextProvider<TContextValue>, UseContext<TContextValue> ]
= <TContextValue extends object>(rootComponentName: string) => {
    const Context = React.createContext<TContextValue | null>(null);
    Context.displayName = `${rootComponentName}Context`;

    const Provider: React.FC<React.PropsWithChildren<TContextValue>>
    = ({ children, ...context}) => {
        const value = React.useMemo(
            () => context,
            // eslint-disable-next-line react-hooks/exhaustive-deps
            Object.values(context)
        ) as TContextValue;
        return (<Context.Provider value={value}>{ children }</Context.Provider>);
    };
    Provider.displayName = `${rootComponentName}Provider`;

    const useContext: UseContext<TContextValue>
    = (callerComponentName) => {
        const context = React.useContext(Context);
        if (context !== null) return context;

        throw Error(`${callerComponentName} must be rendered inside of a ${rootComponentName} component.`);
    };

    return [ Provider, useContext ];
};

export default createContext;
