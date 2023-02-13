import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import TitleForm from '../shared/TitleForm'
import { updateTitle } from '../../api/titles'

const EditTitleModal = (props) => {
    const { user, wrestler, show, handleClose, msgAlert, triggerRefresh } = props

    const [title, setTitle] = useState(props.title)

    const onChange = (e) => {
        e.persist()

        setTitle(prevTitle => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedTitle = {
                [updatedName]: updatedValue
            }

            return {
                ...prevTitle, ...updatedTitle
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateTitle(wrestler.id, user,  title)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Hell Yeah!',
                    message: 'Great! The title is better than ever',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            })
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <TitleForm 
                title={title}
                handleChange={onChange}
                handleSubmit={onSubmit}
                heading="Update the Title"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditTitleModal