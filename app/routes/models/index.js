const models = require('express').Router();
const detail = require('./detail');
const list = require('./list');

models.get('/', list);
models.get('/:modelId/', detail);

module.exports = models;