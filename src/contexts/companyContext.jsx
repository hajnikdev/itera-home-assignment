import React, {createContext} from 'react';
import {companyReducer} from '../reducers/companyReducer';

const CompanyStateContext = createContext(null);
const CompanyDispatchContext = createContext(null);

const CompanyProvider = ({children}) => {
	const initialState = {
		departments: [],
		employees: [],
		employeeFilter: 0
	}
	const [state, dispatch] = React.useReducer(companyReducer, initialState)

	return (
		<CompanyStateContext.Provider value={state}>
			<CompanyDispatchContext.Provider value={dispatch}>
				{children}
			</CompanyDispatchContext.Provider>
		</CompanyStateContext.Provider>
	);
}

const useCompanyState = () => {
	const context = React.useContext(CompanyStateContext);
	if (context === undefined) {
		throw new Error('useCompanyState must be used within a AuthProvider');
	}
	return context;
};

const useCompanyDispatch = () => {
	const context = React.useContext(CompanyDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}
	return context;
};

export {CompanyProvider, useCompanyState, useCompanyDispatch};
