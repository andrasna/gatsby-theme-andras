import React from 'react'
import { NavArea } from '../components/nav-area'
import { Wrapper } from '../components/wrapper'
import { FooterLinks } from '../components/footer-links'
import { ProjectsSection } from '../components/projects/projects-section'
import { Seo } from '../components/seo'

const Home = () => {
  return (
    <>
      <Seo />

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
