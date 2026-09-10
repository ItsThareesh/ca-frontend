import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { HiOutlineExternalLink } from 'react-icons/hi'
import Image from 'next/image'

import styles from './footer.module.css'

export default function Footer() {
	return (
		<footer className={styles['footer']}>
			<div className='container'>
				<div className={styles['footer-top']}>
					<Link href='/'>
						<img className={styles['footer-logo']} src='/images/logoNew.png' alt='Tathva 2022' />
					</Link>
					<div className={styles['footer-links-wrapper']}>
						<ul>
							<li>
								<p>Site</p>
							</li>
							<li>
								<Link href='/'>Home</Link>
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
								<p>Social</p>
							</li>
							<li>
								<a
									className={styles['social-link']}
									href='https://www.instagram.com/tathva_nitcalicut/'
									target='_blank'
									rel='noreferrer noopener'
								>
									<FaInstagram className={styles['social-icon']} />
									Instagram
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
									Facebook
								</a>
							</li>
							<li>
								<a
									className={styles['social-link']}
									href='https://twitter.com/tathva'
									target='_blank'
									rel='noreferrer noopener'
								>
									<FaTwitter className={styles['social-icon']} />X
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles['footer-bottom']}>
					<p className={styles['footer-copy']}>&#169; Tathva {new Date().getFullYear()}</p>
					<a
						className={styles['footer-link']}
						href='https://tathva.org/'
						target='_blank'
						rel='noreferrer noopener'
					>
						Tathva <HiOutlineExternalLink className={styles['external-icon']} />
					</a>
				</div>
			</div>
		</footer>
	)
}
