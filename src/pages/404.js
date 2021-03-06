import React from 'react'
import { NavArea } from '../components/nav-area'
import { Wrapper } from '../components/wrapper'
import { FooterLinks } from '../components/footer-links'
import { Link } from 'gatsby'
import { Seo } from '../components/seo'

const NotFoundPage = () => {
  return (
    <>
      <Seo />

      <Wrapper>
        <NavArea />

        <main>
          <h1>Page not found</h1>
          <p>
            Sorry <span role='img' aria-label='Pensive emoji'> 😔 </span>
            we couldn’t find what you were looking for.
            <br />
            {process.env.NODE_ENV === 'development' ? (
              <>
                <br />
                Try creating a page in <code>src/pages/</code>.
                <br />
              </>
            ) : null}
            <br />
            <Link to='/'>Go home</Link>.
          </p>
        </main>

        <FooterLinks />
      </Wrapper>
    </> 
  ) 
}

export default NotFoundPage 
