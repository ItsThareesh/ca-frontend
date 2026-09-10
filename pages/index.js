import Hero from 'components/homepage/Hero'
import Page2 from 'components/homepage/Page2'
import Benefits from 'components/homepage/Benefits'
import Page4 from 'components/homepage/Page4'
import RUReady from 'components/common/RUReady'

export default function Home() {
	return (
		<>
			<Hero />
			<Page2 />
			<Benefits />
			<Page4 />
			<RUReady />
		</>
	)
}
