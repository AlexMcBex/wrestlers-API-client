import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Container, Button } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'


import { getOneWrestler, removeWrestler } from '../../api/wrestlers'
import CardHeader from 'react-bootstrap/esm/CardHeader'

const ShowWrestler = (props) => {
    const [wrestler, setWrestler] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

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

      // here's where our removeWrestler function will be called
      const releaseWrestler = () => {
        removeWrestler(user, wrestler.id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeWrestlerSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeWrestlerFailure,
                    variant: 'danger'
                })
            })
    }


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
                <Card.Footer>
                        {
                            wrestler.owner && user && wrestler.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => releaseWrestler()}
                                >
                                    release {wrestler.name} 
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
            </Card>
        </Container>
        </>
    )
}

export default ShowWrestler