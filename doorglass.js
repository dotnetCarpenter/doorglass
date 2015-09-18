"use strict"

jQuery.fn.doorglass = function(options) {
  let animationParameters = "1.3s ease-in-out 3s"
  let styles = {
    "dg-glass-container": {
      position: "absolute",
      "z-index": -100,
      height: "100%",
      width: "100%",
      filter: "blur(0.2rem)",
      "will-change": "filter",
      animation: "removeblur " + animationParameters,
      "animation-fill-mode": "forwards",
    },
    "dg-glass": {
      height: "100%",
      width: "100%",
      "background-repeat": "no-repeat",
      "background-size": "cover",
      "background-image": "url('../image/city-road-people-street.jpg')"
    },
    "dg-content-container": {
      position: "absolute",
      width: "100%",
      perspective: "210rem",
    },
    "dg-content": {
      "transform-origin": "0 center",
      "will-change": "transform",
      animation: "openleft " + animationParameters,
      "animation-fill-mode": "forwards",
    }
  }

  this.each(() => {
    let parent = this.parent()
    let overflow = window.getComputedStyle(parent.get(0))
    console.log("overflow", overflow)
    this.css("overflow", "hidden")
    //this.css(styles["dg-glass-container"])
    this.on("animationEnd", ev => { this.css("overflow", overflow || "auto") })
    parent.append("<div class='dg-glass-container'>" +
                    "<div class='dg-glass'/>" +
                  "</div>")

  })
}

jQuery($ => {
  $("dg-content-container").doorglass()
})
