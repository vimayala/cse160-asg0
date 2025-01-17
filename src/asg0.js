// DrawRectangle.js
function main() {
  // Retrieve <canvas> element                                  <- (1)
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context for 2DCG                          <- (2)
  ctx = canvas.getContext('2d');

  // Call for a blank canvas
  clearCanvas();
}


function clearCanvas() {
  // Clear the canvas of previous vector(s)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add the background back
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(v, color){
  // Set color to inputted color
  ctx.strokeStyle = color;

  let cx = canvas.width/2;
  let cy = canvas.height/2;
  
  // Set the scale and vector values 
  const scale = 20;
  const vx = v.elements[0] * scale;
  const vy = v.elements[1] * scale;

  // Draw the vector from the canvas center
  ctx.beginPath();
  ctx.moveTo(cx, cy); // Start at the center of the canvas
  ctx.lineTo(cx + vx, cy - vy); // Draw to the scaled vector endpoint
  ctx.stroke();
}


function handleDrawEvent(){
  // Call clearCanvas to set up new canvas
  clearCanvas();
  
  // Get the input values from x and y for v1
  v1XVal = document.getElementById("x").value;
  v1YVal = document.getElementById("y").value;

  // Get the input values from x and y for v2
  v2XVal = document.getElementById("xV2").value;
  v2YVal = document.getElementById("yV2").value;


  // Use inputs as xVal and yVal of vector(s)
  v1 = new Vector3({ 0: v1XVal, 1: v1YVal, 2: 0});
  v2 = new Vector3({ 0: v2XVal, 1: v2YVal, 2: 0});

  // Draw both vectors
  drawVector(v1, "red")
  drawVector(v2, "blue")
}

function handleDrawOperationEvent(){
  // Redraw the v1 and v2 vectors
  handleDrawEvent();

  // Get the operation selection and scalar input
  op = document.getElementById('operations').value;
  scalar = document.getElementById('scalar').value;

  let v3 = new Vector3({ 0: v1XVal, 1: v1YVal});
  let v4 = new Vector3({ 0: v2XVal, 1: v2YVal});


  // Check operation
  // Then, perform operation and draw/output
  if(op == "add"){
    v3.add(v2)
    drawVector(v3, "green");
  }
  else if(op == "sub"){
    v3.sub(v2)
    drawVector(v3, "green");
  }
  else if(op == "mul"){
    v3.mul(scalar)
    v4.mul(scalar)
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if(op == "div"){
    v3.div(scalar)
    v4.div(scalar)
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if(op == "area"){
    findArea(v1, v2);
  }
  else if(op == "deg"){
    angleBetween(v1, v2);
  }
  else if(op == "mag"){
    // Method used for rounding: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

    console.log("Magnitude v1: " + Math.round(v3.magnitude() * 100) / 100)
    console.log("Magnitude v2: " + Math.round(v4.magnitude() * 100) / 100)
  }

  else if(op == "norm"){
    v3.normalize()
    v4.normalize()
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
}

function angleBetween(vec1, vec2){
  // Find dot product
  let dot = Vector3.dot(vec1, vec2)
  // Get magnitude
  let m = vec1.magnitude() * vec2.magnitude();
  // Get angle in degrees
  // Method used for rounding: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  console.log("Angle: " + Math.round((Math.acos(dot / m) * 180)/Math.PI * 100) / 100);
}

function findArea(vec1, vec2){
  // Get cross product, find new vector's magnitude, use to get area
  let cross = Vector3.cross(vec1, vec2)
  let mgntd = cross.magnitude()
  console.log("Area of the triangle: " + mgntd /  2);
}
