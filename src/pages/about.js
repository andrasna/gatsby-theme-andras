import React from 'react'
import { NavArea } from '../components/nav-area'
import { Wrapper } from '../components/wrapper'
import { FooterLinks } from '../components/footer-links'
import myFriendPhoto from '../assets/myfriend.jpeg' 
import { about } from '../styles/page-about.module.css'
import { card } from '../styles/card.module.css'
import { Helmet } from 'react-helmet'

const About = () => {
  return(
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About | Andras Nagy</title>
      </Helmet>

      <Wrapper>
        <NavArea />

        <main>
          <article className={about}>
            <figure>
              <img src={myFriendPhoto} alt="My friend" />
              <figcaption>
                <p>
                This is not me, it is my friend, he said he would help me design my about page.
                <br />Thank you my friend.
                </p>
              </figcaption>
            </figure>

            <div className={card}>
              <header className="visually-hidden">
                <h1>About</h1>
              </header>

              <p>Hi, I am Andras, I specialize in front end web development.</p>
              <p>My main area of work is the implementation of web UIs.</p>
              <p>I emphasize the value of web performance, accessibility, choosing the right tools and technologies for each problem.</p>
              <p>My native language is Hungarian, however we can communicate in English and German, too.</p>
              <p>My <a title="Link to GitHub." href="https://github.com/andrasna">GitHub</a>, <a title="Link to CodePen." href="https://codepen.io/andrasnagy"> CodePen</a> and <a title="Link to StackOverflow." href="https://stackoverflow.com/users/5591717/fee-fi-fo-fum">StackOverflow</a> profile.</p>
              <p>You may reach me through email: <br /> <a href="mailto:contact@andras.me">contact@andras.me</a> </p>
            </div>
          </article>
        </main>

        <FooterLinks />
      </Wrapper>
    </> 
  ) 
}

export default About 

