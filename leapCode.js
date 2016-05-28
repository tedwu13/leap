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
        controlVolume(hand);
        
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
            } else if (v1x > 0) {
                leftSwipeReady = true;
            }

            if(v1x > 1000 && rightSwipeReady) {
                playNextVideo();
                rightSwipeReady = false;
                document.getElementById("commands").innerHTML = "NEXT VIDEO";
            } else if (v1x < 0) {
                rightSwipeReady = true;
            }


            // Fast forward/control speed
            setPlaybackSpeed(hand);

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
      switch (gesture.type) {
        case "circle":
            break;
        case "swipe":
          break;
        case "screenTap":
        case "keyTap":
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
  // Store frame for motion functions
  previousFrame = frame;
});


function controlVolume(hand) {
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

function setPlaybackSpeed(hand) {
    if(hand.pinchStrength > 0.5) {
        player.setPlaybackRate(1.5);
        document.getElementById("speed").innerHTML = "1.5";

    }
    else {
        player.setPlaybackRate(1);
        document.getElementById("speed").innerHTML = "1";
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
  camera.position.set(0,10,-25);
  camera.lookAt(new THREE.Vector3(0,3,0));
};

visualizeHand(Leap.loopController);
