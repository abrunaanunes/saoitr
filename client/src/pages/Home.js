import React, { useState, useEffect } from 'react'
import { Content, Grid,  Row, Loader } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import Menu from '../components/Menu'
import api from '../services/Api'

function Home() {
    const [occurrences, setOccurrences] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        getData()
    }, []) 

    const getData = () => {
        setIsLoading(true)
        api.get('occurrences')
        .then((res) => {
            setOccurrences(res.data)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    // const Card = props => (
    //     <Panel {...props} bordered header="Card title">
    //         <Placeholder.Paragraph />
    //     </Panel>
    // )
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