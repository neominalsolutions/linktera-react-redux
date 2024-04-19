import axios from 'axios';

export interface Product {
	ProductID: number;
	ProductName: string;
	UnitPrice: number;
	UnitsInStock: number;
}

export const getProducts = async () => {
	try {
		const response = await axios.get(
			'https://services.odata.org/northwind/northwind.svc/Products?$format=json&$select=ProductName,UnitPrice,UnitsInStock,ProductID'
		);

		console.log('data', response.data);

		return response.data.value as Product[];
	} catch (error) {
		return Promise.reject(error);
	}
};
