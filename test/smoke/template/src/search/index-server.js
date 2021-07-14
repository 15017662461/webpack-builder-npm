'use strict';

const React = require('react')
const small = require('./img/small.jpg')
const ReactDOM = require('react-dom')
require('./search.less')

class Search extends React.Component {
  constructor() {
    super(...arguments)

    this.state = {
      Text: null
    }
  }

  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      })
    })
  }

  render() {
    const { Text } = this.state
    return <div className='search-text'>
      {
        Text ? <Text /> : null
      }
      <img src={small.default} onClick={this.loadComponent.bind(this)} />
    </div>;
  }
}

if (typeof document === "undefined") {
  console.log('在服务端渲染')
  module.exports = <Search />;
} else {
  console.log('在客户端渲染')
  ReactDOM.render(
    <Search />,
    document.getElementById('root')
  )
}