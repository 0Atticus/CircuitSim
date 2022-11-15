//on #c23131
import {switches, gates, Switch, Gate} from "./gates.js";
import {drag} from "./drag.js";

let wires = [];
let connections = [];
export const canvas = document.getElementById('circuit');
export const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
let switchCount = 0;
let gateCount = 0;

export function wireable(el) {

    el.onmousedown = startRope;

    let elRect = el.getBoundingClientRect();
    let x = elRect.left + 7;
    let y = elRect.top + 7;
    


    var x2 = 0, y2 = 0;

    function startRope(e) {
        
        e = e || window.event;
        e.preventDefault();

        document.onmousemove = drawRope;
        document.onkeydown = quitRope;
        
        for (let input of document.getElementsByClassName("input")) {
            input.onclick = endRope;
        }

        elRect = el.getBoundingClientRect();
        x = elRect.left + 7;
        y = elRect.top + 7;
        console.log(x, y);


    }

    function drawRope(e) {
        e = e || window.event;
        e.preventDefault();

        x2 = e.clientX;
        y2 = e.clientY;

        drawWires();
        drawLine(x, y, x2, y2);
    }

    function endRope(e) {
        document.onmousemove = null;
        // loop through all elements with class "input"
        for (let input of document.getElementsByClassName("input")) {
            input.onclick = null;
        }
        var elem = document.elementFromPoint(x2, y2);
        var elemRect = elem.getBoundingClientRect();
        let pair = [el, elem];
        if (wires.includes(pair)) return;
        wires.push(pair);
        connections.push([el.parentElement, elem.parentElement]);

        console.log("connections: ", connections);
        drawWires();
    }


    function quitRope(e) {
        document.onmousemove = null;
        for (let input of document.getElementsByClassName("input")) {
            input.onclick = null;
        }
        drawWires();
    }


}

// function to draw line between two points on canvas
function drawLine(x1, y1, x2, y2) {

    ctx.strokeStyle = "black";
    ctx.width = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

document.body.onload = function() {
    // loop through all elements with class "output"
    for (let output of document.getElementsByClassName("output")) {
        wireable(output);
    }
}

export function drawWires() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let wire of wires) {
        drawLine(wire[0].getBoundingClientRect().left + 7, wire[0].getBoundingClientRect().top + 7, wire[1].getBoundingClientRect().left + 7, wire[1].getBoundingClientRect().top + 7);
    }
}



// when switch-origin is clicked, create switch
document.getElementById("new-switch").onclick = () => createSwitch();


// function to create a new switch
function createSwitch() {
    let s = document.createElement("div");
    s.setAttribute("class", "switch");
    s.setAttribute("value", 0);
    switchCount++;
    document.getElementById("switches").appendChild(s);
    let o = document.createElement("div");
    o.setAttribute("class", "output");
    s.appendChild(o);
    s.id = "s" + switchCount;
    new Switch(s.id);
    s.oncontextmenu = function(e) {
        e.preventDefault();
        flip(s.id);
    }
    wireable(o);
    drawWires();
    
}

function createGate(type) {
    gateCount++;
    let g = document.createElement("div");
    g.className = "gate";
    g.id = "g" + gateCount;
    g.setAttribute("type", type);
    let in1 = document.createElement("div");
    in1.className = "input";
    in1.id = "1";
    let in2 = document.createElement("div");
    in2.className = "input";
    in2.id = "2";
    g.style.backgroundColor = randomColor();
    g.innerHTML = type;
    let out = document.createElement("div");
    out.className = "output";
    g.appendChild(in1);
    g.appendChild(in2);
    g.appendChild(out);
    document.getElementById("page").appendChild(g);
    updateCircuit();
    wireable(out);
    drag(g);
    g.ondblclick = () => drag(g);
}

        
function flip(id) {
    for (let s of switches) {
        if (s.id == id) {
            s.swap();
            document.getElementById(id).setAttribute("value", s.out);
        }
    }
}



function updateCircuit() {
    null;
}





// function to remove an element from an array
function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });

}

// function to return random color
function randomColor() {
    let r = Math.floor(Math.random() * 255).toString(16);
    let g = Math.floor(Math.random() * 255).toString(16);
    let b = Math.floor(Math.random() * 255).toString(16);
    return "#" + r + g + b;
}


document.getElementById("new-and").onclick = () => createGate("AND");