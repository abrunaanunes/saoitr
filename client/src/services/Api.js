import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:24000"
})

export default api