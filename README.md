# fb-posts

Get facebook page posts using graph api and `event emitter`

```
npm install fb-posts
```

## Usage

```javascript
var fbPosts = require('./engine')

var engine = fbPosts('USERNAME', 'PASSWORD', 'PAGE_ID', {
  fields: ['link'] // or any fields you want
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
