import React, { useReducer } from 'react'

export default (reducer, actions, initialState) => {
    const Context = React.createContext();
    
    const Provider = ({ children }) => {
        const [posts, dispatch] = useReducer(reducer, initialState);

        const boundActions = {};
        for (let actionName in actions) {
            boundActions[actionName] = actions[actionName](dispatch);
        }

        return <Context.Provider value={{ posts, ...boundActions }}>{children}</Context.Provider>;
    }

    return { Context, Provider };
}