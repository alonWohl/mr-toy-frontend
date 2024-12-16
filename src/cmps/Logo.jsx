import { Link } from 'react-router-dom'

const logoText = 'Mr Toy'
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'cyan']

export function Logo() {
	return (
		<Link to={'/'} className="logo">
			{logoText.split('').map((char, index) => (
				<span key={index} style={{ color: colors[index % colors.length] }}>
					{char}
				</span>
			))}
		</Link>
	)
}
