import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Container, Button } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'


import { getOneWrestler } from '../../api/wrestlers'
import CardHeader from 'react-bootstrap/esm/CardHeader'

const ShowWrestler = (props) => {
    const [wrestler, setWrestler] = useState(null)
    const { id } = useParams()

    const { user, msgAlert } = props
    console.log('user in ShowWrestler props: ', user)
    console.log('msgAlert in ShowWrestler props: ', msgAlert)
    
    useEffect(()=>{
        getOneWrestler(id)
        .then(res => setWrestler(res.data.wrestler))
        .catch(err => {
            msgAlert({
                heading: 'Error getting wrestlers',
                message: 'Could not find any wrestlers',
                variant: 'danger'
            })
        })
    }, [])

    if (!wrestler) {
        return <p>...loading</p>
    }

    return (
        <>
        <Container className="m-2">
            <Card>
                <Card.Header>{ wrestler.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div>Weight: {wrestler.weight}lbs</div>
                        <div>Class: {wrestler.weightClass}</div>
                        <div></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}

export default ShowWrestler