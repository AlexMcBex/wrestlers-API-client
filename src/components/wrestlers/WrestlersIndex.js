import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
// import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllWrestlers } from '../../api/wrestlers'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// WrestlersIndex will make a request to the API for all wrestlers
// once it receives a response, display a card for each wrestler
const WrestlersIndex = (props) => {
    const [wrestlers, setWrestlers] = useState(null)
    const [error, setError] = useState(false)

    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our wrestlers from the api when the component mounts
    useEffect(() => {
        getAllWrestlers()
            .then(res => setWrestlers(res.data.wrestlers))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting wrestlers',
                    message: 'Could not find any wrestlers',
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!wrestlers) {
        // if no wrestlers loaded yet, display 'loading'
        return <p>...loading ...please wait</p>
    } else if (wrestlers.length === 0) {
        // otherwise if there ARE no wrestlers, display that message
        return <p>No wrestlers yet, go add some!</p>
    }

    // once we have an array of wrestlers, loop over them
    // produce one card for every wrestler
    const wrestlerCards = wrestlers.map(wrestler => (
        <Card key={ wrestler.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ wrestler.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/wrestlers/${wrestler.id}`} className="btn btn-info">View { wrestler.name }</Link>
                </Card.Text>
            </Card.Body>
            { wrestler.owner ?
                <Card.Footer>
                     Manager: {wrestler.owner.email} 
                </Card.Footer>
                : null}
        </Card>
    ))

    // return some jsx, a container with all the wrestlercards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { wrestlerCards }
        </div>
    )
}

// export our component
export default WrestlersIndex