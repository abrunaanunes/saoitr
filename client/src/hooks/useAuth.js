import { useContext } from "react"
import { AuthContext } from "../services/Auth"

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export default useAuth