import { useState, useEffect, useMemo } from 'react'
import { useUserContext } from 'context/UserContext'
import SpaceBackground from 'components/common/SpaceBackground'
import styles from 'components/leaderboard/leaderboard.module.css'
import { FaCrown, FaMedal } from 'react-icons/fa'

const MOCK_PARTICIPANTS = []

const ITEMS_PER_PAGE = 10
const TOTAL_PAGES = Math.ceil(MOCK_PARTICIPANTS.length / ITEMS_PER_PAGE)

export default function Leaderboard() {
	const { user, isLoggedIn } = useUserContext()
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		document.body.classList.add('leaderboard-page')
		return () => {
			document.body.classList.remove('leaderboard-page')
		}
	}, [])

	// Determine current user's profile info
	const currentUserName = useMemo(() => {
		if (isLoggedIn && user?.name) return user.name
		return 'You (Ambassador)'
	}, [isLoggedIn, user])

	// Current page items (strictly 10 items)
	const displayedParticipants = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		return MOCK_PARTICIPANTS.slice(startIndex, startIndex + ITEMS_PER_PAGE)
	}, [currentPage])

	const handleFirstPage = () => setCurrentPage(1)
	const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
	const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES))
	const handleLastPage = () => setCurrentPage(TOTAL_PAGES)
	const handlePageClick = (page) => setCurrentPage(page)

	return (
		<div className={styles['leaderboard-page-wrapper']}>
			<SpaceBackground />

			<div className={styles['leaderboard-content-wrapper']}>
				<div className={styles['leaderboard-container']}>
					{/* Compact Page Title */}
					<div className={styles['title-wrapper']}>
						<h1 className={styles['page-title']}>Leaderboard</h1>
					</div>

					{/* Leaderboard Card */}
					<div className={styles['leaderboard-card']}>
						{/* Table Header Row */}
						<div className={`${styles['grid-row']} ${styles['header-row']}`}>
							<span className={styles['col-rank']}>Rank</span>
							<span className={styles['col-name']}>Name</span>
							<span className={styles['col-points']}>Points</span>
						</div>

						{/* 10 Paginated Participant Rows */}
						<ul className={styles['participant-list']}>
							{displayedParticipants.map((item) => (
								<li
									key={item.rank}
									className={`${styles['grid-row']} ${styles['participant-row']}`}
								>
									<span className={styles['col-rank']}>
										{item.rank === 1 ? (
											<span className={styles['rank-badge-1']}>
												<FaCrown className={styles['top-icon']} /> 1
											</span>
										) : item.rank === 2 ? (
											<span className={styles['rank-badge-2']}>
												<FaMedal className={styles['top-icon']} /> 2
											</span>
										) : item.rank === 3 ? (
											<span className={styles['rank-badge-3']}>
												<FaMedal className={styles['top-icon']} /> 3
											</span>
										) : (
											item.rank
										)}
									</span>
									<span className={styles['col-name']} title={item.name}>
										{item.name}
									</span>
									<span className={styles['col-points']}>
										{item.points.toLocaleString()}
										<span className={styles['points-unit']}>pts</span>
									</span>
								</li>
							))}
						</ul>

						{/* Current User's Rank ("Our Rank") Pinned Section */}
						<div className={styles['user-rank-section']}>
							<div className={`${styles['grid-row']} ${styles['user-rank-row']}`}>
								<span className={styles['col-rank']}>24</span>
								<span className={styles['col-name']}>
									<span>{currentUserName}</span>
									<span className={styles['you-badge']}>YOU</span>
								</span>
								<span className={styles['col-points']}>
									680
									<span className={styles['points-unit']}>pts</span>
								</span>
							</div>
						</div>

						{/* Pagination Controls */}
						<nav className={styles['pagination-wrapper']} aria-label='Leaderboard pagination'>
							{/* First Page */}
							<button
								type='button'
								className={`${styles['page-btn']} ${styles['page-nav-btn']}`}
								onClick={handleFirstPage}
								disabled={currentPage === 1}
								aria-label='First page'
								title='First page'
							>
								«
							</button>

							{/* Previous Page */}
							<button
								type='button'
								className={`${styles['page-btn']} ${styles['page-nav-btn']}`}
								onClick={handlePrevPage}
								disabled={currentPage === 1}
								aria-label='Previous page'
								title='Previous page'
							>
								‹
							</button>

							{/* Numbered Page Buttons */}
							{Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => (
								<button
									key={pageNum}
									type='button'
									className={`${styles['page-btn']} ${
										currentPage === pageNum ? styles['active'] : ''
									}`}
									onClick={() => handlePageClick(pageNum)}
									aria-current={currentPage === pageNum ? 'page' : undefined}
								>
									{pageNum}
								</button>
							))}

							{/* Next Page */}
							<button
								type='button'
								className={`${styles['page-btn']} ${styles['page-nav-btn']}`}
								onClick={handleNextPage}
								disabled={currentPage === TOTAL_PAGES}
								aria-label='Next page'
								title='Next page'
							>
								›
							</button>

							{/* Last Page */}
							<button
								type='button'
								className={`${styles['page-btn']} ${styles['page-nav-btn']}`}
								onClick={handleLastPage}
								disabled={currentPage === TOTAL_PAGES}
								aria-label='Last page'
								title='Last page'
							>
								»
							</button>
						</nav>
					</div>
				</div>
			</div>
		</div>
	)
}
