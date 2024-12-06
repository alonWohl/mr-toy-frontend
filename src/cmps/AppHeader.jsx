import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { logout } from '../store/actions/user.actions.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { Logo } from './Logo.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'

export function AppHeader() {
	const dispatch = useDispatch()
	const user = useSelector(storeState => storeState.userModule.loggedInUser)
	const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)

	function onLogout() {
		logout()
			.then(() => {
				showSuccessMsg('logout successfully')
			})
			.catch(() => {
				showErrorMsg('OOPs try again')
			})
	}

	function onToggleCart(ev) {
		if (ev) ev.preventDefault()
		dispatch({ type: TOGGLE_CART_IS_SHOWN })
	}

	return (
		<header className="app-header">
			<section className="header-container">
				<Logo />
				<nav className="app-nav">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/toy">Toys</NavLink>
					<NavLink to="/dashboard">Dashboard</NavLink>
					<a onClick={onToggleCart} href="#">
						🛒 Cart
					</a>
				</nav>
			</section>
			{user ? (
				<section>
					<span to={`/user/${user._id}`}>
						Hello {user.fullname} <span>${user.score.toLocaleString()}</span>
					</span>
					<button onClick={onLogout}>Logout</button>
				</section>
			) : (
				<section>
					<LoginSignup />
				</section>
			)}
			<UserMsg />
			<ShoppingCart isCartShown={isCartShown} onToggleCart={onToggleCart} />
		</header>
	)
}
