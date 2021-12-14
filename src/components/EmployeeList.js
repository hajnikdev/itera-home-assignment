import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Services
import { getEmployees } from '../services/employeeService';

// Dispatcher
import { useCompanyDispatch } from '../contexts/companyContext';

// Company state
import { useCompanyState } from '../contexts/companyContext';

const EmployeeList = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);

	let navigate = useNavigate();

	const companyContext = useCompanyState();
	const companyDispatcher = useCompanyDispatch();

	useEffect(() => {
		const getEmployeesFromDB = async () => {
			try {
				const employees = await getEmployees();
				if (employees && Array.isArray(employees) && employees.length !== 0) {
					companyDispatcher({
						type: 'STORE_EMPLOYEES',
						payload: employees,
					});
				}
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		getEmployeesFromDB();
	}, [companyDispatcher]);

	// On row click using currying
	const redirectToEmployee = (employeeId) => () => {
		navigate(`/employee/${employeeId}`);
	};

	if (
		loading &&
		(!(companyContext?.employees && companyContext?.employees?.length) ||
			!(companyContext?.departments && companyContext?.departments?.length))
	) {
		return <div> Loading data ... </div>;
	}

	if (!loading && error) {
		return (
			<div>
				<p>{error}</p>
				<p>Oops, data fetching failed ...</p>
			</div>
		);
	}

	return (
		<div className='Employee-List'>
			<table>
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>Name</th>
						<th>Department</th>
					</tr>
				</thead>
				<tbody>
					{companyContext?.employees
						?.filter((employee) => {
							if (companyContext?.employeeFilter === 0) return true;
							return employee.departmentId == companyContext?.employeeFilter;
						})
						.map((employee) => {
							return (
								<tr key={employee.id} onClick={redirectToEmployee(employee.id)}>
									<td>{employee.id}</td>
									<td>{employee.name}</td>
									<td>
										{
											companyContext?.departments?.find((department) => department.id === employee.departmentId)
												.departmentName
										}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default EmployeeList;
