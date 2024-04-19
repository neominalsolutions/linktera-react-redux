import { Link, Outlet } from 'react-router-dom';
// import './App.css';

function App() {
	return (
		<>
			<div style={{ color: 'blue', padding: '1rem', textAlign: 'center' }}>
				<nav>
					<Link to="/shops">Shops</Link> <Link to="/cart-summary">Summary</Link>
				</nav>
				<main style={{ marginTop: '0.5rem' }}>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
