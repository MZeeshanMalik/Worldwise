import { useEffect } from 'react';
import { useAuth } from '../conext/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
	const { isAuthincated } = useAuth();
	const navigate = useNavigate();
	useEffect(
		function () {
			if (!isAuthincated) navigate('/');
            
		},
		[isAuthincated, navigate]
	);
	return isAuthincated ? children : null;
}

export default ProtectedRoute;
