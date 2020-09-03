

const tape = require('tape')
const bent = require('bent')
const getPort = require('get-port')
const nock = require('nock')

const server = require('../index')

const getJSON = bent('json')
const getBuffer = bent('buffer')
const response = require('./response.json')

// Use `nock` to prevent live calls to remote services

const context = {}

console.log(context.origin)

tape('setup', async function (t) {
	const port = await getPort()
	context.server = server.listen(port)
	context.origin = `http://localhost:${port}`

	t.end()
})

const scope = nock(`https://nodejs.org`)
	.get(`/dist/index.json`)
	.reply(200, response)
	.persist()


tape('should get dependencies', async function (t) {
	const html = (await getBuffer(`${context.origin}/dependencies`)).toString()
	t.plan(3)
	// assertions etc
	t.true(html.indexOf('bent'), 'should contain bent')
	t.true(html.indexOf('express'), 'should contain express')
	t.true(html.indexOf('hbs'), 'should contain hbs')
	t.end()
})

// // more tests

tape('should get minimum secure versions', async (t) => {
	const minSecure = (await getJSON(`${context.origin}/minimum-secure`))
	const v0minSecure = minSecure['v0'].version
	const v4minSecure = minSecure['v4'].version

	t.equal(v0minSecure, 'v0.12.17', 'v0 should match')
	t.equal(v4minSecure, 'v4.9.0', 'v4 should match')
	t.end()
})

tape('should get latest-releases', async (t) => {
	const latest = (await getJSON(`${context.origin}/latest-release`))
	const v14latest = latest['v14'].version
	const v13latest = latest['v13'].version

	t.equal(v14latest, 'v14.9.0', 'v14 should match')
	t.equal(v13latest, 'v13.14.0', 'v13 should match')
	t.end()
})

tape('teardown', function (t) {
	context.server.close()
	t.end()
})