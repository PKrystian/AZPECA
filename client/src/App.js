import './App.css';
import React, { useEffect, useState } from 'react';
import ApiService from './ApiService';

function App() {
	const [users, setUsers] = useState([]);
	const [registrations, setRegistrations] = useState([]);
	const [newUser, setNewUser] = useState({ Name: '', Surname: '', Balance: 0 });
	const [newRegistration, setNewRegistration] = useState({
		UserId: 0,
		DateEntry: '',
		DateExit: '',
	});

	useEffect(() => {
		ApiService.getUsers()
		.then((data) => setUsers(data))
		.catch((error) => console.error('Error getting users:', error));

		ApiService.getRegistrations()
		.then((data) => setRegistrations(data))
		.catch((error) => console.error('Error getting registrations:', error));
	}, []);

	const handleCreateUser = async () => {
		try {
			const createdUser = await ApiService.createUser(newUser);
			setUsers([...users, createdUser]);
			setNewUser({ Name: '', Surname: '', Balance: 0 });
		} catch (error) {
			console.error('Error creating user:', error);
		}
	};

	const handleUpdateUser = async (updatedUser) => {
		try {
			const result = await ApiService.updateUser(updatedUser);
			if (result) {
				const updatedUsers = users.map((user) =>
					user.Id === updatedUser.Id ? { ...user, ...updatedUser } : user
				);
				setUsers(updatedUsers);
			}
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};

	const handleDeleteUser = async (userId) => {
		try {
			const result = await ApiService.deleteUser(userId);
			if (result) {
				const filteredUsers = users.filter((user) => user.Id !== userId);
				setUsers(filteredUsers);
			}
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	const handleCreateRegistration = async () => {
		try {
			const createdRegistration = await ApiService.createRegistration(newRegistration);
			setRegistrations([...registrations, createdRegistration]);
			setNewRegistration({ UserId: 0, DateEntry: '', DateExit: '' });
		} catch (error) {
			console.error('Error creating registration:', error);
		}
	};

	const handleUpdateRegistration = async (updatedRegistration) => {
		try {
			const result = await ApiService.updateRegistration(updatedRegistration);
			if (result) {
				const updatedRegistrations = registrations.map((reg) =>
					reg.Id === updatedRegistration.Id ? { ...reg, ...updatedRegistration } : reg
				);
				setRegistrations(updatedRegistrations);
			}
		} catch (error) {
			console.error('Error updating registration:', error);
		}
	};

	const handleDeleteRegistration = async (registrationId) => {
		try {
			const result = await ApiService.deleteRegistration(registrationId);
			if (result) {
				const filteredRegistrations = registrations.filter((reg) => reg.Id !== registrationId);
				setRegistrations(filteredRegistrations);
			}
		} catch (error) {
			console.error('Error deleting registration:', error);
		}
	};

	return (
		<div className="App">
			<h1>Users</h1>
			<ul>
				{users.map((user) => (
					<li key={user.Id}>
						{`${user.Name} ${user.Surname} - Balance: ${user.Balance}`}
						<button onClick={() => handleDeleteUser(user.Id)}>Delete</button>
					</li>
				))}
			</ul>

			<h1>Registrations</h1>
			<ul>
				{registrations.map((registration) => (
					<li key={registration.Id}>
						{`User ${registration.UserId} - Entry: ${registration.DateEntry}, Exit: ${registration.DateExit}`}
						<button onClick={() => handleDeleteRegistration(registration.Id)}>Delete</button>
					</li>
				))}
			</ul>

			<h2>Create User</h2>
			<div>
				<input
					type="text"
					placeholder="Name"
					value={newUser.Name}
					onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Surname"
					value={newUser.Surname}
					onChange={(e) => setNewUser({ ...newUser, Surname: e.target.value })}
				/>
				<input
					type="number"
					placeholder="Balance"
					value={newUser.Balance}
					onChange={(e) => setNewUser({ ...newUser, Balance: e.target.value })}
				/>
				<button onClick={handleCreateUser}>Create</button>
			</div>

			<h2>Create Registration</h2>
			<div>
				<input
					type="number"
					placeholder="User ID"
					value={newRegistration.UserId}
					onChange={(e) => setNewRegistration({ ...newRegistration, UserId: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Entry Date"
					value={newRegistration.DateEntry}
					onChange={(e) => setNewRegistration({ ...newRegistration, DateEntry: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Exit Date"
					value={newRegistration.DateExit}
					onChange={(e) => setNewRegistration({ ...newRegistration, DateExit: e.target.value })}
				/>
				<button onClick={handleCreateRegistration}>Create</button>
			</div>
		</div>
	);
}

export default App;
