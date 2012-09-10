var alarms = []; 

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

function setUp(next) {
  SpecialPowers.pushPrefEnv({"set": [["dom.mozAlarms.enabled", true]]}, function() {
    SpecialPowers.removePermission("alarms", document);
    next();
  };
}

function tearDown() {
  for (alarm in alarms) {
    navigator.mozAlarms.remove(alarm);
  }
  SimpleTest.finish();
}

