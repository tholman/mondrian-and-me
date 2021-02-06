;(() => {
  const canvas = document.querySelector("#canvas")
  const context = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  context.lineWidth = 10
  const rectangles = []
  let splitDirectionVertical = true

  canvas.addEventListener("click", onRectangleClick)

  function drawRectangles() {
    rectangles.forEach((rectangle) => {
      context.fillStyle = rectangle.color
      context.beginPath()
      context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
      context.closePath()
      context.fill()
      context.stroke()
    })
  }

  function onRectangleClick(e) {
    const clickedIndex = rectangles.findIndex((rectangle) => {
      if (
        e.x > rectangle.x &&
        e.x < rectangle.x + rectangle.width &&
        e.y > rectangle.y &&
        e.y < rectangle.y + rectangle.height
      ) {
        return true
      }
    })

    if (clickedIndex === -1) {
      splitDirectionVertical = !splitDirectionVertical
      return
    }

    const clickedRectangle = rectangles[clickedIndex]

    rectangles.splice(clickedIndex, 1)

    splitRectangleAt(clickedRectangle, {
      x: e.x - clickedRectangle.x,
      y: e.y - clickedRectangle.y,
    })
  }

  function splitRectangleAt(rectangle, position) {
    if (splitDirectionVertical) {
      rectangles.push({
        x: rectangle.x,
        y: rectangle.y,
        width: position.x,
        height: rectangle.height,
        color: getColor(),
      })
      rectangles.push({
        x: rectangle.x + position.x,
        y: rectangle.y,
        width: rectangle.width - position.x,
        height: rectangle.height,
        color: getColor(),
      })
    } else {
      rectangles.push({
        x: rectangle.x,
        y: rectangle.y,
        width: rectangle.width,
        height: position.y,
        color: getColor(),
      })
      rectangles.push({
        x: rectangle.x,
        y: rectangle.y + position.y,
        width: rectangle.width,
        height: rectangle.height - position.y,
        color: getColor(),
      })
    }

    splitDirectionVertical = !splitDirectionVertical
    drawRectangles()
  }

  function getColor() {
    const colors = [
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#EBEBED",
      "#C53632",
      "#3E4984",
      "#F8DD67",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  rectangles.push({
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    color: "#EBEBED",
  })
  drawRectangles()
})()
