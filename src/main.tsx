import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
// import './index.css';
import store from './store/store.ts';
import ProductPage from './pages/ProductsPage.tsx';

const router = createBrowserRouter([
	{
		path: '',
		Component: App,
		children: [
			{
				path: '/shops',
				Component: ProductPage,
			},
		],
	},
]);

// Uygulamayı Provider ile sarmallayarak uygulama genelinde Redux aktif hale getirdik.

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
