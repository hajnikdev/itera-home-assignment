import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Global styles
import './App.css';

// Components
import EmployeeList from './components/EmployeeList';
import DepartmentFilter from './components/DepartmentFilter';
import EmployeeDetail from './components/EmployeeDetail';

// Company provider
import { CompanyProvider } from './contexts/companyContext';

const App = () => {
	return (
		<BrowserRouter>
			<CompanyProvider>
				<div className='App'>
					<header className='App-header'>
						<h1>Employee list</h1>
					</header>
					<div className='Content'>
						<Routes>
							<Route
								path='/'
								element={
									<>
										<DepartmentFilter />
										<EmployeeList />
									</>
								}
							/>
							<Route path='/employee/:employeeId' element={<EmployeeDetail />} />
							<Route
								path='*'
								element={
									<main style={{ padding: '1rem' }}>
										<p>There's nothing here!</p>
									</main>
								}
							/>
						</Routes>
					</div>
				</div>
			</CompanyProvider>
		</BrowserRouter>
	);
};

export default App;
