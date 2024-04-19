/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { CartItem, addToCart } from '../store/slices/CartSlice';
import { RootState, useAppDispatch } from '../store/store';

function ProductPage() {
	const cartState = useSelector((state: RootState) => state.cartState);
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
			{plist.map((item) => {
				return (
					<div key={item.id}>
						{item.name}

						<button onClick={() => onAddToCart(item)}>Sepete Ekle</button>
					</div>
				);
			})}

			<hr></hr>

			{cartState && (
				<>
					{cartState.cartSession.items.map((item: CartItem) => {
						return (
							<div key={item.id}>
								{item.name} x {item.quantity}
							</div>
						);
					})}
					<div>Total Price :{cartState.cartSession.total}</div>
				</>
			)}
		</>
	);
}

export default ProductPage;
