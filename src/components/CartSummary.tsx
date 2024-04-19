/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	CartItem,
	removeFromCart,
	updateQuantity,
} from '../store/slices/CartSlice';

function CartSummary() {
	const cartState = useSelector((state: RootState) => state.cartState);
	const dispatch = useAppDispatch();

	const onDelete = (id: number) => {
		const result = confirm('Ürünü Sepetten kaldırmak istediğinize emin misin');

		if (result) {
			dispatch(removeFromCart({ id: id }));
		}
	};

	const onQuantityChange = (e: any, id: number) => {
		dispatch(updateQuantity({ id: id, quantity: Number(e.target.value) }));
	};

	return (
		<>
			{cartState && (
				<>
					<List>
						{cartState.cartSession.items.map((item: CartItem) => {
							return (
								<ListItem
									key={item.id}
									secondaryAction={
										<IconButton
											onClick={() => onDelete(item.id)}
											edge="end"
											aria-label="delete"
										>
											<DeleteIcon />
										</IconButton>
									}
								>
									{' '}
									<ListItemText
										primary={<Typography>{item.name}</Typography>}
										secondary={
											<>
												<TextField
													type="number"
													size="small"
													onChange={(e) => onQuantityChange(e, item.id)}
													label="Outlined"
													value={item.quantity}
												/>
												<Typography variant="subtitle2">Adet</Typography>
											</>
										}
									/>{' '}
								</ListItem>
							);
						})}
						<Divider />
						<Typography variant="h5" sx={{ color: 'red' }}>
							Total Price :{cartState.cartSession.total}
						</Typography>
					</List>
				</>
			)}
		</>
	);
}

export default CartSummary;
