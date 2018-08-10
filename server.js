const express    = require('express');
const app        = express();
const axios      = require('axios');

app.use(express.static(__dirname + '/dist'));

const githubApi = 'https://api.github.com';
const port  = process.env.PORT || 8080;

app.route('/api/users/:username')
  .get((req, res, next) => {
    const username = req.params['username'];

    axios.get(`${githubApi}/users/${username}`)
      .then(resp => {
        res.send(resp.data);
    }, (err) => {
        next(err);
    });
  });

app.route('/api/users/:username/followers')
  .get((req, res, next) => {
    const username = req.params['username'];
    const per_page = req.query['per_page'];
    const page     = req.query['page'];

    axios.get(`${githubApi}/users/${username}/followers?per_page=${per_page}&&page=${page}`)
      .then(resp => {
        res.send(resp.data);
    }, (err) => {
        next(err);
    });
  });

app.listen(port);
console.log('Server started!');
