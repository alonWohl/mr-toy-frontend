import { useState } from 'react'

export function LoginForm({ onLogin, isSignup }) {
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
		fullname: ''
	})

	const [errors, setErrors] = useState({
		username: '',
		password: '',
		fullname: ''
	})

	const validateField = (name, value) => {
		switch (name) {
			case 'username':
				return value.length < 2 ? 'Username must be at least 2 characters' : ''
			case 'password':
				return value.length < 2 ? 'Password must be at least 2 characters' : ''
			case 'fullname':
				return isSignup && !value ? 'Full name is required' : ''
			default:
				return ''
		}
	}

	function handleChange(ev) {
		const { name, value } = ev.target
		setCredentials(prev => ({
			...prev,
			[name]: value
		}))

		const error = validateField(name, value)
		setErrors(prev => ({
			...prev,
			[name]: error
		}))
	}

	function handleSubmit(ev) {
		ev.preventDefault()

		const newErrors = {
			username: validateField('username', credentials.username),
			password: validateField('password', credentials.password),
			fullname: validateField('fullname', credentials.fullname)
		}

		setErrors(newErrors)

		const hasErrors = Object.values(newErrors).some(error => error)

		if (!hasErrors) {
			onLogin(credentials)
		}
	}

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" required autoFocus />
				{errors.username && <span className="error">{errors.username}</span>}

				<input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required autoComplete="off" />
				{errors.password && <span className="error">{errors.password}</span>}

				{isSignup && (
					<>
						<input type="text" name="fullname" value={credentials.fullname} onChange={handleChange} placeholder="Full name" required />
						{errors.fullname && <span className="error">{errors.fullname}</span>}
					</>
				)}

				<button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
			</form>
		</div>
	)
}
