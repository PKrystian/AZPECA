import React, { useState, useEffect } from 'react';
import ApiService from './ApiService';
import CrudPanel from './CrudPanel';

const UserPanel = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(0);
    const [currentCost, setCurrentCost] = useState(0);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        let timeCostForOneBalance = 10;
        if (isRunning && elapsedTime % timeCostForOneBalance === 0) {
            setCurrentCost((prevCost) => prevCost + 1);
            setRemainingBalance((prevBalance) => {
                const newBalance = Math.max(0, prevBalance - 1);
                return newBalance;
            });
        }
    }, [isRunning, elapsedTime]);

    const handleLogout = () => {
        setUser(null);
        setRemainingBalance(0);
        setIsRunning(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const fetchedUser = await ApiService.getUser(userId);
            if (! fetchedUser) {
                console.error('User not found:', userId);
                return;
            }
            setUser(fetchedUser);
            setRemainingBalance(fetchedUser.Balance);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleStart = async () => {
        const registration = {
            UserId: user.Id,
            DateEntry: new Date().toISOString(),
            DateExit: '9999-12-31T23:59:59.999Z',
        };
        try {
            await ApiService.createRegistration(registration);
            setIsRunning(true);
        } catch (error) {
            console.error('Error starting timer:', error);
        }
    };

    const handleStop = async () => {
        const registration = {
            UserId: user.Id,
            DateEntry: '1753-01-01T00:00:00.000Z',
            DateExit: new Date().toISOString(),
        };
        const updatedUser = {
            ...user,
            Balance: remainingBalance,
        };
        try {
            await ApiService.createRegistration(registration);
            const updatedUserResponse = await ApiService.updateUser(updatedUser);
            setUser(updatedUserResponse);
            setIsRunning(false);
        } catch (error) {
            console.error('Error stopping timer:', error);
        }
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>
            {user && user.Name === 'admin' && user.Surname === 'admin' ? (
                <div>
                    <CrudPanel/>
                </div>
            ) : (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="userId">User ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Confirm ID</button>
                        </form>
                        {user && (
                            <div className="mt-4">
                                <table className="table table-dark table-striped table-hover text-white">
                                    <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{user.Name}</td>
                                            <td>{user.Surname}</td>
                                            <td>{remainingBalance}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>Elapsed Time: {elapsedTime} seconds</p>
                                <p>Current Cost: {currentCost}</p>
                                <button
                                    type="button"
                                    className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`}
                                    onClick={isRunning ? handleStop : handleStart}
                                    disabled={!isRunning && remainingBalance <= 0}
                                >
                                    {isRunning ? 'Stop' : 'Start'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default UserPanel;
