export const companyReducer = (
	prevState,
	action
) => {
	switch (action.type) {
		case 'STORE_DEPARTMENTS':
			return {
				...prevState,
				departments: action.payload,
			};
		case 'STORE_EMPLOYEES':
			return {
				...prevState,
				employees: action.payload,
			};
		case 'CHANGE_EMPLOYEE_FILTER':
			return {
				...prevState,
				employeeFilter: action.payload,
			};
		default:
			return prevState;
	}
};
