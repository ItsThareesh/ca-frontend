import Sponsors from './Sponsors'
import HeroText from './HeroText'

export default function Hero() {
	return (
		<div className='hero'>
			<div className='spacerv-lg'></div>

			<div className='hero-content'>
				<HeroText/>
			</div>
			<div className='spacerv-lg'></div>

			{/* Vacancy Banner floating at bottom center */}
			<div className='vacancy-banner-container'>
				<div className='vacancy-banner'>
					<span className='vacancy-number'>6 7</span>
					<span className='vacancy-label'>SEATS LEFT</span>
				</div>
			</div>

			<img className='hero-arrow' alt='' src='/images/arrow-down.svg' />
		</div>
	)
}
