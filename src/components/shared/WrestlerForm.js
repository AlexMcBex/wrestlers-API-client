// this form will take several props and be used both to create and update pets
// the action will be dependent upon the parent component
// but the form will look the same on both Create and Update
import { Form, Button, Container } from 'react-bootstrap'

const WrestlerForm = (props) => {
    const { wrestler, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your wrestler's name?"
                        name="name"
                        id="name"
                        value={ wrestler.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Weight:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How many lbs does your wrestler weigh?"
                        name="weight"
                        id="weight"
                        value={ wrestler.weight }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this wrestler currently active?"
                        name="active"
                        defaultChecked={ wrestler.active }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select
                        aria-label="federation"
                        name="federation"
                        defaultValue={wrestler.federation}
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value="WWE">WWE</option>
                        <option value="WWF">WWF</option>
                        <option value="WCW">WCW</option>
                        <option value="ECW">ECW</option>
                        <option value="AEW">AEW</option>
                        <option value="NJPW">NJPW</option>
                        <option value="Wrestling Fed.">Wrestling Fed.</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default WrestlerForm