import { useState } from 'react'
import { createWrestler } from '../../api/wrestlers'
import { createWrestlerSuccess, createWrestlerFailure } from '../shared/AutoDismissAlert/messages'
import WrestlerForm from '../shared/WrestlerForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateWrestler = (props) => {
     const { user, msgAlert } = props

     const navigate = useNavigate()
     console.log('this is navigate', navigate)
 
     const [wrestler, setWrestler] = useState({
         name: '',
         weight: '',
         active: true,
         federation: 'WWE'
     })
 
     const onChange = (e) => {
         e.persist()
 
         setWrestler(prevWrestler => {
             const updatedName = e.target.name
             let updatedValue = e.target.value
 
             console.log('this is the input type', e.target.type)
 
             // to handle a number, we look at the type, and parse a string to an integer
             if (e.target.type === 'number') {
                 updatedValue = parseInt(e.target.value)
             }
 
             // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
             if (updatedName === 'active' && e.target.checked) {
                 updatedValue = true
             } else if (updatedName === 'active' && !e.target.checked) {
                 updatedValue = false
             }
 
             const updatedWrestler = {
                 [updatedName] : updatedValue
             }
 
             console.log('the wrestler: ', updatedWrestler)
 
             return {
                 ...prevWrestler, ...updatedWrestler
             }
         })
     }
 
     const onSubmit = (e) => {
         e.preventDefault()
 
         createWrestler(user, wrestler)
             // first we'll nav to the show page
             .then(res => { navigate(`/wrestlers/${res.data.wrestler.id}`)})
             // we'll also send a success message
             .then(() => {
                 msgAlert({
                     heading: 'Oh Yeah!',
                     message: createWrestlerSuccess,
                     variant: 'success'
                 })
             })
             // if there is an error, tell the user about it
             .catch(() => {
                 msgAlert({
                     heading: 'Oh No!',
                     message: createWrestlerFailure,
                     variant: 'danger'
                 })
             })
 
     }
 
     return (
         <WrestlerForm 
             wrestler={wrestler}
             handleChange={onChange}
             handleSubmit={onSubmit}
             heading="Add a new wrestler to the roster!"
         />
     )
     }
export default CreateWrestler