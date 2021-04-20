/**
 * Game of Life implementation using vanilla JavaScript
 * Copyright (C) Dmitry Sekhno, 2021
 */

require.config({
    baseUrl: '',
    paths: {}
});

define(['./app/game.js'], function (ArkanoidGame) {
    var arkanoidGame;
    var reqId;

    // checkCanvasIsSupported()
    innerCanvas(function (canvas) {
        innerStartPage(canvas);

        document.onkeydown = function(event) {
            var keyCode;
            if (event == null) {
                keyCode = window.event.keyCode;
            } else {
                keyCode = event.keyCode;
            }
            switch (keyCode) {
                case KeyCodes.SPACE:
                    arkanoidGame.togglePause();
                    break;
                default:
                    break;
            }
        }
        
        document.onmousemove = function(event) {
            arkanoidGame.setPaddlePos(event.pageX);
        }
        
        document.onclick = function(){
            cancelAnimationFrame(reqId);
            innerCanvas(function(canvas){
                checkCanvasIsSupported();
                arkanoidGame.startGame();
            })
            
            
        }
        // checkCanvasIsSupported()
    });

    /**
     * @function checkCanvasIsSupported
     * 
     */
    function checkCanvasIsSupported() {
        canvas = document.getElementById("gameCanvas");
        canvas.width = 640;
        canvas.height = 480;
        canvas.style.cursor = "none";
        if (canvas.getContext) {
            context = canvas.getContext('2d');

            arkanoidGame = new ArkanoidGame(canvas, context);
            arkanoidGame.init();

            setInterval(render, 1000 / 60);
        } else {
            alert("Sorry, but your browser doesn't support a canvas.");
        }
    }

    /**
     * @function innerCanvas
     * @param {Function} cb 
     * @returns {HTMLCanvasElement} canvas
     */
    function innerCanvas(cb){
        var table = document.createElement("table"),
            td = document.createElement("td"),
            tr = document.createElement("tr"),
            canvas = document.createElement("canvas");
        table.appendChild(tr);
        tr.appendChild(td);
        canvas.setAttribute("id", "gameCanvas");
        td.appendChild(canvas);
        document.body.appendChild(table)
        if (typeof cb === 'function') cb(canvas)
    }

    /**
     * @function innerStartPage
     * @param {Function} cb 
     * @returns void
     */
    function innerStartPage(canvas){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (canvas.getContext) {
            context = canvas.getContext('2d');

            var maxDist = 100;
            var nodes = [];

            for (var i = 0; i < maxDist; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: Math.random() * 2 - 1,
                    vy: Math.random() * 2 - 1
                })
            }

            var update = function(){
                var width = canvas.width,
                    height = canvas.height;
                context.clearRect(0, 0, width, height);
                for (var i = 0; i < maxDist; i++) {
                    var node = nodes[i];
                    node.x += node.vx;
                    node.y += node.vy;
                    if (node.x > width) {
                        node.x = 0
                    }
                    else if (node.x < 0) {
                        node.x = width;
                    }
                    if (node.y > height) {
                        node.y = 0;
                    }
                    else if (node.y < 0) {
                        node.y = height;
                    }
                    context.beginPath();
                    context.arc(node.x, node.y, 2, 0, Math.PI * 2);
                    context.fill();
                }

                for(var i = 0; i < nodes.length - 1; i++) {
                    var nodeA = nodes[i];
                    for(var j = i + 1; j < nodes.length; j++) {
                        var nodeB = nodes[j];
                        var dx = nodeB.x - nodeA.x,
                            dy = nodeB.y - nodeA.y,
                            dist = Math.sqrt(dx * dx + dy * dy);
                        if(dist < maxDist) {
                            context.lineWidth = 1 - dist / maxDist;
                            context.beginPath();
                            context.moveTo(nodeA.x, nodeA.y);
                            context.lineTo(nodeB.x, nodeB.y);
                            context.stroke();
                        }
                    }
                }

                context.font = "48px monospace";
                context.textAlign = 'center'
                context.fillText("Arkanoid", width/2, height/2)
                reqId = requestAnimationFrame(update)

            }

            update()
        } else {
            alert("Sorry, but your browser doesn't support a canvas.");
        }
    }

    /**
     * @function render
     */
    function render() {
        arkanoidGame.render();
    }

    /**
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    function getRandomRange(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    /**
     * @constant
     */
     const KeyCodes = {
        SPACE : 32
    };


    
 
})

