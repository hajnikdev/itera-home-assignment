import axios from 'axios';

export const getDepartments = async () => {
	try {
		const response = await axios.get('http://localhost:3001/departments');
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('getDepartments: Response not 200 - OK ');
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

export const getDepartment = async (id) => {
	if (!id && isNaN(Number(id))) throw new Error();

	try {
		const response = await axios.get(`http://localhost:3001/departments/${id}`);
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('getDepartment: Response not 200 - OK');
		}
	} catch (error) {
		throw new Error(error.message);
	}
};
