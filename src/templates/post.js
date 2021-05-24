import React from 'react'
import { graphql } from 'gatsby'
import { NavArea } from '../components/nav-area'
import { Wrapper } from '../components/wrapper'
import { FooterLinks } from '../components/footer-links'
import { card } from '../styles/card.module.css'
import { post as postStyle } from '../styles/post.module.css'

export const data = graphql`
  query PostQuery(
    $id: String!
  ) {
    markdownRemark(id: { eq: $id }) {
      html
      id
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

const Post = ({data}) => {
  const post = data.markdownRemark

  return(
    <>
      <Wrapper>
        <NavArea />
      </Wrapper>

      <Wrapper variant='post'>

        <main>
          <article key={post.id} className={`${card} ${postStyle}`}>
            <header>
              <time dateTime={post.frontmatter.date}>
                {post.frontmatter.date}
              </time>

              <h1>
                {post.frontmatter.title}
              </h1>
            </header>

            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        </main>

      </Wrapper>

      <Wrapper>
        <FooterLinks />
      </Wrapper>
    </>
  ) 
}

export default Post 
