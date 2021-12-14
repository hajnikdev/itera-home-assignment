import React, { useEffect, useState } from 'react';

// Services
import { getDepartments } from '../services/departmentService';

// Dispatcher
import { useCompanyDispatch } from '../contexts/companyContext';

// Company state
import { useCompanyState } from '../contexts/companyContext';

const DepartmentFilter = () => {
	const companyContext = useCompanyState();
	const companyDispatcher = useCompanyDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getDepartmentsFromDB = async () => {
			try {
				const departments = await getDepartments();
				if (departments && Array.isArray(departments) && departments.length !== 0) {
					companyDispatcher({
						type: 'STORE_DEPARTMENTS',
						payload: departments,
					});
				}
			} catch (error) {
				throw new Error(error)
			} finally {
				setLoading(false)
			}
		};

		getDepartmentsFromDB();
	}, [companyDispatcher]);

	/**
	 * Change department filter handler.
	 * @param {SynteticEvent} e
	 */
	const departmentFilterHandler = (e) => {
		companyDispatcher({
			type: 'CHANGE_EMPLOYEE_FILTER',
			payload: Number(e.target.value) ?? 0,
		});
	};

	if (!loading && !(companyContext?.departments && companyContext?.departments?.length)) {
		return <div> Loading departments ... </div>;
	}

	return (
		<div className='Department-Filter'>
			<select value={companyContext?.employeeFilter} onChange={departmentFilterHandler}>
				<option value={0}>All departments</option>
				{companyContext?.departments.map((department) => {
					return (
						<option key={department.id} value={department.id}>
							{department.departmentName}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default DepartmentFilter;
