import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, description }) => {
  const { site } = useStaticQuery(query)

  const {
    title: defaultTitle,
    description: defaultDescription,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
  }

  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{seo.title}</title>
      <meta name='description' content={seo.description} />
      <html lang='en' />
    </Helmet>
  )
}

export { Seo }

const query = graphql`
  query Seo {
    site {
      siteMetadata {
        title 
        description 
      }
    }
  }
`
