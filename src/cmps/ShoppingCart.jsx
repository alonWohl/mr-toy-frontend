import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_TOY_FROM_CART } from '../store/reducers/toy.reducer.js'
import { checkout } from '../store/actions/user.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

function CartItem({ toy, onRemove }) {
	return (
		<li className="cart-item">
			<div className="item-details">
				<img src={`https://robohash.org/${toy._id}?set=set4`} alt={toy.name} />
				<div className="item-info">
					<h3>{toy.name}</h3>
					<p className="price">${toy.price.toLocaleString()}</p>
				</div>
			</div>
			<button className="btn-remove" onClick={() => onRemove(toy._id)} aria-label={`Remove ${toy.name} from cart`}>
				×
			</button>
		</li>
	)
}

export function ShoppingCart({ isCartShown, onToggleCart }) {
	const dispatch = useDispatch()
	const shoppingCart = useSelector(storeState => storeState.toyModule.shoppingCart)
	const user = useSelector(storeState => storeState.userModule.loggedInUser)

	const removeFromCart = toyId => {
		dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
		showSuccessMsg('Item removed from cart')
	}

	const getCartTotal = () => {
		return shoppingCart.reduce((acc, toy) => acc + toy.price, 0)
	}

	const onCheckout = async () => {
		try {
			const amount = getCartTotal()
			await checkout(amount)
			showSuccessMsg(`Successfully charged: $${amount.toLocaleString()}`)
			onToggleCart()
		} catch (err) {
			showErrorMsg('Failed to process checkout. Please try again.')
		}
	}

	if (!isCartShown) return null

	const total = getCartTotal()
	const isCheckoutDisabled = !user || !total

	return (
		<section className="cart">
			<div className="cart-header">
				<h2>Your Cart</h2>
				<button className="btn close" onClick={onToggleCart} aria-label="Close cart">
					×
				</button>
			</div>

			{shoppingCart.length === 0 ? (
				<div className="empty-cart">
					<p>Your cart is empty</p>
					<small>Add some toys to get started!</small>
				</div>
			) : (
				<>
					<ul className="cart-items">
						{shoppingCart.map(toy => (
							<CartItem key={toy._id} toy={toy} onRemove={removeFromCart} />
						))}
					</ul>

					<div className="cart-footer">
						<div className="total">
							<span>Total:</span>
							<span>${total.toLocaleString()}</span>
						</div>

						<button className="checkout-btn" disabled={isCheckoutDisabled} onClick={onCheckout}>
							{!user ? 'Please login to checkout' : !total ? 'Add items to cart' : 'Checkout'}
						</button>
					</div>
				</>
			)}
		</section>
	)
}
