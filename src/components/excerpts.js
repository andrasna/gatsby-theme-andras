import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from "gatsby"
import { excerpts, excerpt, title } from '../styles/excerpt.module.css'
import { card } from '../styles/card.module.css'

const Excerpts = () => {
  const data = useStaticQuery(graphql`
    query PostExcerptsQuery {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
          excerpt(pruneLength: 260)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes

  return(
    <div className={excerpts}>
      {posts.map((post, i) => {
        return (
          <article key={i} className={`${card} ${excerpt}`}>
            <header>
              <time dateTime={post.frontmatter.date}>
                {post.frontmatter.date}
              </time>

              <Link to={post.fields.slug}>
                <h2 className={title}>
                  {post.frontmatter.title}
                </h2>
              </Link>
            </header>

            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </article>
        )
      })}
    </div>
  )
}

export { Excerpts }
