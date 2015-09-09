#!/usr/bin/env node

"use strict";

var chokidar = require("chokidar"),
    shell = require("shelljs"),
    args = process.argv.slice(2).length > 0 ? process.argv.slice(2) : [null],
    version = require("../package.json").version

var verbose = ~args.indexOf("--verbose") || ~args.indexOf("-v")
var watch = getParameter(args, "--watch")[0] || getParameter(args, "-w")[0] || "."
var help = ~args.indexOf("--help") || ~args.indexOf("-h")
var showVersion = ~args.indexOf("--version") || ~args.indexOf("-V")
args = remove(args, ["--verbose", "-v", "--watch", watch])
//console.log("options", verbose, watch, help)

//FIXME: chokidar.watch() seems to only watch the first file matching a glob expression
var watcher = chokidar.watch(watch, {
  ignored: /[\/\\]\./,
  persistent: true
})

if(help) {
  console.log(
    "usage: gd-watch [options] <command> [<command>]*" +
    "\r\n\r\nWHERE:" +
    "\r\n<command> = <string>" +
    "\r\nExample: gd-watch -w example/**/*.css 'npm run build:css' 'rm example/sideeffect.css'" +
    "\r\n\r\nOPTIONS:" +
    "\r\n\t-h | --help\tprint help" +
    "\r\n\t-v | --verbose\tverbose output" +
    "\r\n\t-w | --watch\twatch glob pattern (default is '.' = everything)" +
    "\r\n\t-V | --version\twatch glob pattern"
  )
  process.exit(0)
}

if(showVersion) {
  console.log("doorglass", version)
  process.exit(0)
}

if(verbose)
  console.log("Running in verbose mode")

watcher
  .on("change", function(file) {
    if(verbose)
      console.log("File", file, "has been changed")
    triggerCommands(args.map(function(cmd) {
      if(verbose)
        console.log("Running command '%s'", cmd)
      return cmd// + " " + file
    }))
  })
  .on("ready", function() {
    if(verbose)
      console.log("Watching...", watch)
  })
  .on("error", function(error) {
    if(verbose)
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
