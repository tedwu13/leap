visualizeHand = function(controller) {
  controller
  .use('handHold', {})
  .use('handEntry', {})
  .use('riggedHand', {

    materialOptions: {
      wireframe: true
    },

    geometryOptions: {},

    dotsMode: true,

    offset: new THREE.Vector3(0,0,0),

    scale: 1.5,

    positionScale: 2,

    boneLabels: function(boneMesh, leapHand) {
        return boneMesh.name;
    },

    boneColors: function(boneMesh, leapHand) {
        if ((boneMesh.name.indexOf('Finger_0') == 0) || (boneMesh.name.indexOf('Finger_1') == 0)) {
            return {
                hue: 0.6,
                saturation: leapHand.pinchStrength
            }
        }
    },

    checkWebGL: true

  });

} 
