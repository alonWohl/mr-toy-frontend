import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { logout } from '../store/actions/user.actions.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { Logo } from './Logo.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { UserMsg } from './UserMsg.jsx'
import { useEffect, useState } from 'react'

export function AppHeader() {
	const dispatch = useDispatch()
	const user = useSelector(storeState => storeState.userModule.loggedInUser)
	const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
	const cartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)

	const [isMenuShown, setIsMenuShown] = useState(false)

	useEffect(() => {
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

	function onLogout() {
		try {
			logout()
			showSuccessMsg('logout successfully')
			setIsMenuShown(false) // Close menu after logout
		} catch {
			showErrorMsg('OOPs try again')
		}
	}

	function onToggleCart(ev) {
		if (ev) ev.preventDefault()
		dispatch({ type: TOGGLE_CART_IS_SHOWN })
		setIsMenuShown(false)
	}

	function closeMenu() {
		setIsMenuShown(false)
		document.body.style.overflow = 'auto'
	}

	function toggleMenu() {
		setIsMenuShown(prev => !prev)
		document.body.style.overflow = !isMenuShown ? 'hidden' : 'auto'
	}

	return (
		<header className="app-header">
			<section className="header-container">
				<Logo />
				<a className="hamburger-menu" onClick={toggleMenu}>
					☰
				</a>

				<nav className={`app-nav ${isMenuShown ? 'menu-open' : ''}`}>
					<div className="nav-links">
						<NavLink onClick={closeMenu} to="/">
							Home
						</NavLink>
						<NavLink onClick={closeMenu} to="/about">
							About
						</NavLink>
						<NavLink onClick={closeMenu} to="/toy">
							Toys
						</NavLink>
						<NavLink onClick={closeMenu} to="/dashboard">
							Dashboard
						</NavLink>
						<a className="shopping-cart-link" onClick={onToggleCart} href="#">
							🛒 Cart
							{cartLength > 0 && <span className="shopping-cart-count">{cartLength}</span>}
						</a>
					</div>
					{user ? (
						<div className="login-link">
							<Link onClick={closeMenu} to={`/user/${user._id}`}>
								Welcome {user.fullname} Balance: {user.score}
							</Link>
							<button onClick={onLogout}>logout</button>
						</div>
					) : (
						<NavLink onClick={closeMenu} to="login">
							login
						</NavLink>
					)}
				</nav>
			</section>
			<UserMsg />
			<ShoppingCart isCartShown={isCartShown} onToggleCart={onToggleCart} />
		</header>
	)
}
