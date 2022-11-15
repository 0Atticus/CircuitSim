import {ctx, canvas, drawWires} from "./script.js";
export function drag(obj) {
    let x = obj.offsetLeft, y = obj.offsetTop, x2 = 0, y2 = 0;


    document.onmousemove = move;

    document.onmousedown = function() {
        document.onmousemove = null;
        document.onmousedown = null;
    }

    function move(e) {
        e = e || window.event;
        e.preventDefault();


        x2 = x - e.clientX;
        y2 = y - e.clientY;

        x = e.clientX;
        y = e.clientY;

        obj.style.top = (obj.offsetTop - y2) + 'px';
        obj.style.left = (obj.offsetLeft - x2) + 'px';
        drawWires();

    }


}