import Link from 'next/link'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { HiOutlineExternalLink } from 'react-icons/hi'

import styles from './footer.module.css'

export default function Footer() {
	return (
		<footer className={styles['footer']}>
			<div className='container'>
				<div className={styles['footer-top']}>
					<Link href='/'>
						<img className={styles['footer-logo']} src='/images/tathva26-gold.png' alt="Tathva '26" />
					</Link>
					<div className={styles['footer-links-wrapper']}>
						<ul>
							<li>
								<p></p>
							</li>
							<li>
								{/* <Link href='/'>Home</Link> */}
							</li>
							{/* <li>
								<a href='https://marketing.tathva.org/' target='_blank' rel='noreferrer noopener'>
									Marketing <HiOutlineExternalLink className={styles['external-icon']} />
								</a>
							</li> */}
							{/* <li>
								<a href='https://reg.tathva.org/' target='_blank' rel='noreferrer noopener'>
									Registrations <HiOutlineExternalLink className={styles['external-icon']} />
								</a>
							</li> */}
							{/* <li>
								<Link href='/team'>Team</Link>
							</li> */}
						</ul>
						<ul>
							<li>
								<p></p>
							</li>
							<li>
								<a
									className={styles['social-link']}
									href='https://www.instagram.com/tathva_nitcalicut/'
									target='_blank'
									rel='noreferrer noopener'
								>
									<FaInstagram className={styles['social-icon']} />
									
								</a>
							</li>
							<li>
								<a
									className={styles['social-link']}
									href='https://www.facebook.com/tathva'
									target='_blank'
									rel='noreferrer noopener'
								>
									<FaFacebook className={styles['social-icon']} />
									
								</a>
							</li>
							<li>
								<a
									className={styles['social-link']}
									href='https://twitter.com/tathva'
									target='_blank'
									rel='noreferrer noopener'
								>
									<FaTwitter className={styles['social-icon']} />
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles['footer-divider']}></div>
				<div className={styles['footer-bottom']}>
					<p className={styles['footer-copy']}>&#169; Tathva {new Date().getFullYear()}</p>
					<a
						className={styles['footer-link']}
						href='https://tathva.org/'
						target='_blank'
						rel='noreferrer noopener'
					>
						<span>Tathva</span>
						<HiOutlineExternalLink className={styles['external-icon']} />
					</a>
				</div>
			</div>
		</footer>
	)
}
