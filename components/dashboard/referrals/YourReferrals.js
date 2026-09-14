export default function YourReferrals({ referrals }) {
	return (
		<div className='your-referrals'>
			<h4>Your referrals</h4>

			{referrals?.length > 0 ? (
				<div className='your-referrals-table-wrapper'>
					<table className='your-referrals-table'>
						<tbody>
							<tr>
								<th>Name</th>
								<th>Event</th>
								<th>Workshop/Lecture</th>
								<th>Points</th>
							</tr>
							{referrals.map((item, index) => (
								<tr key={index}>
									<td>{item?.name || '—'}</td>
									<td>{item?.event || '—'}</td>
									<td>{item?.type || '—'}</td>
									<td>+{item?.points || 0}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className='empty'>Nothing here yet</div>
			)}
		</div>
	)
}
