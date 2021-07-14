'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import '../../common'
import small from './img/small.jpg'
import './search.less'

class Search extends React.Component{

  constructor(){
    super(...arguments)

    this.state = {
      Text:null
    }
  }

  loadComponent(){
    import('./text.js').then((Text) => {
      this.setState({
        Text:Text.default
      })
    })
  }

  render(){
    const {Text} = this.state
    return <div className='search-text'>
      {
        Text ? <Text /> : null 
      }
      <img src={small} onClick={this.loadComponent.bind(this)} />
      </div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)