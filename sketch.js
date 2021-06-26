let facemesh;
let video;
let predictions = [];
let face;
let sil;

function setup() {
  // createCanvas(640, 480);
  // createCanvas(1024, 768);
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  // video.size(1024, 768);
  // video.size(windowWidth, windowHeight);
  facemesh = ml5.facemesh(video, modelReady);
 
  facemesh.on("predict", (results) => {
    predictions = results;
  });
  video.hide();
  face = new Face();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  // background(0);
  // scale(1.5);
  image(video, 0, 0, width, height);
  
  drawKeypoints();
}

function drawKeypoints() {
  background(0, 0, 0, 150);
  for (let i = 0; i < predictions.length; i += 1) {
    sil = predictions[i].annotations;
    noStroke();
    // scale(1.2);
    // fill(0, 0, 0, 255);
    // face.silhouette2();
    
    // scale(1.0);
    fill(255, 255, 255, 150); //얼굴 윤곽 rgb+투명도
    face.silhouette(); 
    
    fill(0,0,0, 50); //입술 rgb+투명도
    face.lips();
    
    fill(0,0,0, 50); //오른쪽 눈 꺼풀 rgb+투명도
    face.rightEyeUpper();
    
    fill(0,0,0, 50); //오른쪽 눈 아래 rgb+투명도 
    face.rightEyeLower(); //눈바로아래
    
    fill(255,0,255, 50); //오른쪽 눈 아래 rgb+투명도
    face.rightEyeLower2();
    
    fill(0, 0, 0, 50);
    face.rightEyebrow();
    
    face.rightCheeck();
    
    
    fill(0,0,0, 50); //왼쪽 눈 꺼풀 rgb+투명도
    face.leftEyeUpper();
    
    fill(0,0,0, 50); //왼쪽 눈 아래 rgb+투명도
    face.leftEyeLower(); //눈 바로아래
    
    fill(255,0,255, 50); //왼쪽 눈 아래 rgb+투명도
    face.leftEyeLower2();
    
    fill(0, 0, 0, 50);
    face.leftEyebrow();
    
    face.leftCheeck();

    //볼 좌우 연지곤지(수정필요)noseLeftCorner: Array[1]
    ellipse(sil.rightCheek[0][0]*(windowWidth/640), sil.rightCheek[0][1]*(windowHeight/480), 20 , 20); 
    ellipse(sil.leftCheek[0][0]*(windowWidth/640), sil.leftCheek[0][1]*(windowHeight/480), 20 , 20);
    
    ellipse(sil.noseRightCorner[0][0]*(windowWidth/640), sil.noseRightCorner[0][1]*(windowHeight/480), 20 , 20); 
    ellipse(sil.noseLeftCorner[0][0]*(windowWidth/640), sil.noseLeftCorner[0][1]*(windowHeight/480), 20 , 20);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}