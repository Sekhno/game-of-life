/**
 * Game of Life implementation using vanilla JavaScript
 * Copyright (C) Dmitry Sekhno, 2021
 */

require.config({
    baseUrl: '',
    paths: {}
});

define(['./app/game.js'], function (ArkanoidGame) {
    // var game = new Game();
    // game.init()
    // document.addEventListener('DOMContentLoaded', function(){
    //     checkCanvasIsSupported()
    // })
    var arkanoidGame;

    checkCanvasIsSupported()

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

    function render() {
        arkanoidGame.render();
    }

    /**
     * @constant
     */
     const KeyCodes = {
        SPACE : 32
    };


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
        arkanoidGame.startGame();
    }
 
})

