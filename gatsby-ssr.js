const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      dangerouslySetInnerHTML={{
        __html:`
          if (localStorage.getItem('is-dark') === 'true') {
            document.documentElement.classList.add('is-dark')
          } 
        `, 
      }}
    />,
  ])
}
