const express = require('express');

const app = express();

const port = 3000;

const axios = require('axios');

app.get('/posts/', async (req, res) => {
  try {
    const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    return res.status(200).send({
      error: false,
      data: posts.data
    });

  } catch (error) {
    console.log(error)
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app;