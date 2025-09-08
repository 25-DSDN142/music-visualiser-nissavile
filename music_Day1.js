
let planeX = 0;
let lanternPositions = [];
let lanternPositions2 = [];

// super light smoothing for channels (0..1)
let sV = 0, sB = 0, sD = 0, sO = 0;




function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // normalised channels
  let v = vocal / 100;
  let b = bass  / 100;
  let d = drum  / 100;
  let o = other / 100;

  // smooth them
  sV = lerp(sV, v, 0.12);
  sB = lerp(sB, b, 0.12);
  sD = lerp(sD, d, 0.12);
  sO = lerp(sO, o, 0.12);

  // mappings
  let skyHue   = map(sV, 0, 1, 200, 300);
  let planeY   = map(sV, 0, 1, height * 0.70, height * 0.32);
  let lanterns = int(map(sO, 0, 1, 8, 28)); 

  // background sky
  colorMode(HSB, 360, 100, 100);
  noStroke();
  for (let y = 0; y < height; y++) {
    let c1 = color(skyHue, 50, 25);
    let c2 = color(skyHue, 50, 10);
    stroke(lerpColor(c1, c2, y / height));
    line(0, y, width, y);
  }
  noStroke();

  // LANTERNS (scattered + calm glow)
  if (lanternPositions.length !== lanterns) {
    lanternPositions = [];
    for (let i = 0; i < lanterns; i++) {
      lanternPositions.push({
        x: random(width),
        y: random(height),
        phase: random(TWO_PI)
      });
    }
  }

  push();
  blendMode(ADD);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  for (let i = 0; i < lanternPositions.length; i++) {
    let p = lanternPositions[i];
  
    let dx = p.x + sin(frameCount * 0.004 + p.phase) * 3;
    let dy = p.y + cos(frameCount * 0.003 + p.phase) * 2;

    // pulse size 
    let baseSize = 2.5;
    let pulse = sin(frameCount * 0.03 + p.phase) * 1; // ±1 px
    let size = baseSize + pulse;

    // glow layers
    fill(40, 80, 100, 10); ellipse(dx, dy, size * 4);
    fill(40, 80, 100, 22); ellipse(dx, dy, size * 2);
    fill(40, 80, 100, 95); ellipse(dx, dy, size);
  }
  blendMode(BLEND);
  pop();

let lanterns2 = int(map(d, 0, 1, 4, 20));    // count from drums

if (lanternPositions2.length !== lanterns2) {
  lanternPositions2 = [];
  for (let i = 0; i < lanterns2; i++) {
    lanternPositions2.push({
      x: random(width),
      y: random(height), 
      phase: random(TWO_PI)
    });
  }
}

push();
blendMode(ADD);
colorMode(HSB, 360, 100, 100, 100);
noStroke();

for (let i = 0; i < lanternPositions2.length; i++) {
  const p = lanternPositions2[i];

  // bigger + different pulse speed
  const baseSize = 6;
  const pulse    = sin(frameCount * 0.02 + p.phase) * 3; 
  const size     = baseSize + pulse;

  
  const a = 15 + d * 40;

  // (warm gold)
  fill(40, 80, 100, a * 0.35); ellipse(p.x, p.y, size * 4);
  fill(40, 80, 100, a * 0.7);  ellipse(p.x, p.y, size * 2);
  fill(40, 80, 100, 95);       ellipse(p.x, p.y, size);
}

blendMode(BLEND);
pop();

//  MOON 
// position
let moonX = width * 0.8;
let moonY = height * 0.1;

// size: base + pulse
let baseMoon = 80; // base diameter
let moonPulse = sin(frameCount * 0.9) * 15; // smooth in/out
let moonSize = baseMoon + moonPulse;

// outer glow
noStroke();
fill(0, 0, 100, 20); // faint white
ellipse(moonX, moonY, moonSize * 1.8);

// mid glow
fill(0, 0, 100, 40);
ellipse(moonX, moonY, moonSize * 1.4);

// core
fill(0, 0, 100, 100); 
ellipse(moonX, moonY, moonSize);

 

  // BACK HILL 
  fill(0, 70, 25);
  beginShape();
  let baseFront = height * 0.74;                 // front hill baseline
  let ampFront  = map(sB, 0, 1, 8, height*0.16); // max ~16% of height
  for (let x = 0; x <= width; x += 10) {
    let nx = x * 0.005 + frameCount * 0.006;     // slightly faster noise
    let y  = baseFront + (noise(nx + 1000) - 0.5) * 2 * ampFront;
    vertex(x, y);
  }
  vertex(width, height); vertex(0, height);
  endShape(CLOSE);

   // FRONT HILL 
  fill(0, 80, 40);
  beginShape();
  let baseBack = height * 0.82;                 // sit higher so not hidden
  let ampBack  = map(sB, 0, 1, 6, height*0.08); // gentle
  for (let x = 0; x <= width; x += 12) {
    let nx = x * 0.003 + frameCount * 0.004;    // slow noise
    let y  = baseBack + (noise(nx) - 0.5) * 2 * ampBack;
    vertex(x, y);
  }
  vertex(width, height); vertex(0, height);
  endShape(CLOSE);
  
   //paper plane
  planeX = (planeX + 3) % (width + 40);

  // plane size based on vocals (v goes from 0–1)
  let planeSize = map(vocal, 0, 100, 1, 5); // 0.8x at quiet, 1.5x at loud

  push();
  translate(planeX - 20, planeY);
  scale(planeSize); 
  fill(0, 0, 100);
  triangle(-15, 5, -15, -5, 20, 0);
  fill(0, 0, 90);
  triangle(0, 0, -10, 4, -10, 0);
  pop();

  // display "words"
   textAlign(CENTER);
   textSize(vocal);
   text(words, width/2, height/3);
}
























 

































