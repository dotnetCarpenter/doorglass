#!/usr/bin/env node

"use strict";

var chokidar = require("chokidar"),
    shell = require("shelljs"),
    args = process.argv.slice(2).length > 0 ? process.argv.slice(2) : [null]

var debug = ~args.indexOf("--debug") || ~args.indexOf("-d")
var watch = getParameter(args, "--watch")[0] || getParameter(args, "-w")[0] || "."
var help = ~args.indexOf("--help") || ~args.indexOf("-h")
args = remove(args, ["--debug", "-d", "--watch", watch])
//console.log("options", debug, watch, help)

var watcher = chokidar.watch(watch, {
  ignored: /[\/\\]\./,
  persistent: true
})

if(help) {
  console.log(
    "usage: gd-watch [options] command [command command *]" +
    "\r\n\r\nOPTIONS:" +
    "\r\n\t-d | --debug\tverbose" +
    "\r\n\t-w | --watch\t\twatch glob pattern" +
    "\r\n\t-h | --help\tprint help"
  )
  process.exit(0)
}

if(debug)
  console.log("Running in debug mode")

watcher
  .on("change", function(file) {
    if(debug)
      console.log("File", file, "has been changed")
    triggerCommands(args.map(function(cmd) {
      if(debug)
        console.log("Running command '%s'", cmd)
      return cmd// + " " + file
    }))
  })
  .on("ready", function() {
    if(debug)
      console.log("Watching...", watch)
  })
  .on("error", function(error) {
    if(debug)
      console.log("Something fucked up", error)
  })

function remove(list, keys) {
  if(!Array.isArray(keys))
    keys = [keys]
  return list.filter(function(item) {
    //console.log(item, keys, !~keys.indexOf(item))
    return !~keys.indexOf(item)
  })
}

function triggerCommands(commands) {
  commands.forEach(function(cmd) {
    shell.exec(cmd)
  })
}

function getParameter(paramenters, get) {
  var ret = [];

  paramenters.forEach(function(n, i, all) {
    if(n === get && all[i + 1])
      ret.push(all[i + 1])
  })
  return ret;
}

function fst(arr) { return arr.length > 0 ? arr[0] : [null] }

function format(str) {
  var args = [].splice.call(arguments, 1)
  //console.log("%d of args", args.length)
  args.forEach(function(substitute) {
    str = str.replace(/%s|%d/, substitute)
    //console.log("replacing with %s: %s", substitute, str)
  })
  return str
}
