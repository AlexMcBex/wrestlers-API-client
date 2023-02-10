import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import TitleForm from '../shared/TitleForm'
import { createTitle } from '../../api/titles'

import messages from '../shared/AutoDismissAlert/messages'

const NewTitleModal = (props) => {
    const { user, wrestler, show, handleClose, msgAlert, triggerRefresh } = props

    const [title, setTitle] = useState({})

    const onChange = (e) => {
        e.persist()

        setTitle(prevTitle => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedTitle = {
                [updatedName] : updatedValue
            }

            console.log('the title', updatedTitle)
            console.log('the title (state)', title)

            return {
                ...prevTitle, ...updatedTitle
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createTitle(wrestler.id, title)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createTitleSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createTitleFailure,
                    variant: 'danger'
                })
            })
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
            <TitleForm 
                    title={title}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Assign ${wrestler.name} a title!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewTitleModal