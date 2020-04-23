var m, b;

var canvasW = innerWidth/2 - 30, canvasH = innerWidth/2 - 30;

var points = [], identifiedPoints = [], numberOfPoints = 50;

var perceptron;

var bias = 1;


function setup(){
    // m = -1;
    // b = canvasH;
    m = 4 - (Math.random()* 8);
    b = Math.random() * canvasH;

    perceptron = new Perceptron(3, Math.sign);

    let cnv = createCanvas(canvasW, canvasH);
    cnv.parent("mainCanvas");
    background(0);
    drawLine();
    
    for(let i = 0; i < numberOfPoints; i++){
        addPoint();
    }
    drawPredictedLine();
    // assesPoints();
    showWeights();
    showPoints();
    showEquation();
    let slopeRange = document.getElementById("slope");
    slopeRange.min = -4;
    slopeRange.max = 4;
    slopeRange.step = 0.01;
    slopeRange.value = m;
    
    let yIntRange = document.getElementById("yInt");
    yIntRange.min = 0;
    yIntRange.max = canvasH;
    yIntRange.step = 5;
    yIntRange.value = b;
}

function changedVariables(){
    let slopeRange = document.getElementById("slope");
    let yIntRange = document.getElementById("yInt");
    m = parseFloat(slopeRange.value);
    b = parseFloat(yIntRange.value);
    showWeights();
    background(0);
    assesPoints();
    showPoints();
    drawLine();
    drawPredictedLine();
    showEquation();
    noLoop();
}

function drawLine(){
    strokeWeight(1);
    stroke(255);
    line(0, canvasH - b, canvasW, canvasH -( m*canvasW+b));
}

function drawPredictedLine(){
    strokeWeight(3);
    let w = perceptron.getWeights();;
    stroke(200, 200, 255);
    line(0, canvasH + (w[2]/w[1])*canvasH, canvasW, canvasH - ((-(w[2]/w[1])*canvasH - (w[0]/w[1])*canvasW)));
    console.log
}

function getLineY(x){
    return m*x+b/canvasH;
}

function addPoint(){
    let newPoint = {x: Math.random(), y: Math.random(), above: 1};
    if(newPoint.y > getLineY(newPoint.x)){
        newPoint.above = 1;
    }else{
        newPoint.above = -1;
    }
    points.push(newPoint);
    noLoop();
}

function showWeights(){
    let weightsLabel = document.getElementById("weights");
    weightsLabel.innerHTML = perceptron.getWeights().toString();
}

function showEquation(){
    let equeLabel = document.getElementById("equation");
    equeLabel.innerHTML = `y = ${m}x + ${b}`;
    
    let w = perceptron.getWeights();;

    let predequeLabel = document.getElementById("predeque");
    predequeLabel.innerHTML = `y = ${-(w[0]/w[1])}x + ${-canvasH * (w[2]/w[1])}`;
}

function assesPoints(){
    for(let point of points){
        if(point.y > getLineY(point.x)){
            point.above = 1;
        }else{
            point.above = -1;
        }
    }
}

function showPoints(){
    let numCorrect = 0;
    for(let point of points){
        if(point.above === 1){
            stroke(255, 0, 0);
        }else{
            stroke(0, 0, 255);
        }
        let prediction = perceptron.predict([point.x, point.y, bias]);
        // console.log(prediction);
        if(prediction === 1){
            fill(255, 0, 0);
        }else{
            fill(0, 0, 255);
        }

        if(prediction === point.above){
            // console.log(prediction, point.above);
            numCorrect++;
        }
        circle(point.x * canvasW, canvasH - (point.y * canvasH), 8);
    }
    if(numCorrect === numberOfPoints){
        noLoop();
        console.log("All correct");
    }
}

function trainModel(){
    // let randPoint = points[Math.floor(points.length * Math.random())];
    // perceptron.train([randPoint.x, randPoint.y], randPoint.above);
    
    for(let i = 0; i < points.length; i++){
        perceptron.train([points[i].x, points[i].y, bias], points[i].above);
    }
    showWeights();
    showEquation();
    background(0)
    showPoints();
    drawLine();
    drawPredictedLine();
}

function autoTrain(){
    draw = () => {
        trainModel();
    }
    loop();
}

function mouseClicked(){
    let newPoint = {x: mouseX/canvasW, y: (canvasH - mouseY)/canvasH, above: 1};
    if(newPoint.y > getLineY(newPoint.x)){
        newPoint.above = 1;
    }else{
        newPoint.above = -1;
    }
    points.push(newPoint);
    showPoints();
    
}