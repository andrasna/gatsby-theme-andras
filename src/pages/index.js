import React from 'react'
import { NavArea } from '../components/nav-area'
import { Wrapper } from '../components/wrapper'
import { FooterLinks } from '../components/footer-links'
import { ProjectsSection } from '../components/projects/projects-section'
import { Helmet } from 'react-helmet'

const Home = () => {
  return(
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | Andras Nagy</title>
      </Helmet>

      <Wrapper>
        <NavArea />

        <main>
          <ProjectsSection />
        </main>

        <FooterLinks />
      </Wrapper>
    </> 
  ) 
}

export default Home 
