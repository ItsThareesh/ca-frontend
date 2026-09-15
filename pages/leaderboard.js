import { useState, useEffect, useMemo } from 'react'
import { useUserContext } from 'context/UserContext'
import SpaceBackground from 'components/common/SpaceBackground'
import styles from 'components/leaderboard/leaderboard.module.css'
import { FaCrown, FaMedal } from 'react-icons/fa'

const MOCK_PARTICIPANTS = [
	{ rank: 1, name: 'Alex Chen', points: 1450 },
	{ rank: 2, name: 'Sarah Jenkins', points: 1380 },
	{ rank: 3, name: 'Rahul Sharma', points: 1320 },
	{ rank: 4, name: 'Elena Rostova', points: 1260 },
	{ rank: 5, name: 'Marcus Vance', points: 1190 },
	{ rank: 6, name: 'Priya Patel', points: 1140 },
	{ rank: 7, name: 'David Kim', points: 1080 },
	{ rank: 8, name: 'Aisha Al-Mansoor', points: 1040 },
	{ rank: 9, name: 'Lucas Silva', points: 990 },
	{ rank: 10, name: 'Zoe Washington', points: 950 },
	{ rank: 11, name: 'Vikram Malhotra', points: 920 },
	{ rank: 12, name: 'Emma Watson', points: 890 },
	{ rank: 13, name: 'Arjun Nair', points: 870 },
	{ rank: 14, name: 'Chloe Dubois', points: 850 },
	{ rank: 15, name: 'Rohan Gupta', points: 830 },
	{ rank: 16, name: 'Sophia Martinez', points: 810 },
	{ rank: 17, name: 'Karthik Rao', points: 790 },
	{ rank: 18, name: 'Liam O’Connor', points: 780 },
	{ rank: 19, name: 'Ananya Iyer', points: 760 },
	{ rank: 20, name: 'Noah Miller', points: 750 },
	{ rank: 21, name: 'Meera Nambiar', points: 730 },
	{ rank: 22, name: 'Oliver Brown', points: 710 },
	{ rank: 23, name: 'Siddharth Varma', points: 700 },
	{ rank: 24, name: 'You (Ambassador)', points: 680, isCurrentUser: true },
	{ rank: 25, name: 'Isabella Garcia', points: 670 },
	{ rank: 26, name: 'Aditya Menon', points: 650 },
	{ rank: 27, name: 'Mia Tanaka', points: 640 },
	{ rank: 28, name: 'Gautam Pillai', points: 620 },
	{ rank: 29, name: 'Benjamin Scott', points: 610 },
	{ rank: 30, name: 'Diya Krishnan', points: 590 },
	{ rank: 31, name: 'Ethan Hunt', points: 580 },
	{ rank: 32, name: 'Sneha Reddy', points: 560 },
	{ rank: 33, name: 'Alexander Wright', points: 550 },
	{ rank: 34, name: 'Tanvi Joshi', points: 530 },
	{ rank: 35, name: 'Daniel Craig', points: 520 },
	{ rank: 36, name: 'Rhea Kurien', points: 500 },
	{ rank: 37, name: 'William Turner', points: 490 },
	{ rank: 38, name: 'Naveen George', points: 470 },
	{ rank: 39, name: 'Charlotte Evans', points: 460 },
	{ rank: 40, name: 'Harish Kumar', points: 440 },
	{ rank: 41, name: 'Amelia Jones', points: 430 },
	{ rank: 42, name: 'Varun Das', points: 410 },
	{ rank: 43, name: 'Grace Hopper', points: 400 },
	{ rank: 44, name: 'Tarun Mathur', points: 380 },
	{ rank: 45, name: 'Hannah Abbott', points: 360 },
	{ rank: 46, name: 'Abhishek Roy', points: 350 },
	{ rank: 47, name: 'Victoria Thorne', points: 330 },
	{ rank: 48, name: 'Deepak Chopra', points: 310 },
	{ rank: 49, name: 'Natalie Portman', points: 290 },
	{ rank: 50, name: 'Samir Sheikh', points: 270 },
]

const ITEMS_PER_PAGE = 10
const TOTAL_PAGES = Math.ceil(MOCK_PARTICIPANTS.length / ITEMS_PER_PAGE)

export default function Leaderboard() {
	const { user, isLoggedIn } = useUserContext()
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		/*
		// Leaderboard API temporarily disabled

		fetch('https://api.tathva.org/api/leaderboard')
			.then((res) => res.json())
			.then((data) => {
				const sorted = data
					.sort((a, b) => b.count - a.count)
					.slice(0, 50)

				setLeaderboard(sorted)
			})
			.catch((err) => console.error('Error fetching leaderboard:', err))
			.finally(() => setLoading(false))
		*/

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
