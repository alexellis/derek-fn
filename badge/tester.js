"use strict"

let t = require("./handler.js")

// let owner="alexellis"
// let repo="derek"

let owner="openfaas"
let repo="faas"

t({query:{"repo":repo,"owner":owner}},
{
    status:function(s){
        console.log("status",s)
        return this;
    },
    headers:function(s){
        console.log("headers",s)
        return this;
    },
    fail:function(s){
        console.log("fail",s)
        return this;
    }
})

