import { defineStore } from 'pinia';
import { loadPyodide } from 'pyodide';

const preCode = '\nsys.stdout = sys.stderr = StringIO()\nimport time;time.sleep = lambda x: None';
const postCode = `import sys, io, base64;__oString = sys.stdout.getvalue()`

export const usePyodideStore = defineStore('pyodide', {
  state: () => ({
    pyodide: null,
    micropip: null,
    initialized: false,
    isRunningPython: false,
  }),
  actions: {
    async initialize(pipDependency) {
    /**
     * Supported Built in Dependency, see: https://pyodide.org/en/stable/usage/packages-in-pyodide.html
     */
      if (!this.initialized) {
        this.pyodide = await loadPyodide({
          indexURL: 'https://jsd.onmicrosoft.cn/pyodide/v0.26.2/full/',
        });
        // await this.pyodide.loadPackage(["micropip"]);
        // this.micropip = this.pyodide.pyimport("micropip");
        // await this.micropip.install(pipDependency);
        console.log("Dependencies Ready!")
        this.pyodide.runPython(`import sys;from io import StringIO;\n${preCode}`);
        this.initialized = true;
      }
      console.log("Initialised Pyodide Store")
    },
    async installDependency(pipDependency){
      if (!this.initialized) {
        await this.micropip.install(pipDependency);
      }
    },
    async runPython(code) {
      let stdout = [];
      let stderr = [];

      // 重定向标准输出
      this.pyodide.setStdout({
        batched: (text) => {
          stdout.push(text);
        }
      });
      
      // 重定向标准错误
      this.pyodide.setStderr({
        batched: (text) => {
          stderr.push(text);
        }
      });
      // 执行 Python 代码
      let result = this.pyodide.runPython(code);

      // 捕获返回结果
      if (result !== undefined) {
        stdout.push(result);
      }

      // 构造显示内容
      if (stderr.length > 0) {
        return stderr.join('<br>')
      }else{
        return stdout.join('<br>');
      }
    },
  },
});
