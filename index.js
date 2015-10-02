var graph = require('fbgraph')
var FbToken = require('fb-access-token')
var EventEmitter = require('events')

var fbPosts = function (username, password, pageId, config) {
  var engine = new EventEmitter()
  var fbToken = new FbToken(username, password, config.appId || '145634995501895')

  engine.start = function () {
    fbToken.loginGetToken(function (err, token) {
      if (err) {
        engine.emit('error', err)
        return
      }

      graph.setAccessToken(token)
      config.fields = config.fields || []
      graph.get(pageId + '/posts?fields=' + config.fields.join(','), getPosts)
    })
  }

  var stop = false
  var count = 0

  var getPosts = function (err, res) {
    if (err) {
      engine.emit('error', err)
      return
    }

    if (!res || !res.data) {
      stop = true
      return
    }

    if (res.paging && res.paging.next) {
      graph.get(res.paging.next, getPosts)
    } else {
      stop = true
    }

    res.data.forEach(function (post) {
      if (!post.id || !post.link) {
        return
      } else if (config.max && config.max <= count) {
        stop = true
        return
      }

      count++
      engine.emit('found', post)
    })

    if (stop) {
      engine.emit('done')
    }
  }

  return engine
}

module.exports = fbPosts
