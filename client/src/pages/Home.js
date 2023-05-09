import React, { useState, useEffect } from 'react'
import { Content, Grid, Col,  Row, Card, Panel, Placeholder, Loader } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import Menu from '../components/Menu'
import axios from 'axios'

function Home() {
    const API_URL = 'http://localhost:24000'
    const [occurrences, setOccurrences] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        getData()
    }, []) 

    const getData = () => {
        setIsLoading(true)
        axios.get(`${API_URL}/occurrences`)
        .then((res) => {
            setOccurrences(res.data)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

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
                    {isLoading ? <Loader size="md"></Loader> : (
                        occurrences.length > 0 ? (
                            occurrences.map((occurrence) => {
                                {occurrence}
                            })
                        ) : 'Não há ocorrências cadastradas.'
                    )}
                </Grid>
            </Content>
        </div>
    )
}

export default Home