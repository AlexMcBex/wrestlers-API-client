import { Card, Button } from 'react-bootstrap'

const ShowTitle = (props) => {
    const { title } = props
    return (
        <>
            <Card className="m-2" style={{ backgroundColor: 'gold', width: '30rem' }}>
                <Card.Header>{title.name}</Card.Header>
                <Card.Body>
                    <small>held for {title.length} days</small>
                </Card.Body>
            </Card>
        </>
    )
}

export default ShowTitle