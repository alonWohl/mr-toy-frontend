import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { logout } from '../store/actions/user.actions.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { Logo } from './Logo.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
	const dispatch = useDispatch()
	const user = useSelector(storeState => storeState.userModule.loggedInUser)
	const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
	const cartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)

	function onLogout() {
		try {
			logout()
			showSuccessMsg('logout successfully')
		} catch {
			showErrorMsg('OOPs try again')
		}
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
					<div className="nav-links">
						<NavLink to="/">Home</NavLink>
						<NavLink to="/about">About</NavLink>
						<NavLink to="/toy">Toys</NavLink>
						<NavLink to="/dashboard">Dashboard</NavLink>
						<a className="shopping-cart-link" onClick={onToggleCart} href="#">
							🛒 Cart
							{cartLength > 0 && <span className="shopping-cart-count">{cartLength}</span>}
						</a>
					</div>
					{user ? (
						<div className="login-link">
							<Link to={`/user/${user._id}`}>Welcome {user.fullname}</Link>
							<button onClick={onLogout}>logout</button>
						</div>
					) : (
						<NavLink to="login">login</NavLink>
					)}
				</nav>
			</section>
			<UserMsg />
			<ShoppingCart isCartShown={isCartShown} onToggleCart={onToggleCart} />
		</header>
	)
}
