import * as React from 'react'
import { ReactNode } from 'react'
import Navbar from './Navbar'


interface Props {
  children: ReactNode
}
export function MainFrame(props: Props) {

  return (
    <div className='AppContainer'>
      <Navbar />
      {props.children}
    </div>
  )
}
