// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require packages used in the project
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/movies/:movie_id', (req, res) => {
  const selectMovie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: selectMovie })
  // console.log(req.query)
})

app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { movies: movies, keyword: keyword })

})
//setting static file
app.use(express.static('public'))
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port} ${Date()}`)
})