// Global styles
import './src/styles/index.css'

// Fonts
import '@fontsource/montserrat'
import '@fontsource/montserrat/400-italic.css'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/600.css'

// Code hightlight
import 'prismjs/themes/prism-okaidia.css'

// Dark mode
export const onClientEntry = () => {
  if (localStorage.getItem('is-dark') === 'true') {
    document.documentElement.classList.add('is-dark')
  } 
}
