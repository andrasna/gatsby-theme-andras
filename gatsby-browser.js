import './src/styles/index.css'
import '@fontsource/spectral'
import '@fontsource/spectral/400-italic.css'
import '@fontsource/spectral/300.css'
import '@fontsource/spectral/600.css'
import 'prismjs/themes/prism-okaidia.css'

export const onClientEntry = () => {
  if (localStorage.getItem('colorMode') === 'dark') {
    document.documentElement.classList.add('dark-mode')
  } 
}
