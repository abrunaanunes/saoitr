import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        const userToken = localStorage.getItem('utfpr_user_token')
        const userStorage = localStorage.getItem('utfpr_user')

        if(userToken && userStorage) {
            setUser(JSON.parse(userStorage)) 
            setToken(userToken) 
        }

    }, [])

    const login = (token, user) => {
        localStorage.setItem('utfpr_user_token', token)
        localStorage.setItem('utfpr_user', JSON.stringify(user))
    }

    const logout = () => {
        console.log('caiu aqui no logout')
        localStorage.remove('utfpr_user_token')
        localStorage.remove('utfpr_user')
    }
    
    return <AuthContext.Provider value={{ user, authenticated: !!user, login, logout, token}}>{children}</AuthContext.Provider>
}
