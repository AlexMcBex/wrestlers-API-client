import WrestlersIndex from "./wrestlers/WrestlersIndex"
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<h2>Roster of Wrestlers</h2>
			<WrestlersIndex msgAlert={ props.msgAlert } />
		</>
	)
}

export default Home
