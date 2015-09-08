#!/usr/bin/env node

"use strict";

var chokidar = require('chokidar'),
    shell = require("shelljs"),
    args = process.argv.slice(2).length > 0 ? process.argv.slice(2) : [null]

var watcher = chokidar.watch('.', {
  ignored: /[\/\\]\./,
  persistent: true
})

var debug = ~args.indexOf("--debug") ||
            ~args.indexOf("-d") ?
              (args = remove(args, ["--debug", "-d"]), true) : false

if(debug)
  console.log("Running in debug mode")

watcher
  .on("change", function(file) {
    if(debug)
      console.log('File', file, 'has been changed')
    triggerCommands(args.map(function(cmd) {
      if(debug)
        console.log("Running command", cmd)
      return cmd// + " " + file
    }))
  })
  .on("ready", function() {
    if(debug)
      console.log("Watching...")
  })
  .on("error", function(error) {
    if(debug)
      console.log("Something fucked up", error)
  })

function remove(list, keys) {
  if(!Array.isArray(keys))
    keys = [keys]
  return list.filter(function(item) {
    return !~keys.indexOf(item)
  })
}

function triggerCommands(commands) {
  commands.forEach(function(cmd) {
    shell.exec(cmd)
  })
}
