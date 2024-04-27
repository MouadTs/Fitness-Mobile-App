const request = require('request');
var muscle = 'intermediate';
request.get({
  url: 'https://api.api-ninjas.com/v1/exercises?difficulty=' + muscle,
  headers: {
    'X-Api-Key': 'ZuqYxr21m4HJbpdCecWXoQ==T6SGwH4HSiHGuryR'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});