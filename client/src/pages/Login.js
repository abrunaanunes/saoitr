import React, { useState } from 'react'
import { Content, Form, ButtonToolbar, Button, Panel, FlexboxGrid, IconButton } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import Menu from '../components/Menu'
import api from '../services/Api'

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState()
    
    const handleSubmit = (e) => {
        const formData = { email, password };
        makeLogin(formData)
    }

    function makeLogin(formData) {
        api.post('login', formData, {
            'Content-Type': 'application/json'
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            setError(err.response.data.message)
        })
    }

    return (
        <div className="Page">
            <Menu></Menu>
            <Content>
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={8}>
                        <Panel header={<h3>Login</h3>} bordered>
                        <Form fluid onSubmit={handleSubmit}>
                            { error ? 
                                <div className="Error">
                                    <p>{error}</p>
                                </div>
                            : null }
                            <Form.Group>
                                <Form.ControlLabel>E-mail</Form.ControlLabel>
                                <Form.Control name="email" value={email} onChange={setEmail}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>Senha</Form.ControlLabel>
                                <div className="FlexRow">
                                    <Form.Control name="password" type={!showPassword ? 'password' : 'text'} autoComplete="off" value={password} onChange={setPassword} />
                                    <IconButton onClick={() => setShowPassword(!showPassword)} />
                                </div>
                            </Form.Group>
                            <Form.Group>
                            <ButtonToolbar>
                                <Button type="submit" block size="lg" appearance="primary">Login</Button>
                                <Button type="button" block size="lg" appearance="link">Cadastrar-se</Button>
                            </ButtonToolbar>
                            </Form.Group>
                        </Form>
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </div>
    )
}

export default Login