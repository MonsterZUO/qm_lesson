const Joi = require('joi');
const GROUP_NAME = 'blog';
const getList = require('./getList');
const { paginationDefine} = require('../../utils/router-helper');
const models = require('../../models');


module.exports = [
  getList(GROUP_NAME, {paginationDefine}),

]