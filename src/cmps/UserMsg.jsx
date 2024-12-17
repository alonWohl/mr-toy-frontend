import { useEffect, useRef, useState } from 'react'
import { eventBusService } from '../services/event-bus.service.js'

export function UserMsg() {
	const [msg, setMsg] = useState(null)
	const [isRemoving, setIsRemoving] = useState(false)
	const timeoutIdRef = useRef(null)
	const removeTimeoutRef = useRef(null)

	useEffect(() => {
		const unsubscribe = eventBusService.on('show-user-msg', newMsg => {
			if (removeTimeoutRef.current) {
				clearTimeout(removeTimeoutRef.current)
			}

			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current)
			}

			setIsRemoving(false)
			setMsg(newMsg)

			timeoutIdRef.current = setTimeout(closeMsg, 3000)
		})

		return () => {
			unsubscribe()
			if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
			if (removeTimeoutRef.current) clearTimeout(removeTimeoutRef.current)
		}
	}, [])

	function closeMsg() {
		setIsRemoving(true)

		removeTimeoutRef.current = setTimeout(() => {
			setMsg(null)
			setIsRemoving(false)
		}, 300)
	}

	if (!msg) return null

	return (
		<section className={`user-msg ${msg.type} ${isRemoving ? 'removing' : ''}`}>
			<div className="msg-content">{msg.txt}</div>
			<button className="close-button" onClick={closeMsg} aria-label="Close message">
				×
			</button>
		</section>
	)
}
