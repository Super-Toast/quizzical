import React, {useState} from "react"
const Context = React.createContext()

function ContextProvider({children}) {
    const [api, setApi] = useState()
    const [start, setStart] = React.useState(false)

    function changeApi(api) {
        setApi(api)
    }

    function changeStart() {
        setStart(prevStart => !prevStart)
    }

    return (
        <Context.Provider value={{api, start, changeApi, changeStart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}