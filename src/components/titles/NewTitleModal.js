import { Modal } from 'react-bootstrap'
import { createTitle } from '../../api/titles'

const NewTitleModal = (props) => {
    const { user, pet, show, handleClose, msgAlert, triggerRefresh } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <p>new title modal</p>
            </Modal.Body>
        </Modal>
    )
}

export default NewTitleModal