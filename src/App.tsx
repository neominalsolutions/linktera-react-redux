import { Link, Outlet } from 'react-router-dom';
import { RootState, useAppDispatch } from './store/store';
import { useEffect } from 'react';
import { productFetch } from './store/slices/ProductSlice';
import { useSelector } from 'react-redux';
// import './App.css';

function App() {
	const dispatch = useAppDispatch();

	const productState = useSelector((state: RootState) => state.productState);

	useEffect(() => {
		// server state client state dönüşümü için ilgili async action thunk üzerinden tetikliyoruz. buda gidip async state çekip client state otomatik olarak aktaracak.
		// Pooling ile 5 sn ye bir source güncelle

		dispatch(productFetch());

		const minutes = 300000; // 5 dk bir veriyi tekrar çekme işlemi

		setInterval(() => {
			console.log('deneme');
			dispatch(productFetch());
		}, minutes);
	}, []);

	return (
		<>
			{productState.loading ? '...loading' : 'yüklendi'}

			<div style={{ color: 'blue', padding: '1rem', textAlign: 'center' }}>
				<nav>
					<Link to="/shops">Shops</Link> <Link to="/cart-summary">Summary</Link>{' '}
					<Link to="/shops2">Shops2</Link>
				</nav>
				<main style={{ marginTop: '0.5rem' }}>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
