import React from 'react'
import { NavArea } from '../components/nav-area'
import { Wrapper } from '../components/wrapper'
import { FooterLinks } from '../components/footer-links'
import myFriendPhoto from '../assets/myfriend.jpeg' 
import { about } from '../styles/page-about.module.css'
import { card } from '../styles/card.module.css'
import { Seo } from '../components/seo'

const About = () => {
  return (
    <>
      <Seo />

      <Wrapper>
        <NavArea />

        <main>
          <article className={about}>
            <figure>
              <img src={myFriendPhoto} alt='My friend' />
              <figcaption>
                This is not me, it is my friend helping me design my about page.
              </figcaption>
            </figure>

            <div className={card}>
              <header className='visually-hidden'>
                <h1>About</h1>
              </header>

              <p>Hi, I am Andras, I specialize in front end web development.</p>
              <p>The main area of my work is about implementing web UIs.</p>
              <p>I emphasize the value of web performance, accessibility, choosing the right tools and technologies for each problem.</p>
              <p>My native language is Hungarian, however we can communicate in English and German too.</p>
              <p>My <a title='Link to GitHub.' href='https://github.com/andrasna'>GitHub</a> and my <a title='Link to CodePen.' href='https://codepen.io/andrasnagy'> CodePen</a>.</p>
              <p>You can reach me through email: <br /> <a href='mailto:andrasnagy.contact@gmail.com'>contact@andras.me</a> </p>
            </div>
          </article>
        </main>

        <FooterLinks />
      </Wrapper>
    </> 
  ) 
}

export default About 
