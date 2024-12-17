import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'

import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { logout } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { Logo } from './Logo.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const user = useSelector(storeState => storeState.userModule.loggedInUser)
	const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
	const cartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)

	const [isMenuShown, setIsMenuShown] = useState(false)

	useEffect(() => {
		document.body.style.overflow = isMenuShown ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isMenuShown])

	const onLogout = async () => {
		try {
			await logout()
			showSuccessMsg('Logout successful')
			setIsMenuShown(false)
			navigate('/')
		} catch (err) {
			showErrorMsg('Failed to logout, please try again')
		}
	}

	const onToggleCart = useCallback(
		ev => {
			ev?.preventDefault()
			dispatch({ type: TOGGLE_CART_IS_SHOWN })
			setIsMenuShown(false)
		},
		[dispatch]
	)

	const toggleMenu = () => {
		setIsMenuShown(prev => !prev)
	}

	const closeMenu = () => {
		setIsMenuShown(false)
	}

	// Navigation Links Component
	const NavLinks = ({ onClose }) => (
		<div className="nav-links">
			<NavLink onClick={onClose} to="/">
				Home
			</NavLink>
			<NavLink onClick={onClose} to="/about">
				About
			</NavLink>
			<NavLink onClick={onClose} to="/toy">
				Toys
			</NavLink>
			<NavLink onClick={onClose} to="/dashboard">
				Dashboard
			</NavLink>
			<a className="shopping-cart-link" onClick={onToggleCart} href="#">
				🛒 Cart
				{cartLength > 0 && <span className="shopping-cart-count">{cartLength}</span>}
			</a>
		</div>
	)

	const UserSection = ({ onClose }) =>
		user ? (
			<div className="login-link">
				<Link onClick={onClose} to={`/user/${user._id}`}>
					Welcome {user.fullname} | <span className="user-balance">Balance: {user.score}</span>
				</Link>
				<button className="btn-logout" onClick={onLogout}>
					Logout
				</button>
			</div>
		) : (
			<NavLink className="btn-login" onClick={onClose} to="login">
				Login
			</NavLink>
		)

	return (
		<header className="app-header">
			<section className="header-container">
				<Logo />
				<button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuShown}>
					☰
				</button>

				<nav className={`app-nav ${isMenuShown ? 'menu-open' : ''}`} role="navigation">
					<NavLinks onClose={closeMenu} />
					<UserSection onClose={closeMenu} />
				</nav>
			</section>

			<UserMsg />
			<ShoppingCart isCartShown={isCartShown} onToggleCart={onToggleCart} />
		</header>
	)
}
