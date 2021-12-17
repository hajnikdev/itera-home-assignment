import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Services
import { getEmployee } from '../services/employeeService';
import { getDepartment } from '../services/departmentService';

const EmployeeDetail = (props) => {
	const params = useParams();
	const employeeId = Number(params.employeeId);
	const [employee, setEmployee] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);

	useEffect(() => {
		const getEmployeeFromDB = async () => {
			try {
				const employee = await getEmployee(employeeId);
				if (employee) {
					const department = await getDepartment(employee.departmentId);
					employee.department = department;
					setEmployee(employee);
				}
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false);
			}
		};

		getEmployeeFromDB();
	}, [employeeId]);

	if (loading) {
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

	if (!loading && !employee) {
		return <p>Employee not found!</p>;
	}

	return (
		<div className='Employee-Detail'>
			<div className='Employee-Info'>
				<label>Employee Id: </label>
				<span>{employee?.id}</span>
			</div>
			<div className='Employee-Info'>
				<label>Employee Name: </label>
				<span>{employee?.name}</span>
			</div>
			<div className='Employee-Info'>
				<label>Employee Department: </label>
				<span>{employee?.department?.departmentName}</span>
			</div>
		</div>
	);
};

export default EmployeeDetail;
