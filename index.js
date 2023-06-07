const express = require('express');
const app = express();
const axios = require('axios');
const redis = require('redis');

const port = 3000;

// make a connection to the local instance of Redis
// with legacy mode and local port 6379
const client = redis.createClient({
  legacyMode: true,
  PORT: 6379
})
client.connect().catch(console.error)


// Redis connection event handlers
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (error) => {
  console.error('Redis connection error:', error);
});

app.get('/get-posts/:post_item', async (req, res) => {
  const postItem = req.params.post_item;

  try {
    client.get(postItem, async (err, post) => {
      console.log(post)

      if (post) {
        res.status(200).send({
          error: false,
          message: `POSTS for ${postItem} from the cache`,
          data: JSON.parse(post)
        });
      } else {
        // If there is no data in cache, send a request to the server.
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postItem}`);
        const posts = response.data;

        // Save data to cache using setex with postItem id
        client.setex(postItem, 1440, JSON.stringify(posts));

        res.status(200).send({
          error: false,
          message: `Posts for ${postItem} from the server`,
          data: posts
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: error.toString(),
      error: true,
      data: null
    });
  }
});

app.patch('/update-post/:post_item', async (req, res) => {
  const postItem = req.params.post_item

  try {
    // assume that there is an update of post item 
    // redis have 2 invalidation system on core. 
    // First one expiration, we already set the get-posts method using client.setex
    // The second one is make an invalidation on data

    // assume that we have a updatePost() function to change post data
    // now we must invalidate the key which giving on setex for not giving the old data from cache

    // The first method is delete the key of post data using post item id
    client.del(postItem);

    // Or we can update the key of recent data's key
    /*  client.set('anahtar', 'yeniveri'); */

  } catch (error) {
    return res.status(500).send({
      message: error.toString(),
      error: true,
      data: null
    });
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
