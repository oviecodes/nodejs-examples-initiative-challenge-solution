

const express = require('express');
const path = require('path')
const fs = require('fs')


const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const fileString = fs.readFileSync(path.join(process.cwd() + '/package.json'))
        const dependencies = JSON.parse(fileString.toString()).dependencies
        res.render('dependencies.hbs', { dependencies })
    } catch (error) {
        res.send(`An error occured on ${req.route.path}, ${error}`)
    }
    
})

console.log(path.join(process.cwd() + '/package.json'))
console.log(__dirname)

module.exports = router