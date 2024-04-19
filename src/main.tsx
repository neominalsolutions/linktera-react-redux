import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
// import './index.css';
import '@fontsource/roboto/400.css';
import CartSummaryPage from './pages/CartSummaryPage.tsx';
import ProductPage from './pages/ProductsPage.tsx';
import store from './store/store.ts';

const router = createBrowserRouter([
	{
		path: '',
		Component: App,
		children: [
			{
				path: '/shops',
				Component: ProductPage,
			},
			{
				path: '/cart-summary',
				Component: CartSummaryPage,
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
