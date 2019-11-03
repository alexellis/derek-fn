"use strict"

const axios = require("axios")
const YAML = require('yaml')
const querystring = require('querystring');

module.exports = (event, context) => {

    if(event.query) {
        // let q = querystring.parse(event.query);
        let repo = event.query.repo;
        let owner = event.query.owner;

        if (!repo || !owner) {
            return context.fail(`Give a repo and owner in the querystring.`);
        }

        let uri = `https://raw.githubusercontent.com/${owner}/${repo}/master/.DEREK.yml`

        get(uri)
        .then(res => {
            if(res.redirect) {
                get(res.redirect)
                .then(res => {
                    return context
                        .status(307)
                        .headers({"Location": `https://img.shields.io/badge/derek-${res.numFeatures}-features.svg`})
                }).catch(e => {
                    return context.fail(e.toString());
                });
            } else {
                return context
                    .status(307)
                    .headers({"Location": `https://img.shields.io/badge/derek-${res.numFeatures}-features.svg`})
            }
        }).catch(e=> {
            return context.fail(e.toString());
        });
    }

    return context
        .status(307)
        .headers({"Location": `https://img.shields.io/badge/derek-errored.svg`})
}

function get(uri) {
    return new Promise((resolve, reject) => {
        console.log("get",uri)

        axios.get(uri)
        .then(function (response) {

            if(response.status == 200) {
                let doc = YAML.parse(response.data)
                if(doc.redirect) {
                    return resolve({"redirect": doc.redirect})
                }

                return resolve({"numFeatures": doc.features.length});
            }

            return reject("error")
        })
    });
}
