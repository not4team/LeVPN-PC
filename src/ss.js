const { exec } = require("child_process");
var _process;
export var start = function(profile) {
  var cmdStr =
    "ss-local-x64.exe -s remoteIP -p remotePort -l localPort -k password -m method";
  _process = exec(cmdStr, { cwd: __dirname }, function(err, stdout, stderr) {
    console.log("start the ss");
    if (err) {
      console.log("ss-local error:" + stderr);
    } else {
      console.log(stdout);
    }
  });
  console.log("pid:" + _process.pid);
};
export var stop = function(profile) {
  console.log("stop the ss");
  _process.kill("SIGKILL");
};
