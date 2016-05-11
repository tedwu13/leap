// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

var leftSwipeReady = true;
var rightSwipeReady = true;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var controller = Leap.loop(controllerOptions, function(frame) {
    if (paused) {
        return; 
    }

    var hand1 = frame.hands[0];
    var hand2 = frame.hands[1];
    
    if (!hand1 && !hand2) return;

    var currentFrame = frame;
    var previousFrame = controller.frame(1);

  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];

      //Control Volume
      var palmPosition = hand.palmPosition[1];
      position = Math.round(palmPosition / 5.0);

      if (position > 100 || position < 0) {
        player.setVolume(50);
        moveBar(50);
      }
      else {
        player.setVolume(position);
        moveBar(position);
      }


      //Pause Video
      if(hand.type == "left") {
        player.pauseVideo();
        player.mute();
        document.getElementById("commands").innerHTML = "PAUSE VIDEO";

      }

      //Play Video
      if(hand.type == 'right') {
        player.playVideo();
        player.unMute();

        var v1x = hand1.palmVelocity[0];

        if(v1x < -1000 && leftSwipeReady) {
          playPreviousVideo();
          leftSwipeReady = false;
          document.getElementById("commands").innerHTML = "PREVIOUS VIDEO";
        } 
        else if (v1x > 0) {
          leftSwipeReady = true;
        }

        if(v1x > 1000 && rightSwipeReady) {
          playNextVideo();
          rightSwipeReady = false;
          document.getElementById("commands").innerHTML = "NEXT VIDEO";

        }
        else if (v1x < 0) {
          rightSwipeReady = true;
        }

        // console.log(hand.palmNormal[]);

        // var palm_x = hand1.palmNormal[0];

        // console.log(palm_x);
        // console.log(player.getPlaybackRate());

        // if(palm_x > 0) {
        //   player.setPlaybackRate(2);
        // } 
        // else if (palm_x < -0.65 && palm_x > -0.99) {
        //   player.setPlaybackRate(0.5) 
        // }
        // else {
        //   player.setPlaybackRate(1);
        // }

        // if(hand.pinchStrength >= 0.9){
        //     console.log(hand.pinchStrength);
        //     var pinchingFinger = findPinchingFinger(hand);
        //     switch(pinchingFinger.type) {
        //       case 1:
        //         console.log("index finger");
        //         player.setPlaybackRate(0.5);
        //         break;
        //       case 2:
        //         console.log("middle");
        //         player.setPlaybackRate(1);
        //         break;
        //       case 3:
        //         console.log("ring");
        //         player.setPlaybackRate(2);
        //         break;
        //       case 4:
        //         break;

        //     }
        // }
        // // control playback rate from 1~3 using pinching motion 
        if(hand.pinchStrength > 0.3 && hand.pinchStrength < 0.6) {
          player.setPlaybackRate(1.5);
          document.getElementById("speed").innerHTML = "1.5";

        }
        else if (hand.pinchStrength > 0.8 && hand.pinchStrength < 1.01) {
          player.setPlaybackRate(2);
          document.getElementById("speed").innerHTML = "2";
        }
        else {
          player.setPlaybackRate(1);
          document.getElementById("speed").innerHTML = "1";
        }

      }

    }
  }

  // Display Gesture object data
  var gestureOutput = document.getElementById("gestureData");
  var gestureString = "";
  if (frame.gestures.length > 0) {
    if (pauseOnGesture) {
      togglePause();
    }

    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      // var state = gesture.state;
      // var circleProgress = gesture.progress;
      // var completeCircles = Math.floor(circleProgress);

      switch (gesture.type) {
        case "circle":
          // // check direction
          // var clockwise = false;
          // var pointableID = gesture.pointableIds[0];
          // var direction = frame.pointable(pointableID).direction;
          // var dotProduct = Leap.vec3.dot(direction, gesture.normal);
          // if (dotProduct  >  0) clockwise = true;

          // if (completeCircles >= 1 && state=="update"){
          //   if (clockwise){
          //     fasterSpeed();
          //     console.log("faster");
          //   }
          //   if (!clockwise){
          //     slowerSpeed();
          //     console.log("slower");
          //   }
          // }
            break;
        case "swipe":
          break;
        case "screenTap":
        case "keyTap":
          gestureString += "position: " + vectorToString(gesture.position) + " mm";
          break;
        default:
          gestureString += "unknown gesture type";
      }
      gestureString += "<br />";
    }
  }
  else {
    gestureString += "No gestures";
  }
  // gestureOutput.innerHTML = gestureString;

  // Store frame for motion functions
  previousFrame = frame;
});


function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function playNextVideo(hand) {
    player.nextVideo();
}
function playPreviousVideo(hand) {
    player.previousVideo();
}

function findPinchingFinger(hand){
    var pincher;
    var closest = 500;
    for(var f = 1; f < 5; f++)
    {
        current = hand.fingers[f];
        distance = Leap.vec3.distance(hand.thumb.tipPosition, current.tipPosition);
        if(current != hand.thumb && distance < closest)
        {
            closest = distance;
            pincher = current; 
        }
    } 
    return pincher;
} 
function moveBar(position) {
    var elem = document.getElementById("volumeBar"); 

    if (position >= 100) {
        elem.style.width = '50%';
    } else {
        elem.style.width = position + '%'; 
        document.getElementById('label').innerHTML = position * 1;
    }


}
// // Adds the rigged hand plugin to the controller
visualizeHand = function(controller){

  controller.use('playback').on('riggedHand.meshAdded', function(handMesh, leapHand){
    handMesh.material.opacity = 0.8;
  });

  var overlay = controller.plugins.playback.player.overlay;
  overlay.style.right = 0;
  overlay.style.left = 'auto';
  overlay.style.top = 'auto';
  overlay.style.padding = 0;
  overlay.style.bottom = '2px';
  overlay.style.width = '80px';


  controller.use('riggedHand', {
    scale: 0.8,
    boneColors: function (boneMesh, leapHand){
      if (boneMesh.name.indexOf('Finger_') == 0){
        if ((boneMesh.name.indexOf('Finger_0') == 0) || (boneMesh.name.indexOf('Finger_1') == 0)) {
                  return {
                    hue: 0.33,
                    saturation: leapHand.pinchStrength,
                    lightness: 0.5
                  }
        }


        return {
          hue: 0.55,
          saturation: leapHand.grabStrength,
          lightness: 0.5
        }
      }

    }
  });

  var camera = controller.plugins.riggedHand.camera;
  // camera.position.set(0,10,-25);
  // camera.lookAt(new THREE.Vector3(0,3,0));
  camera.position.set(0,10,-25);
  camera.lookAt(new THREE.Vector3(0,3,0));
};

visualizeHand(Leap.loopController);
