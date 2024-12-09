import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
export function App() {
	return (
		<Provider store={store}>
			<Router>
				<section className="app">
					<AppHeader />
					<main className="main-layout">
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/toy" element={<ToyIndex />} />
							<Route path="/toy/:toyId" element={<ToyDetails />} />
							<Route path="toy/edit" element={<ToyEdit />} />
							<Route path="toy/edit/:toyId" element={<ToyEdit />} />
							<Route path="dashboard" element={<Dashboard />} />

							<Route path="/about" element={<AboutUs />} />
							<Route path="/cart" element={''} />
						</Routes>
					</main>
					<AppFooter />
				</section>
			</Router>
		</Provider>
	)
}
