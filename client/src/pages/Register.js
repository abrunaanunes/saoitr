import {
    Content,
    Form,
    ButtonToolbar,
    Button,
    Panel,
    FlexboxGrid } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import Menu from '../components/Menu'

function Register() {
    return (
        <div className="Page">
            <Menu></Menu>
            <Content>
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={12}>
                        <Panel header={<h3>Cadastre-se</h3>} bordered>
                        <Form fluid>
                            <Form.Group>
                                <Form.ControlLabel>Nome</Form.ControlLabel>
                                <Form.Control name="name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>E-mail</Form.ControlLabel>
                                <Form.Control name="email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>Senha</Form.ControlLabel>
                                <Form.Control name="password" type="password" autoComplete="off" />
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>Confirmação da senha</Form.ControlLabel>
                                <Form.Control name="password" type="password" autoComplete="off" />
                            </Form.Group>
                            <Form.Group>
                            <ButtonToolbar>
                                <Button appearance="primary">Login</Button>
                                <Button appearance="link">Cadastrar-se</Button>
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