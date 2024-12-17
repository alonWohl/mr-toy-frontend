import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { addToyMsg, removeToyMsg } from '../store/actions/toy.actions.js'

export function ToyMsg({ toy, loggedInUser, onAddMsg }) {
	const [msg, setMsg] = useState('')

	async function handleSubmitMsg(ev) {
		ev.preventDefault()
		if (!loggedInUser) {
			showErrorMsg('Please login to add message')
			return
		}
		if (!msg.trim()) {
			showErrorMsg('Please enter a message')
			return
		}
		try {
			await addToyMsg(toy._id, msg)
			setMsg('')
			onAddMsg()
		} catch (err) {
			showErrorMsg('Cannot add message')
		}
	}

	async function onRemoveMsg(msgId) {
		if (!loggedInUser) {
			showErrorMsg('Please login to remove message')
			return
		}
		try {
			await removeToyMsg(toy._id, msgId)
			onAddMsg()
		} catch (err) {
			showErrorMsg('Cannot remove message')
		}
	}

	return (
		<div className="messages-container">
			<h3>Messages:</h3>
			{toy.msgs && toy.msgs.length > 0 ? (
				<ul className="messages-list">
					{toy.msgs.map(msg => (
						<li key={msg.id} className="message-item">
							<p>{msg.txt}</p>
							<div className="message-meta">
								<small>By: {msg.by.fullname}</small>
								<small>{new Date(msg.createdAt).toLocaleString()}</small>
								{(loggedInUser?.isAdmin || loggedInUser?._id === msg.by._id) && (
									<button className="btn-remove-msg" onClick={() => onRemoveMsg(msg.id)}>
										×
									</button>
								)}
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>No messages yet</p>
			)}

			{loggedInUser && (
				<form onSubmit={handleSubmitMsg} className="add-message-form">
					<textarea value={msg} onChange={ev => setMsg(ev.target.value)} placeholder="Add your message..." rows="3"></textarea>
					<button className="btn">Add Message</button>
				</form>
			)}
		</div>
	)
}
