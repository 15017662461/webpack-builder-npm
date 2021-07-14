const assert = require('assert')

describe('webpack.base.js test case',() => {
  const baseConfig = require('../../lib/webpack.base')
  it('entry',() => {
    assert.equal(baseConfig.entry.index,'E:/webpack学习/myProject1/builder-webpack/test/smoke/template/src/index/index.js')
    assert.equal(baseConfig.entry.search,'E:/webpack学习/myProject1/builder-webpack/test/smoke/template/src/search/index.js')
    
  })
})