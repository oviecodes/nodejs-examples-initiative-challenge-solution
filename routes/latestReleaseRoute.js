

const express = require('express')
const bent = require('bent')
const { getVersions, getMaximumVersions, formJson} = require('./helpers/helpers')


const getJSON = bent('json')

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const response = await getJSON('https://nodejs.org/dist/index.json')
        //get version of all releases and store in array
        const versions = response.map(el => el.version)

        const maxVersions = [] //latest release
        const jsonResult = { } // final json result

        const verNum = []

        // get versions as Numbers
        getVersions(versions, verNum)

        // get min version as a number
        const min = Math.min(...verNum)

        // get max version as a number
        const max = Math.max(...verNum)

        getMaximumVersions(maxVersions, versions, min, max)

        formJson(maxVersions, jsonResult, response)

        res.send(jsonResult)
    } catch (error) {
        res.send(`An error occured on ${req.route.path}, ${error}`)
    }
    
})

module.exports = router