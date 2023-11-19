import { useRoutes } from 'react-router-dom'
import { Index } from '../../docs/guide/index'
import { A } from '../../docs/guide/a'
import { B } from '../../docs/guide/b'

const routes = [
  {
    path: '/guide',
    element: <Index></Index>,
  },
  {
    path: '/guide/a',
    element: <A></A>,
  },
  {
    path: '/b',
    element: <B></B>,
  },
]

export function Content() {
  const routeElement = useRoutes(routes)
  return routeElement
}
