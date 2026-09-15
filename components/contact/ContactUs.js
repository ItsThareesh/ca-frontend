import { MdEmail } from 'react-icons/md'
import styles from './contact-us.module.css'

const contacts = [
	{
		name: 'Abu Muhammed',
		phone: '+91 8848629668',
	},
	{
		name: 'Adhil Biju',
		phone: '+91 9037959025',
	},
	{
		name: 'Adila Isha',
		phone: '+91 9947492065',
	},
	{
		name: 'Gowribala A Nair',
		phone: '+91 9037765046',
	},
]

export default function ContactUs() {
	return (
		<section className='w-full py-1 sm:py-2 px-4 sm:px-6 relative z-10'>
			<div className='max-w-4xl mx-auto'>
				<div className={styles['contact-card']}>
					<div className={styles['card-glow']} />

					<div className={styles['card-header']}>
						<h2 className={styles['card-title']}>Contact Us</h2>

						<div className={styles['general-inquiry']}>
							<span className={styles['inquiry-label']}>General Inquiries:</span>

							<a
								href='mailto:ca@tathva.org'
								className={styles['inquiry-email']}
								title='Email general inquiries'
							>
								<MdEmail className='text-amber-400 text-lg' />
								<span>ca@tathva.org</span>
							</a>
						</div>
					</div>

					<div className={styles['accordion-list']}>
						{contacts.map((contact) => {
							const sanitizedPhone = contact.phone.replace(/\s+/g, '')

							return (
								<div key={contact.name} className={styles['accordion-item']}>
									<div className={styles['accordion-trigger']}>
										<div className={styles['trigger-left']}>
											<h3 className={styles['contact-name']}>{contact.name}</h3>
										</div>

										<a
											href={`tel:${sanitizedPhone}`}
											className={styles['inquiry-email']}
											title={`Call ${contact.name}`}
										>
											<span>{contact.phone}</span>
										</a>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
