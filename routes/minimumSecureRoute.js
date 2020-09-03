

const express = require('express')
const bent = require('bent')
const { getVersions, getMaximumVersions, formJson} = require('./helpers/helpers')


const getJSON = bent('json')

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const response = await getJSON('https://nodejs.org/dist/index.json')
        const versions = response.filter(el => el.security).map(el => el.version) //get version of releases with security:true
        const maxVersions = [] //array for the maximum version of each release with security:true
        const jsonResult = { } //final json result
        const verNum = [] // array for json Versions as whole numbers

        // get versions as Numbers
        getVersions(versions, verNum)

        // get min version
        const min = Math.min(...verNum)

        // get max version
        const max = Math.max(...verNum)

        getMaximumVersions(maxVersions, versions, min, max)

        formJson(maxVersions, jsonResult, response)

        res.send(jsonResult)
    } catch (error) {
        res.send(`An error occured on ${req.route.path}, ${error}`)
    }
    
})

module.exports = router