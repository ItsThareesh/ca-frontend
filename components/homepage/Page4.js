export default function Page4() {
	return (
		<div className="w-full relative overflow-hidden bg-[#08080a] border-y border-neutral-900/80 shadow-2xl py-16 sm:py-24 antialiased my-8">
			{/* Background cyber grid */}
			<div
				aria-hidden="true"
				className="absolute inset-0 cyber-grid pointer-events-none opacity-50"
			></div>

			{/* Top-Right Dotted Matrix Accent */}
			<div
				aria-hidden="true"
				className="absolute top-6 right-12 w-64 h-36 dot-matrix opacity-30 pointer-events-none"
			></div>

			{/* Ambient Glow Aura Behind Emblem */}
			<div
				aria-hidden="true"
				className="absolute right-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pedestal-glow filter blur-3xl opacity-70 pointer-events-none"
			></div>

			{/* Inner Content Container */}
			<div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-24 items-center">
				{/* BEGIN: LeftContentColumn */}
				<div
					className="lg:col-span-7 flex flex-col justify-center space-y-6 max-w-2xl"
					data-purpose="information-column"
				>
					{/* Category Pill / Overline */}
					<header className="flex items-center space-x-3">
						<span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#e5b842] uppercase font-sans">
							Who Can Apply?
						</span>
						<span className="w-14 h-[1.5px] bg-gradient-to-r from-[#e5b842] to-transparent inline-block rounded-full"></span>
					</header>

					{/* Main Title Heading ABOVE Paragraph (with hover scale effect) */}
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight title-metallic-gradient leading-none transition-transform duration-300 hover:scale-105 origin-left inline-block cursor-pointer">
						Eligibility
					</h1>

					{/* Primary Description */}
					<p className="text-neutral-200 text-lg sm:text-xl font-normal leading-relaxed tracking-wide pt-1">
						Any student currently pursuing education in an established institute who wishes to
						participate in Tathva may apply.
					</p>

					{/* Preference Callout Box (with hover lift & gold shadow effect) */}
					<aside
						className="preference-card rounded-2xl p-5 sm:p-6 mt-2 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-[0_15px_35px_rgba(229,184,66,0.25)] cursor-pointer"
						data-purpose="preference-callout"
					>
						<div className="flex items-center gap-4 sm:gap-5">
							{/* Icon */}
							<div className="flex-shrink-0 text-gold-400 pl-1" data-purpose="icon-wrapper">
								<svg
									aria-hidden="true"
									className="w-9 h-9 sm:w-10 sm:h-10 stroke-current"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.4"
									viewBox="0 0 24 24"
								>
									<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
									<circle cx="9" cy="7" r="4"></circle>
									<path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
									<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
								</svg>
							</div>
							{/* Divider */}
							<div aria-hidden="true" className="w-px h-12 bg-gold-400/25 flex-shrink-0"></div>
							{/* Text */}
							<p className="text-xs sm:text-sm text-neutral-300 font-normal leading-snug tracking-wide">
								Applicants having good interpersonal and communication skills with previous experience
								will be given preference.
							</p>
						</div>
					</aside>
				</div>
				{/* END: LeftContentColumn */}

				{/* BEGIN: RightEmblemColumn (Cuter Smaller Emblem Badge Stage) */}
				<div
					className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[320px] py-2"
					data-purpose="3d-emblem-stage"
				>
					{/* Ambient Golden Glow behind Emblem */}
					<div
						aria-hidden="true"
						className="absolute w-64 h-64 rounded-full bg-amber-500/25 filter blur-3xl pointer-events-none"
					></div>

					{/* Floating Sparkle Stars */}
					<div className="absolute -top-1 right-10 text-amber-300/80 text-lg font-serif pointer-events-none select-none">
						✦
					</div>
					<div className="absolute top-1/4 left-4 text-amber-400/60 text-xs font-serif pointer-events-none select-none">
						✦
					</div>
					<div className="absolute bottom-12 right-6 text-amber-200/90 text-xs font-serif pointer-events-none select-none">
						✦
					</div>

					{/* Cuter Smaller 3D Hexagon Emblem (Outer Metallic Frame + Dark Core + Verified User Badge) */}
					<div className="relative z-20 hexagon-shadow transition-transform duration-500 hover:scale-105 flex flex-col items-center cursor-pointer">
						<svg
							className="w-48 h-54 sm:w-56 sm:h-64"
							fill="none"
							viewBox="0 0 240 270"
							xmlns="http://www.w3.org/2000/svg"
						>
							<defs>
								{/* Outer Golden Rim Gradient */}
								<linearGradient
									gradientUnits="userSpaceOnUse"
									id="goldRimGrad"
									x1="120"
									x2="120"
									y1="6"
									y2="258"
								>
									<stop offset="0%" stopColor="#fff0b8"></stop>
									<stop offset="18%" stopColor="#f5d376"></stop>
									<stop offset="45%" stopColor="#cf9932"></stop>
									<stop offset="70%" stopColor="#e8bd54"></stop>
									<stop offset="90%" stopColor="#7a5511"></stop>
									<stop offset="100%" stopColor="#f8dc8b"></stop>
								</linearGradient>
								{/* Metallic Bevel Depth Gradient */}
								<linearGradient
									gradientUnits="userSpaceOnUse"
									id="bevelGrad"
									x1="20"
									x2="220"
									y1="30"
									y2="240"
								>
									<stop offset="0%" stopColor="#ffd56b"></stop>
									<stop offset="30%" stopColor="#8a5c10"></stop>
									<stop offset="50%" stopColor="#4d3205"></stop>
									<stop offset="75%" stopColor="#e2b047"></stop>
									<stop offset="100%" stopColor="#2d1d02"></stop>
								</linearGradient>
								{/* Inner Hexagon Dark Face */}
								<linearGradient
									gradientUnits="userSpaceOnUse"
									id="innerFaceGrad"
									x1="120"
									x2="120"
									y1="44"
									y2="220"
								>
									<stop offset="0%" stopColor="#292930"></stop>
									<stop offset="40%" stopColor="#19191d"></stop>
									<stop offset="100%" stopColor="#0e0e11"></stop>
								</linearGradient>
								{/* Silver / Chrome Gradient for User Silhouette */}
								<linearGradient id="silverShine" x1="0%" x2="100%" y1="0%" y2="100%">
									<stop offset="0%" stopColor="#ffffff"></stop>
									<stop offset="55%" stopColor="#d4d8df"></stop>
									<stop offset="100%" stopColor="#939ba8"></stop>
								</linearGradient>
								{/* Golden Checkmark Gradient */}
								<linearGradient id="goldenCheck" x1="0%" x2="100%" y1="0%" y2="100%">
									<stop offset="0%" stopColor="#ffe188"></stop>
									<stop offset="50%" stopColor="#dfaa3f"></stop>
									<stop offset="100%" stopColor="#9e6e18"></stop>
								</linearGradient>
								{/* Filter for Inner Shadow */}
								<filter height="120%" id="innerDepth" width="120%" x="-10%" y="-10%">
									<feDropShadow
										dx="0"
										dy="5"
										floodColor="#000000"
										floodOpacity="0.9"
										stdDeviation="4"
									></feDropShadow>
								</filter>
							</defs>
							{/* Hexagon Bevel Outer Extrusion */}
							<polygon
								fill="url(#goldRimGrad)"
								points="120,8 218,65 218,199 120,256 22,199 22,65"
								stroke="rgba(255,255,255,0.4)"
								strokeWidth="1.5"
							></polygon>
							<polygon
								fill="url(#bevelGrad)"
								points="120,18 206,68 206,188 120,238 34,188 34,68"
							></polygon>
							{/* Hexagon Core Slate Surface */}
							<polygon
								fill="url(#innerFaceGrad)"
								filter="url(#innerDepth)"
								points="120,30 194,73 194,177 120,220 46,177 46,73"
								stroke="#674b12"
								strokeWidth="1.8"
							></polygon>
							{/* Inner Subtle Hexagon Hairline Accent */}
							<polygon
								fill="none"
								points="120,38 186,76 186,170 120,208 54,170 54,76"
								stroke="rgba(229,184,66,0.18)"
								strokeWidth="1.2"
							></polygon>
							{/* Centered User Icon with Metallic Finish */}
							{/* Head */}
							<circle cx="120" cy="104" fill="url(#silverShine)" r="19"></circle>
							{/* Body Profile */}
							<path
								d="M96 156 C96 138 106 130 120 130 C125 130 130 131.5 134.5 134 C132.8 138 132 142.5 132.5 147.5 L129 156 Z"
								fill="url(#silverShine)"
							></path>
							{/* Checkmark Emblem Accent */}
							<path
								d="M126 148 L137 159 L158 131"
								fill="none"
								filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
								stroke="url(#goldenCheck)"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="6.5"
							></path>
						</svg>

						{/* Overlapping Badge Title */}
						<h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] -mt-9 z-30 font-sans">
							Eligibility
						</h2>
					</div>

					{/* 3DPodiumDais Base (Cuter Scaled Stand) */}
					<div
						className="relative w-56 sm:w-64 h-14 -mt-9 z-10 flex flex-col items-center"
						data-purpose="pedestal-stand"
					>
						{/* Top Tier Ring / Bevel */}
						<div className="w-40 sm:w-48 h-6 rounded-[50%] bg-gradient-to-r from-[#946b19] via-[#fae08c] via-50% to-[#664609] p-[1.5px] shadow-lg">
							<div className="w-full h-full rounded-[50%] bg-gradient-to-b from-[#141416] to-[#0a0a0c] border border-amber-400/40"></div>
						</div>
						{/* Mid Tier Body */}
						<div className="w-48 sm:w-54 h-6 -mt-3.5 rounded-[50%] bg-gradient-to-r from-[#b38525] via-[#fff1b0] via-45% to-[#704d0c] shadow-[0_8px_20px_rgba(0,0,0,0.9)] p-[1.8px]">
							<div className="w-full h-full rounded-[50%] bg-gradient-to-r from-[#382607] via-[#211704] to-[#120c02]"></div>
						</div>
						{/* Bottom Tier Rim Platform */}
						<div className="w-56 sm:w-64 h-8 -mt-3.5 rounded-[50%] bg-gradient-to-r from-[#7a5511] via-[#e5b842] via-50% to-[#543806] p-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.95)]">
							<div className="w-full h-full rounded-[50%] bg-gradient-to-b from-[#1c1407] to-[#000000]"></div>
						</div>
						{/* Base Radial Light Glow Reflection */}
						<div
							aria-hidden="true"
							className="absolute -bottom-3 w-52 h-6 bg-amber-400/25 rounded-full blur-md pointer-events-none"
						></div>
					</div>
				</div>

				{/* END: RightEmblemColumn */}
			</div>

			{/* Flowing Golden Waves (Full Width) */}
			<div
				aria-hidden="true"
				className="absolute -bottom-2 left-0 right-0 h-28 sm:h-36 pointer-events-none overflow-hidden z-20"
			>
				<svg
					className="w-full h-full"
					fill="none"
					preserveAspectRatio="none"
					viewBox="0 0 1200 160"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient id="waveGradPrimary" x1="0%" x2="100%" y1="0%" y2="0%">
							<stop offset="0%" stopColor="#e5a93b" stopOpacity="0.85"></stop>
							<stop offset="25%" stopColor="#fff3c2" stopOpacity="0.95"></stop>
							<stop offset="42%" stopColor="#e5b842" stopOpacity="0.6"></stop>
							<stop offset="68%" stopColor="#fff0aa" stopOpacity="0.8"></stop>
							<stop offset="100%" stopColor="#8a5c10" stopOpacity="0.1"></stop>
						</linearGradient>
						<linearGradient id="waveGlowFill" x1="0%" x2="100%" y1="0%" y2="100%">
							<stop offset="0%" stopColor="#d49a2a" stopOpacity="0.35"></stop>
							<stop offset="35%" stopColor="#b87f17" stopOpacity="0.12"></stop>
							<stop offset="70%" stopColor="#4d3205" stopOpacity="0.04"></stop>
							<stop offset="100%" stopColor="#000000" stopOpacity="0"></stop>
						</linearGradient>
						{/* Wave Glow Filter */}
						<filter height="180%" id="ribbonGlow" width="120%" x="-10%" y="-30%">
							<feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
							<feMerge>
								<feMergeNode in="blur"></feMergeNode>
								<feMergeNode in="SourceGraphic"></feMergeNode>
							</feMerge>
						</filter>
					</defs>
					{/* Wave Ambient Fill */}
					<path
						d="M0 160 C180 120 280 60 480 110 C680 160 840 120 1200 150 L1200 160 L0 160 Z"
						fill="url(#waveGlowFill)"
					></path>
					{/* Crisp Golden Horizon Spine Lines */}
					<path
						d="M-50 148 C160 118 290 62 480 102 C670 142 850 128 1250 148"
						filter="url(#ribbonGlow)"
						stroke="url(#waveGradPrimary)"
						strokeWidth="2.5"
					></path>
					<path
						d="M-50 156 C180 126 310 76 510 112 C710 148 880 134 1250 156"
						stroke="rgba(245, 211, 118, 0.45)"
						strokeWidth="1.2"
					></path>
					<path
						d="M-50 142 C140 112 260 55 450 96 C640 136 820 122 1250 142"
						stroke="rgba(255, 245, 195, 0.3)"
						strokeWidth="0.8"
					></path>
				</svg>
			</div>
		</div>
	)
}
