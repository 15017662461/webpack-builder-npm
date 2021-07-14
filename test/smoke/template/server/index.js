if (typeof window === 'undefined'){
  global.window = {}
}

const fs = require('fs')
const path = require('path')
const express = require('express')
const {renderToString} = require('react-dom/server')
const SSR = require('../dist/search-server')
const template = fs.readFileSync(path.join(__dirname,'../dist/search.html'),'utf-8')

const server = (port) =>{
  const app = new express()

  app.use(express.static('dist'))

  app.get('/search',(req,res) => {
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port,() => {
    console.log('server running on' + port)
  })
}


const renderMarkup = (str) =>{
  return template.replace('<!--HTML_PLACEHOLDER-->',str)
}

server(process.env.PORT || 3000)