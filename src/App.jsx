import HeroSection from './components/HeroSection'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Testimonial from './components/Testimonial'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Toastify for notifications
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      {/* Main Page Sections */}
      <HeroSection />
      <Portfolio />
      <About />
      <Services />
      <Skills />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />

      {/* Toast notifications (global, always present) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  )
}

export default App
