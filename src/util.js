const key = "aljgla.mgh98570fdg;ghjksirl76jnf";
const iv = new Uint8Array([
  0x00,
  0x01,
  0x02,
  0x03,
  0x04,
  0x05,
  0x06,
  0x07,
  0x08,
  0x09,
  0x0a,
  0x0b,
  0x0c,
  0x0d,
  0x0e,
  0x0f
]);

let util = {};

util.aesDecrypter = text => {
  var crypto = require("crypto");
  let clearEncoding = "utf8";
  let cipherEncoding = "base64";
  let cipherChunks = [];
  let decipher = crypto.createDecipheriv("aes-256-cfb", key, iv);
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(text, cipherEncoding, clearEncoding));
  cipherChunks.push(decipher.final(clearEncoding));
  return cipherChunks.join("");
};

util.testConnection = callback => {
  var shttps = require("socks5-https-client");
  shttps
    .get(
      {
        hostname: "www.google.com",
        path: "/",
        socksHost: "127.0.0.1",
        socksPort: "1081",
        rejectUnauthorized: true // This is the default.
      },
      function(res) {
        res.setEncoding("utf8");
        console.log("res status code:" + res.statusCode);
        if (res.statusCode == 200) {
          callback("success");
        } else {
          callback("fail");
        }
        // res.on("readable", function() {
        //   console.log(res.read()); // Log response to console.
        // });
      }
    )
    .on("error", e => {
      if (e) {
        console.error("test connection error:" + e);
        callback("fail");
      }
    });
};

util.killByPid = pid => {
  let kill = require("tree-kill");
  kill(pid);
};

util.killByName = name => {
  let cmd = process.platform == "win32" ? "tasklist" : "ps aux";
  let exec = require("child_process").exec;
  console.log("killByName:" + name + ",cmd:" + cmd);
  exec(cmd, function(err, stdout, stderr) {
    if (err) {
      console.log("==============");
      return console.log(err);
    }
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    stdout.split("\n").filter(function(line) {
      let p = line.trim().split(/\s+/);
      let pname = process.platform == "win32" ? p[0] : p[10];
      let pid = p[1];
      if (pname.toLowerCase().indexOf(name) >= 0 && parseInt(pid)) {
        console.log(pname, pid);
        util.killByPid(pid);
      }
    });
  });
};

export default util;
