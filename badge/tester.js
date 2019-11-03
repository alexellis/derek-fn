"use strict"

let t = require("./handler.js")

t({query:{"repo":"derek","owner":"alexellis"}},
    {
        status:function(s){
            console.log(s)
            return this;
        },
        headers:function(s){
            console.log(s)
            return this;
        },
        fail:function(s){
            console.log(s)
            return this;
        }
    })

