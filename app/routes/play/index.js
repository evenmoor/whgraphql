const play = require('express').Router();
//const game = require('./game');
const chat = require('./chat');

play.get('/', chat);
//play.get('/:gameId/', game);

module.exports = [play];