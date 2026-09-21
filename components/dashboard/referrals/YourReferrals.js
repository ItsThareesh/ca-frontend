// The ticketing provider reports how many tickets were booked with a code, not
// who booked them, so this shows a total rather than a table of referrals.
export default function YourReferrals({ ticketCount }) {
	return (
		<div className='your-referrals'>
			<h4>Your referrals</h4>

			{ticketCount > 0 ? (
				<div className='your-referrals-table-wrapper'>
					<table className='your-referrals-table'>
						<tbody>
							<tr>
								<th>Tickets booked with your code</th>
								<td>{ticketCount}</td>
							</tr>
						</tbody>
					</table>
					<p>Counted after payment is confirmed. Individual bookings are not listed.</p>
				</div>
			) : (
				<div className='empty'>Nothing here yet</div>
			)}
		</div>
	)
}
