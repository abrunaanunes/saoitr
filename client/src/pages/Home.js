import { Content, Grid, Col,  Row, Card, Panel, Placeholder } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import Menu from '../components/Menu'

function Login() {
    const Card = props => (
        <Panel {...props} bordered header="Card title">
            <Placeholder.Paragraph />
        </Panel>
    )
    return (
        <div className="Page">
            <Menu></Menu>
            
            <Content className="Content">
                <Grid fluid>
                    <Row className="Row">
                        <h1>Seja bem-vindo</h1>
                    </Row>
                    <Row className="Row">
                        <Col md={6} sm={12}>
                        <Card />
                        </Col>
                        <Col md={6} sm={12}>
                        <Card />
                        </Col>
                        <Col md={6} sm={12}>
                        <Card />
                        </Col>
                        <Col md={6} sm={12}>
                        <Card />
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </div>
    )
}

export default Login