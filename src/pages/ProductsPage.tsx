/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductionQuantityLimitsRounded from '@mui/icons-material/ProductionQuantityLimitsRounded';
import {
	Avatar,
	Button,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material';
import { addToCart } from '../store/slices/CartSlice';
import { useAppDispatch } from '../store/store';
import CartSummary from './CartSummaryPage';

function ProductPage() {
	const dispatch = useAppDispatch();

	const plist = [
		{
			id: 1,
			name: 'Urun-1',
			price: 45,
			stock: 10,
		},
		{
			id: 2,
			name: 'Urun-2',
			price: 45,
			stock: 15,
		},
		{
			id: 3,
			name: 'Urun-3',
			price: 48,
			stock: 2,
		},
		{
			id: 4,
			name: 'Urun-4',
			price: 48,
			stock: 12,
		},
	];

	// Item Product tipinde
	const onAddToCart = (item: any) => {
		const cartItem = {
			id: item.id,
			quantity: 1,
			price: item.price,
			name: item.name,
		};
		// aşağıdaki item Cart Item tipinde
		// state güncellemek için action'ı dispatch ile göndermem gerekiyor.
		dispatch(addToCart(cartItem));
	};

	return (
		<>
			<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				{plist.map((item) => {
					return (
						<ListItem key={item.id}>
							<ListItemAvatar>
								<Avatar>
									<ProductionQuantityLimitsRounded />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={item.name} secondary="Jan 7, 2014" />
							<Button variant="outlined" onClick={() => onAddToCart(item)}>
								Sepete Ekle
							</Button>
						</ListItem>
					);
				})}
			</List>

			<Divider />

			<CartSummary />
		</>
	);
}

export default ProductPage;
