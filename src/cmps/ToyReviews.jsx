import { useState } from 'react'

export function ToyReviews({ reviews = [], isLoading, loggedInUser, onAddReview, onRemoveReview }) {
	const [reviewTxt, setReviewTxt] = useState('')

	function handleSubmit(ev) {
		ev.preventDefault()
		if (!reviewTxt.trim()) return

		onAddReview({ txt: reviewTxt.trim() })
		setReviewTxt('')
	}

	function isUserReview(review) {
		return loggedInUser && review.byUser._id === loggedInUser._id
	}

	if (isLoading) return <div className="loading">Loading...</div>

	return (
		<section className="toy-reviews">
			<h2>Reviews</h2>

			{loggedInUser && (
				<form className="add-review" onSubmit={handleSubmit}>
					<textarea className="review-input" rows="3" placeholder="Write your review..." value={reviewTxt} onChange={ev => setReviewTxt(ev.target.value)}></textarea>
					<button className="btn">Add Review</button>
				</form>
			)}

			{!reviews.length ? (
				<div className="reviews-empty">
					<h3>No reviews yet</h3>
				</div>
			) : (
				<div className="reviews-list">
					{reviews.map(review => (
						<article key={review._id} className="review-preview">
							<div className="review-header">
								<h3 className="reviewer-name">{review.byUser.fullname}</h3>
								{isUserReview(review) && (
									<button className="btn-remove" onClick={() => onRemoveReview(review._id)}>
										×
									</button>
								)}
							</div>
							<p className="review-txt">{review.txt}</p>
						</article>
					))}
				</div>
			)}
		</section>
	)
}
