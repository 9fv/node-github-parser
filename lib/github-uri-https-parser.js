/**
 * This file is part of node-github-uri-https-parser
 *
 * Copyright (c) 2018 SAS 9 Février.
 *
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 *
 */

/**
 * @module github-uri-https-parser
 * @example
 * const {githubUriHttpsParser} = require('github-uri-https-parser')
 * const {username, repository} = githubUriHttpsParser('https://github.com/9fv/node-github-uri-https-parser')
 */

const url = require('url')
const _ = require('lodash')

/**
 * Parse a Github HTTPS URI to get username and repository.
 *
 * @param uri {string} - The URI to parse.
 * @return {{username, repository}} An object containing properties: Github username, Github repository.
 * @category sync
 * @public
 */
function githubUriHttpsParser (uri) {
  if (_.startsWith(uri, 'git+')) {
    uri = uri.replace('git+', '')
  }
  const o = url.parse(uri)
  if (!o.protocol) {
    throw new Error('Unable to parse URI')
  }
  if (!_.endsWith(o.hostname, 'github.com')) {
    throw new Error('Not a Github URL')
  }
  let path = o.path
  if (_.endsWith(path, '.git')) {
    path = path.replace(/\.git$/, '')
  }
  const match = path.match(/^\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_.]+)/)
  if (!match) {
    throw new Error('Unable to parse URI')
  }
  return {
    username: match[1],
    repository: match[2]
  }
}

module.exports = {}
module.exports.githubUriHttpsParser = githubUriHttpsParser
