/**
 * This file is part of node-github-uri-https-parser
 *
 * Copyright (c) 2018 SAS 9 Février.
 *
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 *
 */

/* eslint-env mocha */

require('should')
const {githubUriHttpsParser} = require('../lib/github-uri-https-parser')

const fullGithubURI = 'git+https://github.com/9fv/node-github-uri-https-parser.git'
const fullGithubURIIncludingDot = 'git+https://github.com/pigalle-io/pigalle.core.base.class.git'
const simpleGithubURI = 'https://github.com/9fv/node-github-uri-https-parser.git'
const partialGithubURI = 'https://github.com/9fv/node-github-uri-https-parser'

describe('githubUriHttpsParser', () => {
  it('should be a function', () => {
    (githubUriHttpsParser).should.be.a.Function()
  })
})

describe('Parse ', () => {
  it('an invalid URI should throw an {Error}', () => {
    (() => { return githubUriHttpsParser('poulet') }).should.throw(Error)
  })

  it('an URI using invalid domain should throw an {Error}', () => {
    (() => { githubUriHttpsParser('https://bitbucket.org/9fv/node-github-uri-https-parser.git') }).should.throw(Error)
  })

  it('an invalid Github URI should throw an {Error}', () => {
    (() => { githubUriHttpsParser('https://github.com/@9fv.io/node-github-uri-https-parser.git') }).should.throw(Error)
  })

  it('a simple Github URI should return object', () => {
    (githubUriHttpsParser(simpleGithubURI)).should.be.an.instanceOf(Object)
  })

  it('a simple Github URI should return an object with properties (username, repository)', () => {
    (githubUriHttpsParser(simpleGithubURI)).should.have.properties('username', 'repository')
  })

  it('a simple Github URI should return an object with a property username equals to 9fv', () => {
    (githubUriHttpsParser(simpleGithubURI).username).should.be.equal('9fv')
  })

  it('a simple Github URI should return an object with a property repository equals to node-github-uri-https-parser', () => {
    (githubUriHttpsParser(simpleGithubURI).repository).should.be.equal('node-github-uri-https-parser')
  })

  it('a full Github URI should return object', () => {
    (githubUriHttpsParser(fullGithubURI)).should.be.an.instanceOf(Object)
  })

  it('a full Github URI should return an object with properties (username, repository)', () => {
    (githubUriHttpsParser(fullGithubURI)).should.have.properties('username', 'repository')
  })

  it('a full Github URI should return an object with a property username equals to 9fv', () => {
    (githubUriHttpsParser(fullGithubURI).username).should.be.equal('9fv')
  })

  it('a full Github URI should return an object with a property repository equals to node-github-uri-https-parser', () => {
    (githubUriHttpsParser(fullGithubURI).repository).should.be.equal('node-github-uri-https-parser')
  })

  it('a full Github URI including dot character including dot character should return object', () => {
    (githubUriHttpsParser(fullGithubURIIncludingDot)).should.be.an.instanceOf(Object)
  })

  it('a full Github URI including dot character including dot character should return an object with properties (username, repository)', () => {
    (githubUriHttpsParser(fullGithubURIIncludingDot)).should.have.properties('username', 'repository')
  })

  it('a full Github URI including dot character including dot character should return an object with a property username equals to 9fv', () => {
    (githubUriHttpsParser(fullGithubURIIncludingDot).username).should.be.equal('pigalle-io')
  })

  it('a full Github URI including dot character including dot character should return an object with a property repository equals to node-github-uri-https-parser', () => {
    (githubUriHttpsParser(fullGithubURIIncludingDot).repository).should.be.equal('pigalle.core.base.class')
  })

  it('a partial Github URI should return object', () => {
    (githubUriHttpsParser(partialGithubURI)).should.be.an.instanceOf(Object)
  })

  it('a partial Github URI should return an object with properties (username, repository)', () => {
    (githubUriHttpsParser(partialGithubURI)).should.have.properties('username', 'repository')
  })

  it('a partial Github URI should return an object with a property username equals to 9fv', () => {
    (githubUriHttpsParser(partialGithubURI).username).should.be.equal('9fv')
  })

  it('a partial Github URI should return an object with a property repository equals to node-github-uri-https-parser', () => {
    (githubUriHttpsParser(partialGithubURI).repository).should.be.equal('node-github-uri-https-parser')
  })
})
