import { useState } from 'react'
import { MdEmail, MdContentCopy, MdCheck } from 'react-icons/md'
import styles from './contact-us.module.css'

const contacts = [
  { name: 'Abu Muhammed', phone: '+91 8848629668' },
  { name: 'Adhil Biju', phone: '+91 9037959025' },
  { name: 'Adila Isha', phone: '+91 9947492065' },
  { name: 'Gowribala A Nair', phone: '+91 9037765046' },
]

export default function ContactUs() {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    // Reset the icon back to 'copy' after 2 seconds
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section className='w-full py-8 px-4 sm:px-6 relative z-10'>
      {/* Changed max-w-xl to max-w-3xl for a wider, better laptop view */}
      <div className='max-w-3xl mx-auto'>
        
        <div className={styles.contactCard}>
          <div className={styles.cardGlow} />

          {/* Header */}
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Contact Us</h2>
            <div className={styles.generalInquiry}>
              <span className={styles.inquiryLabel}>General Inquiries:</span>
              
              <div className={styles.contactAction}>
                <a href='mailto:ca@tathva.org' className={styles.inquiryEmail}>
                  <MdEmail className='text-amber-400 text-lg' />
                  <span>ca@tathva.org</span>
                </a>
                <button
                  onClick={() => handleCopy('ca@tathva.org', 'email')}
                  className={`${styles.copyBtn} ${copiedId === 'email' ? styles.copied : ''}`}
                  title='Copy email'
                  aria-label='Copy email to clipboard'
                >
                  {copiedId === 'email' ? <MdCheck className="text-green-500" /> : <MdContentCopy />}
                </button>
              </div>

            </div>
          </div>

          {/* List of Contacts */}
          <div className={styles.contactList}>
            {contacts.map((contact, index) => (
              <div key={contact.name} className={styles.contactItem}>
                
                <h3 className={styles.contactName}>
                  {contact.name}
                </h3>

                <div className={styles.contactAction}>
                  <a 
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                    className={styles.contactPhone}
                  >
                    {contact.phone}
                  </a>
                  <button
                    onClick={() => handleCopy(contact.phone, index)}
                    className={`${styles.copyBtn} ${copiedId === index ? styles.copied : ''}`}
                    title='Copy phone number'
                    aria-label='Copy phone number to clipboard'
                  >
                    {copiedId === index ? <MdCheck className="text-green-500" /> : <MdContentCopy />}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}