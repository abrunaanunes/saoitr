import React, { useState } from 'react'
import { Content, Form, ButtonToolbar, Button, Panel, FlexboxGrid, IconButton, Icon } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import api from '../services/Api'
import Menu from '../components/Menu'
import { Gear, AddOutline } from '@rsuite/icons'

function Register() {
    const [error, setError] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const handleSubmit = (e) => {
        // e.preventDefault()
        if(password != passwordConfirmation) {
            setError('Confirmação da senha incorreta.')
            return
        }
        const formData = { name, email, password };
        makeRegister(formData)
    }

    function makeRegister(formData) {
        api.post('users', formData, {
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
                        <Panel header={<h3>Cadastre-se</h3>} bordered>
                        <Form fluid onSubmit={handleSubmit}>
                            { error ? 
                                <div className="Error">
                                    <p>{error}</p>
                                </div>
                            : null }
                            <Form.Group>
                                <Form.ControlLabel>Nome</Form.ControlLabel>
                                <Form.Control name="name" value={name} onChange={setName}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>E-mail</Form.ControlLabel>
                                <Form.Control name="email" value={email} onChange={setEmail}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>Senha</Form.ControlLabel>
                                <div className="FlexRow">
                                    <Form.Control name="password" type={!showPassword ? 'password' : 'text'} autoComplete="off" value={password} onChange={setPassword} />
                                    <IconButton icon={showPassword ? <Gear/> : <AddOutline/>} onClick={() => setShowPassword(!showPassword)} />
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>Confirmação da senha</Form.ControlLabel>
                                <div className="FlexRow">
                                    <Form.Control name="password-confirmation" type={!showPasswordConfirmation ? 'password' : 'text'} autoComplete="off" value={passwordConfirmation} onChange={setPasswordConfirmation} />
                                    <IconButton icon={showPasswordConfirmation ? <Gear/> : <AddOutline/>} onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} />
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

export default Register