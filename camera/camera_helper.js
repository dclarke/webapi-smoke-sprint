function runAll(steps) {
  var index = 0;
  SimpleTest.waitForExplicitFinish();
  function callNext() {
    if (index >= steps.length - 1) {
      steps[index]();
      SimpleTest.finish();
      return;
    }
    debug("index = " + index);
    var func = steps[index];
    index++;
    func(callNext);
  }
  callNext();
}

function gotCamera(camera) {
      this._cameraObj = camera;
}

function getCamera() {
  var cameras = navigator.mozCameras.getListOfCameras();
  var options = {camera: cameras[0]};
  navigator.mozCameras.getCamera(options, gotCamera.bind(this));
  
}

function setUp(next) {
  SpecialPowers.addPermission("camera", true, document);
  next();
}

function tearDown() {
  for (alarm in alarms) {
    navigator.mozAlarms.remove(alarm);
  }
  SpecialPowers.removePermission("camera, true, document);
  SimpleTest.finish();
}

