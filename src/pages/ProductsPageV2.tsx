import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { Button, Card, Col, Flex, Row } from 'antd';
import { Product } from '../services/product.service';
import { addToCart } from '../store/slices/CartSlice';

function ProductsPageV2() {
	const productState = useSelector((state: RootState) => state.productState);
	const dispatch = useAppDispatch();

	const onAddToCart = (item: Product) => {
		dispatch(
			addToCart({
				id: item.ProductID,
				name: item.ProductName,
				quantity: 1,
				price: item.UnitPrice,
			})
		);
	};

	if (productState.loading) return <>Ürünler Yükleniyor ... </>;

	if (productState.error)
		return <>Ürünler yüklenirken bir hata meydana geldi</>;

	return (
		<>
			<Flex gap="20px" wrap="wrap" vertical justify="space-around">
				<Row gutter={16}>
					{productState.products.map((item) => {
						return (
							<Col
								span={8}
								key={item.ProductID}
								style={{ marginBottom: '1rem' }}
							>
								<Card title={item.ProductName} bordered={true}>
									{Number(item.UnitPrice).toFixed(2)}
									<Flex gap="middle" vertical={false} justify="flex-end">
										<Button onClick={() => onAddToCart(item)} type="primary">
											+
										</Button>
									</Flex>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Flex>
		</>
	);
}

export default ProductsPageV2;
