import { useEffect, useRef } from 'react'

/* ── Realistic Trophy & Medal SVG Icons with metallic gradients ── */

const GoldTrophy = ({ size = 52, className = '' }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 80 80'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<defs>
			<linearGradient id='gtBody' x1='40' y1='6' x2='40' y2='46' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#fff6d5' />
				<stop offset='18%' stopColor='#fde68a' />
				<stop offset='45%' stopColor='#f7c948' />
				<stop offset='70%' stopColor='#d4a017' />
				<stop offset='100%' stopColor='#8a6914' />
			</linearGradient>
			<linearGradient id='gtShine' x1='28' y1='8' x2='52' y2='40' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#fffbe6' stopOpacity='0.7' />
				<stop offset='100%' stopColor='#f7c948' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='gtStem' x1='40' y1='46' x2='40' y2='60' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#d4a017' />
				<stop offset='100%' stopColor='#8a6914' />
			</linearGradient>
			<linearGradient id='gtBase' x1='40' y1='58' x2='40' y2='74' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#fde68a' />
				<stop offset='40%' stopColor='#d4a017' />
				<stop offset='100%' stopColor='#705010' />
			</linearGradient>
			<radialGradient id='gtGlow' cx='40' cy='26' r='30' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#f7c948' stopOpacity='0.3' />
				<stop offset='100%' stopColor='#f7c948' stopOpacity='0' />
			</radialGradient>
		</defs>
		{/* Ambient glow */}
		<circle cx='40' cy='30' r='30' fill='url(#gtGlow)' />
		{/* Left handle */}
		<path
			d='M22 14c-6 0-10 4-10 10s4 10 10 10'
			stroke='url(#gtBody)'
			strokeWidth='3.5'
			fill='none'
			strokeLinecap='round'
		/>
		{/* Right handle */}
		<path
			d='M58 14c6 0 10 4 10 10s-4 10-10 10'
			stroke='url(#gtBody)'
			strokeWidth='3.5'
			fill='none'
			strokeLinecap='round'
		/>
		{/* Cup body */}
		<path d='M22 8h36v24c0 8.837-8.059 16-18 16s-18-7.163-18-16V8z' fill='url(#gtBody)' />
		{/* Rim highlight */}
		<rect x='22' y='8' width='36' height='3.5' rx='1.5' fill='#fff6d5' opacity='0.6' />
		{/* Specular shine */}
		<path d='M28 10h6v20c0 4-1 6-3 6s-3-2-3-6V10z' fill='url(#gtShine)' opacity='0.5' />
		{/* Star emblem */}
		<path
			d='M40 20l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L40 34.5l-5.8 3.4 1.1-6.47-4.7-4.58 6.5-.95L40 20z'
			fill='#8a6914'
			opacity='0.35'
		/>
		<path
			d='M40 21.5l2.35 4.77 5.27.77-3.81 3.71.9 5.25L40 33.3l-4.71 2.7.9-5.25-3.81-3.71 5.27-.77L40 21.5z'
			fill='#fff6d5'
			opacity='0.5'
		/>
		{/* Stem */}
		<rect x='36' y='46' width='8' height='12' rx='2' fill='url(#gtStem)' />
		{/* Base plate top */}
		<ellipse cx='40' cy='58' rx='14' ry='3' fill='#d4a017' />
		{/* Base */}
		<path d='M26 58c0 0 0 8 0 10c0 2 6 4 14 4s14-2 14-4c0-2 0-10 0-10H26z' fill='url(#gtBase)' />
		{/* Base bottom rim */}
		<ellipse cx='40' cy='68' rx='14' ry='3.5' fill='#705010' />
		<ellipse cx='40' cy='68' rx='14' ry='3.5' fill='#fde68a' opacity='0.2' />
		{/* Base shine */}
		<ellipse cx='40' cy='58' rx='12' ry='2' fill='#fff6d5' opacity='0.25' />
	</svg>
)

