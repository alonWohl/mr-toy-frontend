import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

export function LoginSignup() {
	const [isSignup, setIsSignUp] = useState(false)

	async function onLogin(credentials) {
		try {
			if (isSignup) {
				const user = await signup(credentials)
				showSuccessMsg(`Welcome ${user.fullname}!`)
			} else {
				const user = await login(credentials)
				showSuccessMsg(`Welcome back ${user.fullname}!`)
			}
		} catch (err) {
			console.error('Error:', err)
			showErrorMsg('Invalid login details')
		}
	}

	return (
		<div className="login-page">
			<LoginForm onLogin={onLogin} isSignup={isSignup} />
			<div className="btns">
				<a
					href="#"
					onClick={ev => {
						ev.preventDefault()
						setIsSignUp(!isSignup)
					}}
				>
					{isSignup ? 'Already a member? Login' : 'New user? Signup here'}
				</a>
			</div>
		</div>
	)
}
