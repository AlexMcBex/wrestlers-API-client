import { Form, Button, Container } from 'react-bootstrap'

const TitleForm = (props) => {
    const { title, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        placeholder="What is the name of the title?"
                        name="name"
                        id="name"
                        value={title.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                <Form.Label>Federation:</Form.Label>
                    <Form.Select
                        aria-label="federation"
                        name="federation"
                        defaultValue={title.federation}
                        onChange={handleChange}
                    >
                        <option value="WWE">WWE</option>
                        <option value="WWF">WWF</option>
                        <option value="WCW">WCW</option>
                        <option value="ECW">ECW</option>
                        <option value="AEW">AEW</option>
                        <option value="NJPW">NJPW</option>
                        <option value="Wrestling Fed.">Wrestling Fed.</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Days:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="How many days has the title been held?"
                        name="length"
                        id="length"
                        value={title.length}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default TitleForm