const SilverTrophy = ({ size = 40, className = '' }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 80 80'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<defs>
			<linearGradient id='stBody' x1='40' y1='6' x2='40' y2='46' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#f5f5f5' />
				<stop offset='20%' stopColor='#e0e0e0' />
				<stop offset='50%' stopColor='#c0c0c0' />
				<stop offset='75%' stopColor='#9e9e9e' />
				<stop offset='100%' stopColor='#6e6e6e' />
			</linearGradient>
			<linearGradient id='stShine' x1='28' y1='8' x2='52' y2='40' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#ffffff' stopOpacity='0.75' />
				<stop offset='100%' stopColor='#c0c0c0' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='stStem' x1='40' y1='46' x2='40' y2='60' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#b0b0b0' />
				<stop offset='100%' stopColor='#707070' />
			</linearGradient>
			<linearGradient id='stBase' x1='40' y1='58' x2='40' y2='74' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#e0e0e0' />
				<stop offset='40%' stopColor='#a0a0a0' />
				<stop offset='100%' stopColor='#585858' />
			</linearGradient>
			<radialGradient id='stGlow' cx='40' cy='26' r='30' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#c0c0c0' stopOpacity='0.25' />
				<stop offset='100%' stopColor='#c0c0c0' stopOpacity='0' />
			</radialGradient>
		</defs>
		<circle cx='40' cy='30' r='30' fill='url(#stGlow)' />
		<path
			d='M22 14c-6 0-10 4-10 10s4 10 10 10'
			stroke='url(#stBody)'
			strokeWidth='3.5'
			fill='none'
			strokeLinecap='round'
		/>
		<path
			d='M58 14c6 0 10 4 10 10s-4 10-10 10'
			stroke='url(#stBody)'
			strokeWidth='3.5'
			fill='none'
			strokeLinecap='round'
		/>
		<path d='M22 8h36v24c0 8.837-8.059 16-18 16s-18-7.163-18-16V8z' fill='url(#stBody)' />
		<rect x='22' y='8' width='36' height='3.5' rx='1.5' fill='#f5f5f5' opacity='0.55' />
		<path d='M28 10h6v20c0 4-1 6-3 6s-3-2-3-6V10z' fill='url(#stShine)' opacity='0.45' />
		<path
			d='M40 20l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L40 34.5l-5.8 3.4 1.1-6.47-4.7-4.58 6.5-.95L40 20z'
			fill='#585858'
			opacity='0.3'
		/>
		<path
			d='M40 21.5l2.35 4.77 5.27.77-3.81 3.71.9 5.25L40 33.3l-4.71 2.7.9-5.25-3.81-3.71 5.27-.77L40 21.5z'
			fill='#f5f5f5'
			opacity='0.45'
		/>
		<rect x='36' y='46' width='8' height='12' rx='2' fill='url(#stStem)' />
		<ellipse cx='40' cy='58' rx='14' ry='3' fill='#a0a0a0' />
		<path d='M26 58c0 0 0 8 0 10c0 2 6 4 14 4s14-2 14-4c0-2 0-10 0-10H26z' fill='url(#stBase)' />
		<ellipse cx='40' cy='68' rx='14' ry='3.5' fill='#585858' />
		<ellipse cx='40' cy='68' rx='14' ry='3.5' fill='#e0e0e0' opacity='0.15' />
		<ellipse cx='40' cy='58' rx='12' ry='2' fill='#f5f5f5' opacity='0.2' />
	</svg>
)

