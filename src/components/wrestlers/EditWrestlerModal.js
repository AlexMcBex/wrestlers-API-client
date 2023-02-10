import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import WrestlerForm from '../shared/WrestlerForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditWrestlerModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateWrestler, msgAlert, triggerRefresh } = props

    const [wrestler, setWrestler] = useState(props.wrestler)

    const onChange = (e) => {
        e.persist()

        setWrestler(prevWrestler => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            const updatedWrestler = {
                [updatedName] : updatedValue
            }

            console.log('the wrestler', updatedWrestler)

            return {
                ...prevWrestler, ...updatedWrestler
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateWrestler(user, wrestler)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateWrestlerSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateWrestlerFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <WrestlerForm 
                    wrestler={wrestler} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Wrestler"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditWrestlerModal