import { useState } from 'react'
import { Content } from '../../runtime/content'

export function Layout() {
  return (
    <div>
      <div>Common Content</div>
      <h1>Doc Content</h1>
      <Content></Content>
    </div>
  )
}
