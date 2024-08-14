import { createContext, useContext, useReducer } from 'react';
import React from 'react';

const initialState = {
	user: null,
	isAuthincated: false,
};
const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwertys',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

function reducer(state, action) {
	switch (action.type) {
		case 'login':
			return { ...state, user: action.payload, isAuthincated: true };
		case 'logout':
			return { ...state, user: null, isAuthincated: false };
		default:
			throw new Error('Unknow action ');
	}
}

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
	const [{ user, isAuthincated }, dispatch] = useReducer(reducer, initialState);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
            console.log('matched')
			dispatch({ type: 'login', payload: FAKE_USER });
		}
	}
	function logout() {
		dispatch({ type: 'logout' });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthincated,login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw Error('AuthController was used outside Authprovider');
	return context;
}

export { AuthProvider, useAuth };
