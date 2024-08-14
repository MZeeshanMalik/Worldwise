/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import CityList from './components/CityList';
import City from './components/City';
import Form from './components/Form';
import CountriesList from './components/CountriesList';
import { CitiesProvider } from './conext/CitiesContext';
import { AuthProvider } from './conext/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import SpinnerFullPage from './components/SpinnerFullPage'



const HomePage = lazy(() => import('./pages/Homepage'));
const Products = lazy(() => import('./pages/Product'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Pricing = lazy(() => import('./pages/Pricing'));

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
				<Suspense fallback={<SpinnerFullPage />}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="product" element={<Products />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="/login" element={<Login />} />

						<Route
							path="app"
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate replace to="cities" />} />
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountriesList />} />
							<Route path="form" element={<Form />} />
						</Route>
					</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