const BronzeTrophy = ({ size = 40, className = '' }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 80 80'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<defs>
			<linearGradient id='btBody' x1='40' y1='6' x2='40' y2='46' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#f0cda0' />
				<stop offset='20%' stopColor='#e8a860' />
				<stop offset='50%' stopColor='#cd7f32' />
				<stop offset='75%' stopColor='#a06020' />
				<stop offset='100%' stopColor='#6b3e10' />
			</linearGradient>
			<linearGradient id='btShine' x1='28' y1='8' x2='52' y2='40' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#fce4c0' stopOpacity='0.7' />
				<stop offset='100%' stopColor='#cd7f32' stopOpacity='0' />
			</linearGradient>
			<linearGradient id='btStem' x1='40' y1='46' x2='40' y2='60' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#a06020' />
				<stop offset='100%' stopColor='#6b3e10' />
			</linearGradient>
			<linearGradient id='btBase' x1='40' y1='58' x2='40' y2='74' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#e8a860' />
				<stop offset='40%' stopColor='#a06020' />
				<stop offset='100%' stopColor='#4a2a08' />
			</linearGradient>
			<radialGradient id='btGlow' cx='40' cy='26' r='30' gradientUnits='userSpaceOnUse'>
				<stop offset='0%' stopColor='#cd7f32' stopOpacity='0.25' />
				<stop offset='100%' stopColor='#cd7f32' stopOpacity='0' />
			</radialGradient>
		</defs>
		<circle cx='40' cy='30' r='30' fill='url(#btGlow)' />
		<path
			d='M22 14c-6 0-10 4-10 10s4 10 10 10'
			stroke='url(#btBody)'
			strokeWidth='3.5'
			fill='none'
			strokeLinecap='round'
		/>
		<path
			d='M58 14c6 0 10 4 10 10s-4 10-10 10'
			stroke='url(#btBody)'
			strokeWidth='3.5'
			fill='none'
			strokeLinecap='round'
		/>
		<path d='M22 8h36v24c0 8.837-8.059 16-18 16s-18-7.163-18-16V8z' fill='url(#btBody)' />
		<rect x='22' y='8' width='36' height='3.5' rx='1.5' fill='#f0cda0' opacity='0.5' />
		<path d='M28 10h6v20c0 4-1 6-3 6s-3-2-3-6V10z' fill='url(#btShine)' opacity='0.4' />
		<path
			d='M40 20l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L40 34.5l-5.8 3.4 1.1-6.47-4.7-4.58 6.5-.95L40 20z'
			fill='#4a2a08'
			opacity='0.3'
		/>
		<path
			d='M40 21.5l2.35 4.77 5.27.77-3.81 3.71.9 5.25L40 33.3l-4.71 2.7.9-5.25-3.81-3.71 5.27-.77L40 21.5z'
			fill='#f0cda0'
			opacity='0.45'
		/>
		<rect x='36' y='46' width='8' height='12' rx='2' fill='url(#btStem)' />
		<ellipse cx='40' cy='58' rx='14' ry='3' fill='#a06020' />
		<path d='M26 58c0 0 0 8 0 10c0 2 6 4 14 4s14-2 14-4c0-2 0-10 0-10H26z' fill='url(#btBase)' />
		<ellipse cx='40' cy='68' rx='14' ry='3.5' fill='#4a2a08' />
		<ellipse cx='40' cy='68' rx='14' ry='3.5' fill='#e8a860' opacity='0.15' />
		<ellipse cx='40' cy='58' rx='12' ry='2' fill='#f0cda0' opacity='0.2' />
	</svg>
)

const CertificateIcon = ({ size = 28, className = '' }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 28 28'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<rect
			x='3'
			y='4'
			width='22'
			height='16'
			rx='2'
			stroke='currentColor'
			strokeWidth='1.8'
			fill='none'
		/>
		<path d='M8 10h12M8 13h8' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
		<circle cx='20' cy='20' r='4.5' stroke='currentColor' strokeWidth='1.8' fill='none' />
		<path
			d='M18 24l-1 3.5 3-1.5 3 1.5-1-3.5'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
			fill='none'
		/>
	</svg>
)

const WorkshopIcon = ({ size = 24, className = '' }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<rect
			x='2'
			y='3'
			width='20'
			height='14'
			rx='2'
			stroke='currentColor'
			strokeWidth='1.8'
			fill='none'
		/>
		<path d='M8 21h8M12 17v4' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
		<path
			d='M10 8l5 3-5 3V8z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinejoin='round'
			fill='none'
		/>
	</svg>
)

const MicIcon = ({ size = 24, className = '' }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<rect
			x='9'
			y='2'
			width='6'
			height='11'
			rx='3'
			stroke='currentColor'
			strokeWidth='1.8'
			fill='none'
		/>
		<path
			d='M5 10a7 7 0 0014 0'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			fill='none'
		/>
		<path d='M12 17v4M8 21h8' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
	</svg>
)

const GiftIcon = ({ size = 24, className = '' }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<rect
			x='3'
			y='8'
			width='18'
			height='4'
			rx='1'
			stroke='currentColor'
			strokeWidth='1.8'
			fill='none'
		/>
		<rect
			x='5'
			y='12'
			width='14'
			height='8'
			rx='1'
			stroke='currentColor'
			strokeWidth='1.8'
			fill='none'
		/>
		<path d='M12 8v12' stroke='currentColor' strokeWidth='1.8' />
		<path
			d='M12 8c-1-3-4-4-5-3s0 3 5 3'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			fill='none'
		/>
		<path
			d='M12 8c1-3 4-4 5-3s0 3-5 3'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			fill='none'
		/>
	</svg>
)

