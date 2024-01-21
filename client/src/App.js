import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApiService from './ApiService';
import React, { useState, useEffect } from 'react';

function App() {
	const [users, setUsers] = useState([]);
	const [registrations, setRegistrations] = useState([]);
	const [newUser, setNewUser] = useState({ Name: '', Surname: '', Balance: 0 });
	const [newRegistration, setNewRegistration] = useState({ UserId: '', DateEntry: '', DateExit: '' });
	const [updateUser, setUpdateUser] = useState(null);
	const [updateRegistration, setUpdateRegistration] = useState(null);

	useEffect(() => {
		const fetchUsersAndRegistrations = async () => {
			const users = await ApiService.getUsers();
			const registrations = await ApiService.getRegistrations();
			setUsers(users);
			setRegistrations(registrations);
		};
		fetchUsersAndRegistrations();
	}, []);

	const handleCreateUser = async () => {
		const user = await ApiService.createUser(newUser);
		setUsers([...users, user]);
		setNewUser({ Name: '', Surname: '', Balance: 0 });
	};

	const handleCreateRegistration = async () => {
		const registration = await ApiService.createRegistration(newRegistration);
		setRegistrations([...registrations, registration]);
		setNewRegistration({ UserId: '', DateEntry: '', DateExit: '' });
	};

	const handleUpdateUser = async (user) => {
		const updatedUser = await ApiService.updateUser(user);
		setUsers(users.map(u => u.Id === updatedUser.Id ? updatedUser : u));
		setUpdateUser(null);
	};

	const handleUpdateRegistration = async (registration) => {
		const updatedRegistration = await ApiService.updateRegistration(registration);
		setRegistrations(registrations.map(r => r.Id === updatedRegistration.Id ? updatedRegistration : r));
		setUpdateRegistration(null);
	};

	const handleDeleteUser = async (userId) => {
		await ApiService.deleteUser(userId);
		setUsers(users.filter(user => user.Id !== userId));
	};

	const handleDeleteRegistration = async (registrationId) => {
		await ApiService.deleteRegistration(registrationId);
		setRegistrations(registrations.filter(registration => registration.Id !== registrationId));
	};

	return (
		<div className="App">
			<div className="container mt-4">
				<h1 className="mb-4">Users</h1>
				<table className="table table-dark table-striped table-hover text-white">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Surname</th>
							<th>Balance</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.Id}>
								<td>{user.Id}</td>
								<td>{user.Name}</td>
								<td>{user.Surname}</td>
								<td>{user.Balance}</td>
								<td>
									<button className="btn btn-sm btn-primary mr-2" onClick={() => setUpdateUser(user)}>Update</button>
									<button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.Id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<h1 className="mt-4">Registrations</h1>
				<table className="table table-dark table-striped table-hover text-white">
					<thead>
						<tr>
							<th>ID</th>
							<th>User ID</th>
							<th>Entry Date</th>
							<th>Exit Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{registrations.map((registration) => (
							<tr key={registration.Id}>
								<td>{registration.Id}</td>
								<td>{registration.UserId}</td>
								<td>{registration.DateEntry}</td>
								<td>{registration.DateExit}</td>
								<td>
									<button className="btn btn-sm btn-primary mr-2" onClick={() => setUpdateRegistration(registration)}>Update</button>
									<button className="btn btn-sm btn-danger" onClick={() => handleDeleteRegistration(registration.Id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<h2 className="mt-4">Create User</h2>
				<div className="mb-4">
					<input
						type="text"
						placeholder="Name"
						value={newUser.Name}
						onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
						className="form-control bg-dark text-white mb-2"
					/>
					<input
						type="text"
						placeholder="Surname"
						value={newUser.Surname}
						onChange={(e) => setNewUser({ ...newUser, Surname: e.target.value })}
						className="form-control bg-dark text-white mb-2"
					/>
					<input
						type="number"
						placeholder="Balance"
						value={newUser.Balance}
						onChange={(e) => setNewUser({ ...newUser, Balance: parseFloat(e.target.value) })}
						className="form-control bg-dark text-white mb-2"
					/>
					<button className="btn btn-success" onClick={handleCreateUser}>Submit</button>
				</div>
				<h2 className="mt-4">Create Registration</h2>
				<div className="mb-4">
					<input
						type="number"
						placeholder="User ID"
						value={newRegistration.UserId}
						onChange={(e) => setNewRegistration({ ...newRegistration, UserId: parseInt(e.target.value, 10) })}
						className="form-control bg-dark text-white mb-2"
					/>
					<input
						type="date"
						placeholder="Entry Date"
						value={newRegistration.DateEntry}
						onChange={(e) => setNewRegistration({ ...newRegistration, DateEntry: e.target.value })}
						className="form-control bg-dark text-white mb-2"
					/>
					<input
						type="date"
						placeholder="Exit Date"
						value={newRegistration.DateExit}
						onChange={(e) => setNewRegistration({ ...newRegistration, DateExit: e.target.value })}
						className="form-control bg-dark text-white mb-2"
					/>
					<button className="btn btn-success" onClick={handleCreateRegistration}>Submit</button>
				</div>
				{updateUser && (
					<div className="mt-4">
						<h2>Update User</h2>
						<input
							type="text"
							placeholder="Name"
							value={updateUser.Name}
							onChange={(e) => setUpdateUser({ ...updateUser, Name: e.target.value })}
							className="form-control bg-dark text-white mb-2"
						/>
						<input
							type="text"
							placeholder="Surname"
							value={updateUser.Surname}
							onChange={(e) => setUpdateUser({ ...updateUser, Surname: e.target.value })}
							className="form-control bg-dark text-white mb-2"
						/>
						<input
							type="number"
							placeholder="Balance"
							value={updateUser.Balance}
							onChange={(e) => setUpdateUser({ ...updateUser, Balance: parseFloat(e.target.value) })}
							className="form-control bg-dark text-white mb-2"
						/>
						<button className="btn btn-primary" onClick={() => handleUpdateUser(updateUser)}>Update</button>
					</div>
				)}
				{updateRegistration && (
					<div className="mt-4">
						<h2>Update Registration</h2>
						<input
							type="date"
							placeholder="Entry Date"
							value={updateRegistration.DateEntry}
							onChange={(e) => setUpdateRegistration({ ...updateRegistration, DateEntry: e.target.value })}
							className="form-control bg-dark text-white mb-2"
						/>
						<input
							type="date"
							placeholder="Exit Date"
							value={updateRegistration.DateExit}
							onChange={(e) => setUpdateRegistration({ ...updateRegistration, DateExit: e.target.value })}
							className="form-control bg-dark text-white mb-2"
						/>
						<button className="btn btn-primary" onClick={() => handleUpdateRegistration(updateRegistration)}>Update</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
