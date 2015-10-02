# fb-posts

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm](https://img.shields.io/npm/v/fb-posts.svg)](https://www.npmjs.com/package/fb-posts)
[![david](https://david-dm.org/davidyen1124/fb-posts.svg)](https://david-dm.org/davidyen1124/fb-posts)


## Install:
Get facebook page posts using graph api and `event emitter`

```
npm install fb-posts
```

## Usage

```javascript
var fbPosts = require('fb-posts')

var engine = fbPosts('USERNAME', 'PASSWORD', 'PAGE_ID', {
  fields: ['link'], // or any fields you want
  max: 10 // max posts
})
engine.start()

engine.on('found', function (post) {
  console.log(post)
})

engine.on('done', function () {
  // no more posts
})

engine.on('error', function (err) {
  // found an error
})

```

### Feel free to open issues and PRs