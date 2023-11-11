import { renderToString } from 'react-dom/server'
import { App } from './App'

function render() {
  return renderToString(<App></App>)
}

export { render }
