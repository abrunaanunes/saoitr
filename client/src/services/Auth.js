import { createContext, useEffect, useState, useContext } from "react"

export const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [authenticated, setAuthenticated] = useState()

    useEffect(() => {
        const userToken = localStorage.getItem('utfpr_user_token')
        const userStorage = localStorage.getItem('utfpr_user')

        if(userToken && userStorage) {
            console.log('userToken: ', userToken)
            setUser(JSON.parse(userStorage)) 
            setToken(userToken) 
            setAuthenticated(true)
        }

        console.log('authenticated: ', authenticated)

    }, [authenticated])

    const login = (token, user) => {
        localStorage.setItem('utfpr_user_token', token)
        localStorage.setItem('utfpr_user', JSON.stringify(user))
        setUser(user) 
        setToken(token) 
        setAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('utfpr_user_token')
        localStorage.removeItem('utfpr_user')
        setUser(null)
        setToken(null) 
        setAuthenticated(false)
    }
    
    return <AuthContext.Provider value={{ user, authenticated, login, logout, token}}>{children}</AuthContext.Provider>
}
