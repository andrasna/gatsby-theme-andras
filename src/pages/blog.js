import React from 'react'
import { NavArea } from '../components/nav-area'
import { Wrapper } from '../components/wrapper'
import { Excerpts } from '../components/excerpts'
import { FooterLinks } from '../components/footer-links'
import { Helmet } from 'react-helmet'

const Blog = () => {
  return(
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | Andras Nagy</title>
      </Helmet>

      <Wrapper>
        <NavArea />
      </Wrapper>

      <Wrapper variant='post'>

        <main>
          <article>
            <header className="visually-hidden">
              <h1>Blog</h1>
            </header>

            <Excerpts />
          </article>
        </main>

      </Wrapper>

      <Wrapper>
        <FooterLinks />
      </Wrapper>
    </> 
  ) 
}

export default Blog 

