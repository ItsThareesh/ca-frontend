import { useState } from 'react'
import { IoMdCall } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { FiChevronDown } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import styles from './contact-us.module.css'

const contacts = [
	{
		name: 'Subramanya Shenoy B',
		phone: '+91 9037176188',
		email: 'subramanya@tathva.org',
		role: 'Convener',
	},
	{
		name: 'Sabin Binu',
		phone: '+91 9446978544',
		email: 'sabin@tathva.org',
		role: 'Coordinator',
	},
	{
		name: 'Anandhakrishnan P S',
		phone: '+91 9995933017',
		email: 'anandhakrishnan@tathva.org',
		role: 'Coordinator',
	},
	{
		name: 'Mohamed Adhil',
		phone: '+91 6282896005',
		email: 'adhil@tathva.org',
		role: 'Coordinator',
	},
	{
		name: 'Athulya C',
		phone: '+91 8606774798',
		email: 'athulya@tathva.org',
		role: 'Coordinator',
	},
]

export default function ContactUs() {
	// Accordion open state: null or index of the open item
	const [openIndex, setOpenIndex] = useState(0)

	const toggleAccordion = (index) => {
		setOpenIndex((prev) => (prev === index ? null : index))
	}

	return (
		<section className='w-full py-1 sm:py-2 px-4 sm:px-6 relative z-10'>
			<div className='max-w-4xl mx-auto'>
				{/* Main Card Container */}
				<div className={styles['contact-card']}>
					{/* Top ambient glow decoration */}
					<div className={styles['card-glow']} />

					{/* Card Header */}
					<div className={styles['card-header']}>

						<h2 className={styles['card-title']}>Contact Us</h2>


						{/* General inquiries bar */}
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

					{/* Accordion List */}
					<div className={styles['accordion-list']}>
						{contacts.map((contact, index) => {
							const isOpen = openIndex === index
							const sanitizedPhone = contact.phone.replace(/\s+/g, '')

							return (
								<div
									key={contact.name}
									className={`${styles['accordion-item']} ${isOpen ? styles['item-open'] : ''}`}
								>
									{/* Accordion Header / Trigger */}
									<button
										type='button'
										onClick={() => toggleAccordion(index)}
										className={styles['accordion-trigger']}
										aria-expanded={isOpen}
										aria-controls={`contact-panel-${index}`}
										id={`contact-header-${index}`}
									>
										<div className={styles['trigger-left']}>
											<div className={styles['avatar-icon']}>
												<span>{contact.name.charAt(0)}</span>
											</div>
											<div className={styles['contact-identity']}>
												<h3 className={styles['contact-name']}>{contact.name}</h3>
											</div>
										</div>

										<div className={styles['trigger-right']}>
											<span className={styles['status-hint']}>
												{isOpen ? 'Close' : 'Details'}
											</span>
											<div className={`${styles['chevron-wrapper']} ${isOpen ? styles['rotate'] : ''}`}>
												<FiChevronDown className={styles['chevron-icon']} />
											</div>
										</div>
									</button>

									{/* Smooth Expandable Content */}
									<div
										id={`contact-panel-${index}`}
										role='region'
										aria-labelledby={`contact-header-${index}`}
										className={`${styles['accordion-panel']} ${isOpen ? styles['panel-open'] : ''}`}
									>
										<div className={styles['panel-inner']}>
											<div className={styles['contact-actions-grid']}>
												{/* Phone Link */}
												<a
													href={`tel:${sanitizedPhone}`}
													className={styles['action-card']}
													title={`Call ${contact.name}`}
												>
													<div className={styles['action-icon-wrapper']}>
														<IoMdCall className={styles['action-icon']} />
													</div>
													<div className={styles['action-info']}>
														<span className={styles['action-label']}>Phone Number</span>
														<span className={styles['action-value']}>{contact.phone}</span>
													</div>
													<span className={styles['action-tag']}>Call Now</span>
												</a>

												{/* Email Link */}
												<a
													href={`mailto:${contact.email}`}
													className={styles['action-card']}
													title={`Email ${contact.name}`}
												>
													<div className={styles['action-icon-wrapper']}>
														<MdEmail className={styles['action-icon']} />
													</div>
													<div className={styles['action-info']}>
														<span className={styles['action-label']}>Email Address</span>
														<span className={styles['action-value']}>{contact.email}</span>
													</div>
													<span className={styles['action-tag']}>Send Email</span>
												</a>
											</div>
										</div>
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
