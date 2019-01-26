const express = require ('express');
const userService = require('../services/user');
const app = express();
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');