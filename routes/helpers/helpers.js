

const express = require('express')
const semverMaxSatisfying = require('semver/ranges/max-satisfying')


// get version as whole number
const getVersions = (versions, verNum) => {
    versions.forEach((el, i) => {
        verNum.push(Number(el.split('.')[0].split('v')[1]))
    })
}
   
// push max satisfying versions onto maxVersions array 
const getMaximumVersions = (maxVersions, versions, min, max) => {
    for (let i = min; i < max + 1; i++) {
        maxVersions.push(semverMaxSatisfying(versions, `>=${i} <${i+1}`))
    }
} 

// formulate result json
const formJson = (maxVersions, jsonResult, response) => {
    // loop through maxVersions
    maxVersions.forEach((el, i) => {
        if(el !== null){
            // create a json response and push into jsonResults
            jsonResult[`v${i}`] = (response.find(elem => elem.version === el))
        }
        
    })
}

module.exports = {
    getVersions,
    getMaximumVersions,
    formJson,
}