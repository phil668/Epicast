import { createRoot } from 'react-dom/client'
import siteData from 'epicast:site-data'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

// eslint-disable-next-line no-console
console.log('siteData', siteData)

function renderInBrowser() {
  const containerEl = document.getElementById('root')
  if (!containerEl)
    throw new Error('#root element not found')

  createRoot(containerEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}

renderInBrowser()
