import { Fragment } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Occurrences from "../pages/Occurrences"
import Register from "../pages/Register"
import Account from "../pages/Account"
import useAuth from "../hooks/useAuth"

const Private = ({ Item }) => {
    console.log('Private 1')
    const { authenticated } = useAuth()
    console.log('Private: ', authenticated)
    return authenticated ? <Item /> : <Navigate replace to="/login" />
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
                    <Route path="/account" element={<Account></Account>} ></Route>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp