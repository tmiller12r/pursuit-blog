const express = require('express')
const bcrypt = require('bcrypt');
const uuid = require ('uuid/vq1');
const userService = require('../services/user')
const app = express();