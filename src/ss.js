import Util from "./util.js";
import { exec } from "child_process";

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
    console.log("start the ss password:" + password);
    let cmdStr = `ss-local -s ${profile.Host} -p ${
      profile.RemotePort
    } -l 1081 -k ${password} -m ${profile.Method}`;
    this.my_process = exec(
      cmdStr,
      { cwd: __dirname },
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
      console.log("stop the ss");
      this.my_process.kill("SIGKILL");
    }
  }
}

let ssLocal = SSLocal.getInstance();
export default ssLocal;
