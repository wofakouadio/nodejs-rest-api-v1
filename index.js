const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [
    {
        id: 1,
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        release_date: '1994-09-14'
    }, 
    {
        id: 2,
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        release_date: '1972-03-14'
    },
    {
        id: 3,
        title: 'The Godfather: Part II',
        director: 'Francis Ford Coppola',
        release_date: '1974-12-20'
    },
    {
        id: 4,
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        release_date: '2008-07-18'
    },
    {
        id: 5,
        title: '12 Angry',
        director: 'Ridley Scott',
        release_date: '1977-03-13'
    },
    {
        id: 6,
        title: 'Schindler\'s List',
        director: 'Steven Spielberg',
        release_date: '1993-12-15'
    },

]

// get the movie list of in the form of JSON
app.get('/movies/api/v1/', (req, res) => {
    res.json(movies);
});

// add movie to JSON file
app.post('/movies/api/v1/add/', (req, res) => {
    const newMovie = req.body;
    movies.push(newMovie);
    res.send({msg:'Movie added successful',movies});
});

// search movie by id
app.get('/movies/api/v1/search/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const search_movie = movies.find(movie => movie.id === parseInt(id));
    if (search_movie) {

        res.json({msg:'Movie Details',search_movie });
    }else{
        res.send({msg:'Movie not found'});
    }
    
});

// delete movie by id
app.delete('/movies/api/v1/delete/:id', (req, res) => {
 
    const delete_movie = movies.some(movie => movie.id === parseInt(req.params.id));
    
    if (delete_movie) {
        movies = movies.filter(movie => movie.id!== parseInt(req.params.id));
        res.json({msg:'Movie deleted successful', movies});
    }else{
        res.send({msg:'Movie not found'});
    }
});

// set the server to listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});