import { Navbar, Nav } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import HomeIcon from '@rsuite/icons/legacy/Home'
import { Link } from 'react-router-dom'

function Menu() {
    return (
        <Navbar className="Menu">
            <Nav>
                <Nav.Item icon={<HomeIcon />}>
                    <Link to="/">SAOITR</Link>
                </Nav.Item>
            </Nav>
            <Nav pullRight>
                <Nav.Item>
                    <Link to="/login">Login</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/register">Cadastre-se</Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}

export default Menu