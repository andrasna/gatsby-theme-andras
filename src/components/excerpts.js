import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { excerpts, excerpt, title } from '../styles/excerpt.module.css'
import { card } from '../styles/card.module.css'

const Excerpts = () => {
  const data = useStaticQuery(graphql`
    query PostExcerptsQuery {
      allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
        nodes {
          id
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes

  return(
    <div className={excerpts}>
      {posts.map((post) => {
        return (
          <article key={post.id} className={`${card} ${excerpt}`}>
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

            <div>
              {post.frontmatter.description}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export { Excerpts }
