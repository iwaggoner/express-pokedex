const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll()
    .then(faves =>{
      res.render('favorites', {result: faves})
    })
    .catch(error =>{
      console.error
    })

  // TODO: Get all records from the DB and render to view
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  const data = JSON.parse(JSON.stringify(req.body))
  db.pokemon.create({
    name: data.name
  })
  .then(createdFave =>{
    res.redirect('/pokemon');
  })
});

// show ROUTE
router.get('/:name', (req,res)=>{
  let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`

  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data;
    let stats = apiResponse.data.stats;
    let moves = apiResponse.data.moves;
    res.render('results', {results: pokemon, stats: stats, moves: moves})
  })
})

// Delete ROUTE
router.delete('/:id', (req, res)=>{
  db.pokemon.destroy({
    where : {id: req.params.id}
  })
  .then(deletedItem => {
    res.redirect('/pokemon')
  })
  .catch(error => {
    console.error
  })
})


module.exports = router;
