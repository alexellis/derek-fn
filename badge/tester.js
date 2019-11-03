"use strict"

let t = require("./handler.js")

t({query:{"repo":"derek","owner":"alexellis"}},
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

