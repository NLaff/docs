/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());
const OAUTH_COOKIE = 'oauth2_cookie';

examples.get('/status', oAuthStatus);
examples.get('/logout', logOut);

function oAuthStatus(request, response) {
  const name = request.cookies[OAUTH_COOKIE] ? request.cookies[OAUTH_COOKIE].name : '';
  response.json({
    loggedIn: !!name,
    name,
  });
}

function logOut(request, response) {
  let returnUrl = request.query ? request.query.return : '';
  returnUrl += '#success=true';
  response.clearCookie(OAUTH_COOKIE);
  response.status(200).redirect(returnUrl);
}

module.exports = examples;