export default function Benefits() {
	const sectionRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('benefits-v2--visible')
					}
				})
			},
			{ threshold: 0.12 }
		)
		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section className='benefits-v2' ref={sectionRef} id='benefits'>
			{/* Deep gold radial glow (upper-right) */}
			<div className='benefits-v2__glow' aria-hidden='true' />

			{/* ── Header ── */}
			<div className='benefits-v2__header'>
				<div className='benefits-v2__header-left'>
					<h2 className='benefits-v2__title'>
						Benefits
						<span className='benefits-v2__title-dash'>&mdash;</span>
						<span className='benefits-v2__title-sub'>Prizes worth ₹25,000</span>
					</h2>
				</div>
				<div className='benefits-v2__preference-card'>
					<div className='benefits-v2__preference-icon'>
						<svg
							width='28'
							height='28'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.4'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
							<circle cx='9' cy='7' r='4' />
							<path d='M22 21v-2a4 4 0 0 0-3-3.87' />
							<path d='M16 3.13a4 4 0 0 1 0 7.75' />
						</svg>
					</div>
					<div className='benefits-v2__preference-divider' />
					<p className='benefits-v2__preference-text'>
						A Minimum of 299 points needed to be eligible for rewards.
					</p>
				</div>
			</div>

			{/* ── Two-Column Layout: Prizes + Referral Rewards ── */}
			<div className='benefits-v2__columns'>
				{/* ── LEFT: Prize Content ── */}
				<div className='benefits-v2__col-left'>
					{/* Podium Row */}
					<div className='benefits-v2__podium'>
						{/* 2nd Place */}
						<div className='benefits-v2__card benefits-v2__card--silver benefits-v2__card--side'>
							<div className='benefits-v2__card-rank'>2nd</div>
							<SilverTrophy size={64} className='benefits-v2__card-icon' />
							<div className='benefits-v2__card-amount'>₹5,000</div>
							<div className='benefits-v2__card-label'>Runner Up</div>
						</div>

						{/* 1st Place (center, largest) */}
						<div className='benefits-v2__card benefits-v2__card--gold benefits-v2__card--center mb-5'>
							<div className='benefits-v2__card-rank'>1st</div>
							<GoldTrophy size={80} className='benefits-v2__card-icon' />
							<div className='benefits-v2__card-amount'>₹10,000</div>
							<div className='benefits-v2__card-label'>Grand Champion</div>
						</div>

						{/* 3rd Place */}
						<div className='benefits-v2__card benefits-v2__card--bronze benefits-v2__card--side'>
							<div className='benefits-v2__card-rank'>3rd</div>
							<BronzeTrophy size={64} className='benefits-v2__card-icon' />
							<div className='benefits-v2__card-amount'>₹3,000</div>
							<div className='benefits-v2__card-label'>Second Runner Up</div>
						</div>
					</div>

					{/* Lower Tier Prizes */}
					<div className='benefits-v2__lower'>
						<div className='benefits-v2__lower-card'>
							<div className='benefits-v2__lower-icon-wrap'>
								<GiftIcon size={22} className='benefits-v2__lower-icon' />
							</div>
							<div>
								<div className='benefits-v2__lower-range'>4th &ndash; 10th</div>
								<div className='benefits-v2__lower-prize'>₹1,000 + Goodies</div>
							</div>
						</div>
						<div className='benefits-v2__lower-card'>
							<div className='benefits-v2__lower-icon-wrap'>
								<GiftIcon size={22} className='benefits-v2__lower-icon' />
							</div>
							<div>
								<div className='benefits-v2__lower-range'>11th &ndash; 15th</div>
								<div className='benefits-v2__lower-prize'>Goodies &amp; Gifts</div>
							</div>
						</div>
					</div>

					{/* How Points Are Earned Panel */}
					<div className='benefits-v2__info-panel'>
						<h3 className='benefits-v2__info-title'>How points are earned</h3>
						<div className='benefits-v2__info-items'>
							<div className='benefits-v2__info-item'>
								<WorkshopIcon size={22} className='benefits-v2__info-icon' />
								<span className='benefits-v2__info-text'>
									<strong>Workshops</strong> = 10 points
								</span>
							</div>
							<div className='benefits-v2__info-item'>
								<MicIcon size={22} className='benefits-v2__info-icon' />
								<span className='benefits-v2__info-text'>
									<strong>Lectures</strong> = 3 points
								</span>
							</div>
							<div className='benefits-v2__info-divider' />
							<div className='benefits-v2__info-item benefits-v2__info-item--cert'>
								<CertificateIcon size={22} className='benefits-v2__info-icon' />
								<span className='benefits-v2__info-text'>
									Top 20 Ambassadors awarded <strong>certificates</strong>
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* ── RIGHT: Referral Reward Structure ── */}
				<div className='benefits-v2__col-right'>
					<div className='benefits-v2__referral-panel'>
						<h3 className='benefits-v2__referral-title'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.8'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='benefits-v2__referral-title-icon'
							>
								<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
								<circle cx='9' cy='7' r='4' />
								<line x1='19' y1='8' x2='19' y2='14' />
								<line x1='22' y1='11' x2='16' y2='11' />
							</svg>
							Referral Rewards
						</h3>

						<div className='benefits-v2__referral-list'>
							{/* Standard tier */}
							<div className='benefits-v2__ref-row benefits-v2__ref-row--dim'>
								<span className='benefits-v2__ref-range'>1 – 4 referrals</span>
								<span className='benefits-v2__ref-reward'>No reward</span>
							</div>

							{/* Milestone */}
							<div className='benefits-v2__ref-row benefits-v2__ref-row--milestone'>
								<span className='benefits-v2__ref-range'>
									<span className='benefits-v2__ref-milestone-dot' />5 referrals
								</span>
								<span className='benefits-v2__ref-reward'>
									₹100 <span className='benefits-v2__ref-tag'>Milestone</span>
								</span>
							</div>

							{/* Standard tier */}
							<div className='benefits-v2__ref-row'>
								<span className='benefits-v2__ref-range'>6 – 9 referrals</span>
								<span className='benefits-v2__ref-reward'>
									₹50 <span className='benefits-v2__ref-per'>/ referral</span>
								</span>
							</div>

							{/* Milestone */}
							<div className='benefits-v2__ref-row benefits-v2__ref-row--milestone'>
								<span className='benefits-v2__ref-range'>
									<span className='benefits-v2__ref-milestone-dot' />
									10 referrals
								</span>
								<span className='benefits-v2__ref-reward'>
									₹200 <span className='benefits-v2__ref-tag'>Milestone</span>
								</span>
							</div>

							{/* Standard tier */}
							<div className='benefits-v2__ref-row'>
								<span className='benefits-v2__ref-range'>11 – 14 referrals</span>
								<span className='benefits-v2__ref-reward'>
									₹50 <span className='benefits-v2__ref-per'>/ referral</span>
								</span>
							</div>

							{/* Milestone */}
							<div className='benefits-v2__ref-row benefits-v2__ref-row--milestone'>
								<span className='benefits-v2__ref-range'>
									<span className='benefits-v2__ref-milestone-dot' />
									15 referrals
								</span>
								<span className='benefits-v2__ref-reward'>
									₹300 <span className='benefits-v2__ref-tag'>Milestone</span>
								</span>
							</div>

							{/* Standard tier */}
							<div className='benefits-v2__ref-row'>
								<span className='benefits-v2__ref-range'>16 – 19 referrals</span>
								<span className='benefits-v2__ref-reward'>
									₹50 <span className='benefits-v2__ref-per'>/ referral</span>
								</span>
							</div>

							{/* Milestone */}
							<div className='benefits-v2__ref-row benefits-v2__ref-row--milestone'>
								<span className='benefits-v2__ref-range'>
									<span className='benefits-v2__ref-milestone-dot' />
									20 referrals
								</span>
								<span className='benefits-v2__ref-reward'>
									₹500 <span className='benefits-v2__ref-tag'>Milestone</span>
								</span>
							</div>

							{/* Standard tier */}
							<div className='benefits-v2__ref-row'>
								<span className='benefits-v2__ref-range'>21 – 49 referrals</span>
								<span className='benefits-v2__ref-reward'>
									₹50 <span className='benefits-v2__ref-per'>/ referral</span>
								</span>
							</div>

							{/* Major Milestone */}
							<div className='benefits-v2__ref-row benefits-v2__ref-row--milestone benefits-v2__ref-row--major'>
								<span className='benefits-v2__ref-range'>
									<span className='benefits-v2__ref-milestone-dot' />
									50 referrals
								</span>
								<span className='benefits-v2__ref-reward'>
									₹1,000{' '}
									<span className='benefits-v2__ref-tag benefits-v2__ref-tag--major'>Major</span>
								</span>
							</div>

							{/* Standard tier */}
							<div className='benefits-v2__ref-row'>
								<span className='benefits-v2__ref-range'>51+ referrals</span>
								<span className='benefits-v2__ref-reward'>
									₹50 <span className='benefits-v2__ref-per'>/ referral</span>
								</span>
							</div>
						</div>

						{/* Strategy callout */}
						<div className='benefits-v2__referral-strategy'>
							<svg
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='benefits-v2__strategy-icon'
							>
								<circle cx='12' cy='12' r='10' />
								<line x1='12' y1='16' x2='12' y2='12' />
								<line x1='12' y1='8' x2='12.01' y2='8' />
							</svg>
							<p>
								Milestone bonuses at <strong>5, 10, 15, 20 &amp; 50</strong> referrals create extra
								excitement, plus a steady <strong>₹50 per referral</strong> between milestones.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
