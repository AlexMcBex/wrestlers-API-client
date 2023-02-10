import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Container, Button } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'


import { getOneWrestler, removeWrestler, updateWrestler } from '../../api/wrestlers'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import EditWrestlerModal from './EditWrestlerModal'
import NewTitleModal from '../titles/NewTitleModal'

import ShowTitle from '../titles/ShowTitle'

const titleCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowWrestler = (props) => {
    const [wrestler, setWrestler] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [titleModalShow, setTitleModalShow] = useState(false)
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
    }, [updated])

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

    let titleCards
    if (wrestler) {
        if (wrestler.titles.length > 0) {
            titleCards = wrestler.titles.map(title => (
                <ShowTitle
                    key={title.id} 
                    title={title}
                />
            ))
        }
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
                <Button 
                            className="m-2" variant="info"
                            onClick={() => setTitleModalShow(true)}
                        >
                            Assign {wrestler.name} a title!
                        </Button>
                        {
                            wrestler.owner && user && wrestler.owner._id === user._id
                            ?
                            <>
                             <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {wrestler.name}
                                </Button>
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
            <Container className="m-2" style={titleCardContainerLayout}>
                {titleCards}
            </Container>
            <EditWrestlerModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateWrestler={updateWrestler}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                wrestler={wrestler}
            />
                <NewTitleModal 
                user={user}
                wrestler={wrestler}
                show={titleModalShow}
                handleClose={() => setTitleModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowWrestler