var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=300;
var HEIGHT=20;
var FACTOR = 1500;  //Amplification factor
var rafID = null;
var FrameRate = 5 ; 
var RefreshTime = 1000/ FrameRate; 
var StartBtn = document.querySelector('#StartBtn');

var demo = document.getElementById('demo');
        vumeter(demo, {
          "boxCount": 10,
          "boxGapFraction": 0.25,
          "max": 100,
        });

// var volume_value = document.querySelector('#volume_value');

function StartMeter() {

    // grab our canvas
	// canvasContext = document.getElementById( "AudioGraph" ).getContext("2d");
	
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}


function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
    drawLoop();
}
function drawLoop( ) {
    setTimeout( function(){
        // console.log("xzjczjxcnzxkc " + meter.volume * FACTOR );
        demo.setAttribute('data-val',meter.volume * FACTOR );
    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
    },RefreshTime);
}