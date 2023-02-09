import Container from 'react-bootstrap/Container'
import WrestlersIndex from "./wrestlers/WrestlersIndex"
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container className="m-2" style={{textAlign:'center'}}> 
			<h2>Roster of Wrestlers</h2>
			<WrestlersIndex msgAlert={ props.msgAlert } />
		</Container> 
	)
}

export default Home
