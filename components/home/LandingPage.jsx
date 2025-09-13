import React from 'react'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ServicesSection from './ServicesSection'
import ServicesSectionVariant from './ServicesSectionVariant'
import Testimonials from './Testimonials'
import InsightsSection from './InsightsSection'

const LandingPage = () => {
  return (
    <>
        <div id="home">
          <HeroSection/>
        </div>
        <div id='about'>
          <AboutSection/>
        </div>
        <div id="services">
          <ServicesSection/>
        </div>
        <div>
          <ServicesSectionVariant/>
        </div>
        <div>
          <Testimonials/>
        </div>
        <div id="blog">
          <InsightsSection/>
        </div>
    </>
  )
}

export default LandingPage