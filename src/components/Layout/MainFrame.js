import * as React from 'react'
import Navbar from './Navbar'

export default class MainFrame extends React.Component {
  
  render() {
    return (        
        <div className='AppContainer'>
          <Navbar/>
          {this.props.children}
        </div>
    )
  }
}
