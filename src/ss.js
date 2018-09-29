import Util from "./util.js";
//child_process.execFile() 函数类似 child_process.exec()，除了不衍生一个 shell。
//而是，指定的可执行的 file 被直接衍生为一个新进程，这使得它比 child_process.exec() 更高效。
import { execFile } from "child_process";

export class SSLocal {
  constructor() {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new SSLocal();
    }
    return this.instance;
  }
  start(profile) {
    let password = Util.aesDecrypter(profile.Password);
    console.log("start the ss password:" + password + ",cwd:" + process.cwd());
    let cmdStr = "";
    switch (process.platform) {
      case "win32":
        cmdStr = `ss-local-x64.exe`;
        break;
      default:
        cmdStr = `ss-local`;
        break;
    }
    this.my_process = execFile(
      cmdStr,
      [
        "-s",
        profile.Host,
        "-p",
        profile.RemotePort,
        "-l",
        "1081",
        "-k",
        password,
        "-m",
        profile.Method
      ],
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    );
    console.log("pid:" + this.my_process.pid);
  }

  stop() {
    if (this.my_process) {
      console.log("stop the ss:" + this.my_process.pid);
      this.my_process.kill("SIGTERM");
      // Util.killByPid(this.my_process.pid);
    }
  }
}

let ssLocal = SSLocal.getInstance();
export default ssLocal;
