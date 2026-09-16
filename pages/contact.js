import { useEffect } from 'react'
import ContactUs from 'components/contact/ContactUs'
import SpaceBackground from 'components/common/SpaceBackground'

export default function Contact() {
  useEffect(() => {
    // Remove the normal grid background while on the contact page. Uses its own
    // class — 'leaderboard-page' would also pull in the leaderboard's one-screen
    // viewport lock (overflow: hidden), which clips this page on short screens.
    document.body.classList.add('contact-page')

    // Put the normal background back when leaving the contact page
    return () => {
      document.body.classList.remove('contact-page')
    }
  }, [])

  // REMOVED: 'leaderboard-page'. ADDED: 'w-full !m-0 !p-0' to kill the gap
  return (
    <div className='relative min-h-[calc(100vh-220px)] overflow-hidden flex flex-col justify-center w-full !m-0 !p-0'>
      
      {/* GhostFibers full-page background */}
      <SpaceBackground />
      
      {/* Page content above GhostFibers */}
      <div className='relative z-10 w-full pt-20 pb-4 sm:pt-24 sm:pb-6'>
        <ContactUs />
      </div>
      
    </div>
  )
}