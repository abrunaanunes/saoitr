import { Fragment } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Occurrences from "../pages/Occurrences"
import Register from "../pages/Register"

const Private = ({ Item}) => {
    const authenticated = false

    return !!authenticated ? <Item /> : <Login></Login>
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/" element={<Home></Home>}></Route>
                    <Route exact path="/occurrences" element={<Private Item={Occurrences}/>}></Route>
                    <Route exact path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp