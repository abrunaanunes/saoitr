import { Fragment } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Occurrences from "../pages/Occurrences"
import Register from "../pages/Register"
import useAuth from "../hooks/useAuth"

const Private = ({ Item }) => {
    const { authenticated } = useAuth()
    return authenticated > 0 ? <Item /> : <Navigate replace to="/login" />
}

const RoutesApp = () => {
    const { authenticated } = useAuth() 
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/" element={<Home></Home>}></Route>
                    <Route exact path="/register" element={ authenticated ?  <Navigate replace to="/" /> : <Register/> }></Route>
                    <Route path="/occurrences" element={<Private Item={Occurrences}/>}></Route>
                    <Route path="/login" element={ authenticated ?  <Navigate replace to="/" /> : <Login/> }></Route>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp