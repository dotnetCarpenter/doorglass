"use strict"

jQuery.fn.doorglass = function() {
  this.filter("a").append(() => {
    " (" + this.href + ")"
  })
  this.css("color", "green")
}
