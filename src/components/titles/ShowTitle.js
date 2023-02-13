import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteTitle } from '../../api/titles'
import EditTitleModal from './EditTitleModal'

const ShowTitle = (props) => {
    const { title, user, wrestler, msgAlert, triggerRefresh } = props
    const [editModalShow, setEditModalShow] = useState(false)

    const destroyTitle = () => {
        deleteTitle(user, wrestler.id, title._id)
            .then(() => {
                msgAlert({
                    heading: 'Title Deleted',
                    message: 'Bye Bye title!',
                    variant: 'success'
                })
            })

            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={{ backgroundColor: 'gold', width: '30rem' }}>
                <Card.Header>{title.federation} - {title.name}</Card.Header>
                <Card.Body>
                    <small>held for {title.length} days</small>
                </Card.Body>
                <Card.Footer>
                {
                        user && wrestler.owner && user._id === wrestler.owner._id
                            ?
                            <>
                                <Button
                                    onClick={() => setEditModalShow(true)}
                                    variant="warning"
                                    className="m-2"
                                >
                                    Edit Title
                                </Button>
                                <Button
                                    onClick={() => destroyTitle()}
                                    variant="danger"
                                    className="m-2"
                                >
                                    Delete Title
                                </Button>
                            </>
                            :
                            null
                    }
                </Card.Footer>
            </Card>
            <EditTitleModal 
            user={user}
            wrestler={wrestler}
            title={title}
            show={editModalShow}
            handleClose={() => setEditModalShow(false)}
            msgAlert={msgAlert}
            triggerRefresh={triggerRefresh}
            />
        </>
    )
}


export default ShowTitle