"use strict"

const axios = require("axios")
const YAML = require('yaml')

module.exports = (event, context) => {

    let repo = event.query.repo;
    let owner = event.query.owner;

    if (!repo || !owner) {
        return context.fail("Give a repo and owner in the querystring");
    }

    axios.get(`https://raw.githubusercontent.com/{owner}/{repo}/master/.DEREK.yml`)
    .then(function (response) {
        if(response.status == 200) {
            let doc = YAML.parse(response.data)
            let numFeatures = doc.features.length

            return context.status(307).
            headers({"Location": `https://img.shields.io/badge/derek-{numFeatures}-features.svg`})
        } 
    })

    context.status(307).
    headers({"Location": `https://img.shields.io/badge/derek-errored.svg`})
}
