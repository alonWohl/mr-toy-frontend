const logoText = 'Mr Toy'
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink', 'cyan']

export function Logo() {
	return (
		<div className="logo">
			{logoText.split('').map((char, index) => (
				<span key={index} style={{ color: colors[index % colors.length] }}>
					{char}
				</span>
			))}
		</div>
	)
}
