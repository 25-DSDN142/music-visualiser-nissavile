


// vocal, drum, bass, and other are volumes ranging from 0 to 100


let planeX = 0;
let lanternPositions = [];


function draw_one_frame(words, vocal, drum, bass, other, counter) {
 
  
  // convert 0–100 into 0–1
  let v = vocal / 100;
  let b = bass / 100;
  let o = other / 100;

  // map channels to values
  let hillHeight = map(b, 0, 1, 5, height * 0.2);
  let skyHue = map(v, 0, 1, 200, 300);
  let lanterns = int(map(o, 0, 1, 5, 50));
  let planeY = map(v, 0, 1, height * 0.7, height * 0.3);

  // background sky
  colorMode(HSB, 360, 100, 100);
  noStroke();
  for (let y = 0; y < height; y++) {
    let c1 = color(skyHue, 50, 15);
    let c2 = color(skyHue, 50, 5);
    stroke(lerpColor(c1, c2, y / height));
    line(0, y, width, y);
  }
  noStroke();




  // lanterns

  // random lantern positions
if (lanternPositions.length !== lanterns) {
  lanternPositions = [];
  for (let i = 0; i < lanterns; i++) {
    lanternPositions.push({
      x: random(width),
      y: random(height),
      phase: random(TWO_PI) // so they don't all pulse in sync
    });
  }
}

push();
blendMode(ADD); //  glow blending
colorMode(HSB, 360, 100, 100, 100);
noStroke();

for (let i = 0; i < lanternPositions.length; i++) {
  let p = lanternPositions[i];
  
  // make size pulse slowly
  let baseSize = 2;
  let pulse = sin(frameCount * 0.05 + p.phase) * 2; // ±2 pixels
  let size = baseSize + pulse;


let dx = p.x + sin(frameCount*0.005 + p.phase)*4;
let dy = p.y + cos(frameCount*0.004 + p.phase)*3;

  // outer glow
  fill(40, 80, 100, 10); ellipse(dx,dy, size * 4);
  // mid glow
  fill(40, 80, 100, 25); ellipse(dx,dy, size * 2);
  // core
  fill(40, 80, 100, 100); ellipse(dx,dy, size);
}

blendMode(BLEND);
pop();

// BACK HILL 
fill(0, 70, 25); // darker red
beginShape();
for (let x = 0; x <= width; x += 12) {
  let y = height * 0.9 + 
    sin((x * 0.4) + frameCount * 0.1) * map(bass, 0, 100, 10, 60);
  vertex(x, y);
}
vertex(width, height); 
vertex(0, height);
endShape(CLOSE);


  // hills (dark red)
  fill(0, 80, 40); // dark red
  beginShape();
  for (let x = 0; x <= width; x += 10) {
    let y = height * 0.75 + sin((x * 0.2) + frameCount * 0.02) * hillHeight;
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

 // paper plane
planeX = (planeX + 3) % (width + 40);

// plane size based on vocals (v goes from 0..1)
let planeSize = map(0, 100, vocal, 0.8, 1.5); // 0.8x at quiet, 1.5x at loud

push();
translate(planeX - 20, planeY);
scale(planeSize); // apply size change
fill(0, 0, 100);
triangle(-15, 5, -15, -5, 20, 0);
fill(0, 0, 90);
triangle(0, 0, -10, -4, -10, 4);
pop();

// PLANE TRAIL
stroke(0, 0, 100, 25);
noFill();
beginShape();
for (let i = 0; i < 35; i++) {
  let t = i/35;
  let tx = (planeX - 20) - t*120;       // 120px long
  let ty = planeY + sin(frameCount*0.05 - t*4) * 3;
  vertex(tx, ty);
}
endShape();
noStroke();


// display "words"
   textAlign(CENTER);
   textSize(vocal);
   text(words.txt, width/2, height/3);
}


 




































// let colorMap = map(words,0,100,0,400)
//   sunSize=map(drum,0,100,10,400)
//   moonSize=map(vocal,0,100,20,400)
//   templesize=map(other,0,100,10,300)

//   fill(230, colorMap, 108)
//   ellipse(200,sunY,sunSize)

//   fill(117, 116, 110)
//   moonY=moonY+1
//   ellipse(300,moonY,moonSize)

// if(sunY>300){
//    sunY=20
// }
//   if(moonY > 1000){
//    moonY=0
//   }

//   if(templeY>300){
//     templeY=0
//   }

//   fill(230, colorMap, 108)
//   triangle(100,20,templeY,templeY)


//      // display "words"
//    textAlign(CENTER);
//    textSize(drum);
//    text(words, width/2, height/3);


