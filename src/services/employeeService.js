import axios from 'axios';

export const getEmployees = async () => {
	try {
		const response = await axios.get('http://localhost:3001/employees');
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('getEmployees: Response not 200 - OK ');
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

export const getEmployee = async (id) => {
	if (!id && isNaN(Number(id))) throw new Error();

	try {
		const response = await axios.get(`http://localhost:3001/employees/${id}`);
		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error('getEmployee: Response not 200 - OK ');
		}
	} catch (error) {
		throw new Error(error.message);
	}
};
