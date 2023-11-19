import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App'

function render() {
  return renderToString(
    <StaticRouter location="/guide">
      <App></App>
    </StaticRouter>,
  )
}

export { render }
