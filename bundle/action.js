"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/action.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_child_process = require("child_process");

// info.json
var info_default = [
  {
    name: "bun",
    install: "https://github.com/oven-sh/setup-bun",
    description: "Incredibly fast JavaScript runtime, bundler, test runner, and package manager \u2013 all in one",
    url: "https://github.com/oven-sh/bun"
  },
  {
    name: "node",
    install: "https://github.com/actions/setup-node",
    description: "Node.js JavaScript runtime",
    url: "https://github.com/nodejs/node"
  },
  {
    name: "deno",
    install: "https://github.com/denoland/setup-deno",
    description: "A modern runtime for JavaScript and TypeScript",
    url: "https://github.com/denoland/deno"
  },
  {
    name: "graaljs",
    install: "https://github.com/oracle/graaljs",
    description: "A ECMAScript 2023 compliant JavaScript implementation built on GraalVM. With polyglot language interoperability support. Running Node.js applications!",
    url: "https://github.com/oracle/graaljs"
  },
  {
    name: "hermes",
    install: "https://github.com/facebook/hermes",
    description: "A JavaScript engine optimized for running React Native",
    url: "https://github.com/facebook/hermes",
    notes: "Two entries exist, one with version 0.1.0, 64 bit Linux binary with -O option"
  },
  {
    name: "llrt",
    install: "https://github.com/awslabs/llrt",
    description: "LLRT (Low Latency Runtime) is a lightweight JavaScript runtime",
    url: "https://github.com/awslabs/llrt"
  },
  {
    name: "txiki.js",
    bin: "tjs",
    subcmd: "run",
    description: "A tiny JavaScript runtime",
    url: "https://github.com/saghul/txiki.js",
    install: "https://github.com/ahaoboy/txiki.js-build"
  },
  {
    name: "quickjs",
    bin: "qjs",
    description: "QuickJS is a small and embeddable Javascript engine. It supports the ES2023 specification including modules, asynchronous generators, proxies and BigInt.",
    install: "https://github.com/ahaoboy/quickjs-build",
    url: "https://github.com/bellard/quickjs"
  },
  {
    name: "quickjs-ng",
    bin: "qjs-ng",
    description: "QuickJS, the Next Generation: a mighty JavaScript engine",
    install: "https://github.com/quickjs-ng/quickjs",
    url: "https://github.com/quickjs-ng/quickjs"
  },
  {
    name: "mujs",
    description: "An embeddable Javascript interpreter in C",
    install: "https://github.com/ahaoboy/mujs-build",
    url: "https://github.com/ccxvii/mujs"
  },
  {
    name: "mujs-pgo",
    description: "An embeddable Javascript interpreter in C",
    install: "https://github.com/ahaoboy/mujs-pgo-build",
    url: "https://github.com/ccxvii/mujs"
  },
  {
    name: "mujs-one",
    description: "mujs by c2rust",
    install: "https://github.com/ahaoboy/mujs-one",
    url: "https://github.com/ahaoboy/mujs-one"
  },
  {
    name: "xst",
    install: "https://github.com/Moddable-OpenSource/moddable",
    description: "Tools for developers to create truly open IoT products using standard JavaScript on low cost microcontrollers",
    url: "https://github.com/Moddable-OpenSource/moddable"
  },
  {
    name: "JavaScriptCore",
    bin: "jsc",
    description: "JavaScriptCore is the built-in JavaScript engine for WebKit, which implements ECMAScript as in ECMA-262 specification",
    install: "https://github.com/ahaoboy/jsc-build",
    url: "https://github.com/WebKit/webkit/tree/main/Source/JavaScriptCore"
  },
  {
    name: "v8",
    bin: "d8",
    description: "V8 is Google\u2019s open source high-performance JavaScript and WebAssembly engine",
    install: "https://github.com/ahaoboy/v8-build",
    url: "https://v8.dev"
  },
  {
    name: "spidermonkey",
    bin: "js",
    description: "SpiderMonkey is Mozilla\u2019s JavaScript and WebAssembly Engine, used in Firefox",
    install: "https://github.com/ahaoboy/spidermonkey-build",
    url: "https://spidermonkey.dev"
  },
  {
    name: "JerryScript",
    bin: "jerry",
    description: "Ultra-lightweight JavaScript engine for the Internet of Things",
    install: "https://github.com/ahaoboy/jerryscript-build",
    url: "https://github.com/jerryscript-project/jerryscript"
  },
  {
    name: "primjs",
    install: "https://github.com/ahaoboy/primjs-build",
    description: "JavaScript Engine Optimized for Lynx",
    url: "https://github.com/lynx-family/primjs"
  },
  {
    name: "rquickjs",
    install: "https://github.com/ahaoboy/rquickjs-cli",
    description: "High level bindings to the quickjs javascript engine",
    url: "https://github.com/DelSkayn/rquickjs"
  },
  {
    name: "rquickjs-pgo",
    bin: "rqjs-pgo",
    install: "https://github.com/ahaoboy/rqjs-pgo-build",
    description: "High level bindings to the quickjs javascript engine",
    url: "https://github.com/DelSkayn/rquickjs"
  },
  {
    name: "ChakraCore",
    bin: "ch",
    install: "https://github.com/ahaoboy/ChakraCore-build",
    description: "ChakraCore is an open source Javascript engine with a C API",
    url: "https://github.com/chakra-core/ChakraCore"
  },
  {
    name: "duktape",
    bin: "duk",
    description: "embeddable Javascript engine with a focus on portability and compact footprint",
    url: "https://github.com/svaarala/duktape",
    install: "https://github.com/ahaoboy/duktape-build"
  },
  {
    name: "nova",
    subcmd: "eval",
    description: "Nova is a JavaScript and WebAssembly engine written in Rust",
    url: "https://github.com/trynova/nova"
  },
  {
    name: "boa",
    description: "Boa is an embeddable and experimental Javascript engine written in Rust. Currently, it has support for some of the language.",
    install: "https://github.com/boa-dev/boa",
    url: "https://github.com/boa-dev/boa"
  },
  {
    name: "engine262",
    description: "An implementation of ECMA-262 in JavaScript",
    url: "https://github.com/engine262/engine262"
  },
  {
    name: "ladybird",
    install: "https://github.com/ahaoboy/ladybird-js-build",
    description: "Truly independent web browser",
    url: "https://github.com/LadybirdBrowser/ladybird"
  },
  {
    name: "goja",
    install: "https://github.com/ahaoboy/goja-build",
    description: "ECMAScript/JavaScript engine in pure Go",
    url: "https://github.com/dop251/goja"
  },
  {
    name: "kiesel",
    install: "https://github.com/ahaoboy/kiesel-build",
    description: "A JavaScript engine written in Zig https://kiesel.dev",
    url: "https://codeberg.org/kiesel-js/kiesel"
  },
  {
    name: "mozjs",
    install: "https://github.com/ahaoboy/mozjs-cli",
    description: "Rust bindings to SpiderMonkey",
    url: "https://github.com/servo/mozjs"
  },
  {
    name: "jint",
    bin: "jint-cli",
    install: "https://github.com/ahaoboy/jint-cli",
    description: "Javascript Interpreter for .NET",
    url: "https://github.com/sebastienros/jint"
  },
  {
    name: "dune",
    subcmd: "run",
    description: "JavascriptA hobby runtime for JavaScript and TypeScript",
    url: "https://github.com/aalykiot/dune"
  },
  {
    name: "jjs",
    description: "Nashorn engine is an open source implementation of the ECMAScript Edition 5.1 Language Specification",
    url: "https://github.com/openjdk/nashorn"
  },
  {
    name: "rhino",
    description: "Rhino is an open-source implementation of JavaScript written entirely in Java",
    url: "https://github.com/mozilla/rhino"
  },
  {
    name: "njs",
    description: "A subset of JavaScript language to use in nginx",
    url: "https://github.com/nginx/njs",
    install: "https://github.com/ahaoboy/njs-build"
  },
  {
    name: "ringo",
    description: "RingoJS is a JavaScript platform built on the JVM and optimized for server-side applications",
    url: "https://github.com/ringo/ringojs"
  },
  {
    name: "lo",
    description: "it's JavaScript Jim, but not as we know it",
    url: "https://github.com/just-js/lo",
    install: "https://github.com/ahaoboy/lo-build"
  },
  {
    name: "spiderfire",
    subcmd: "run",
    description: "JavaScript Runtime built with Mozilla's SpiderMonkey Engine",
    url: "https://github.com/Redfire75369/spiderfire",
    install: "https://github.com/ahaoboy/spiderfire-build"
  },
  {
    name: "bare",
    description: "Small and modular JavaScript runtime for desktop and mobile",
    url: "https://github.com/holepunchto/bare"
  },
  {
    name: "hako",
    description: "An embeddable, lightweight, secure, high-performance JavaScript engine",
    url: "https://github.com/andrewmd5/hako",
    install: "https://github.com/andrewmd5/hako-cli"
  },
  {
    name: "quickjs-emscripten",
    bin: "quickjs-emscripten-cli",
    description: "Safely execute untrusted Javascript in your Javascript, and execute synchronous code that uses async functions",
    url: "https://github.com/justjake/quickjs-emscripten",
    install: "https://github.com/ahaoboy/quickjs-emscripten-cli"
  }
];

// src/action.ts
var import_os = __toESM(require("os"));
var CWD = process.env.GITHUB_WORKSPACE || process.cwd();
var TEST_RUN_DIR = import_path.default.join(CWD, "__test_run__");
var TEST_DIR = import_path.default.join(CWD, "./test");
var OS = process.env.RUNNER_OS || import_os.default.platform();
var ARCH = process.env.RUNNER_ARCH || import_os.default.arch();
var OUTPUT_DIR = import_path.default.join(CWD, "output");
if (!(0, import_fs.existsSync)(TEST_RUN_DIR)) {
  import_fs.default.mkdirSync(TEST_RUN_DIR);
}
if (!(0, import_fs.existsSync)(OUTPUT_DIR)) {
  import_fs.default.mkdirSync(OUTPUT_DIR);
}
function execCmd(cmd, cwd) {
  console.error(`cmd:`, { cmd, cwd });
  return new Promise((r) => {
    (0, import_child_process.exec)(cmd, { cwd }, (err, stdout, stderr) => {
      console.error("exec output", { err, stdout, stderr });
      r(stdout?.trim() || "");
    });
  });
}
var data = {};
function isMsys() {
  return !!process.env["MSYSTEM"];
}
function fromMsysPath(s) {
  if (!isMsys() || !s.startsWith("/")) {
    return s;
  }
  s = s.replace(/^\/([A-Za-z])\//, (_, drive) => `${drive.toUpperCase()}:/`);
  return s;
}
function getExePath(i) {
  const execPath = (0, import_child_process.execSync)(`which ${i}`).toString().trim();
  const fullPath = (0, import_fs.existsSync)(execPath + ".exe") ? execPath + ".exe" : execPath;
  return fromMsysPath(fullPath);
}
function getText(p) {
  if (!(0, import_fs.existsSync)(p)) {
    return "";
  }
  return import_fs.default.readFileSync(p, "utf-8");
}
function prepare() {
  const before = getText(import_path.default.join(TEST_DIR, "before.js"));
  const after = getText(import_path.default.join(TEST_DIR, "after.js"));
  for (const i of import_fs.default.readdirSync(TEST_DIR)) {
    if (!i.endsWith(".js") || ["before.js", "after.js"].includes(i)) {
      continue;
    }
    const content = getText(import_path.default.join(TEST_DIR, i));
    const output = import_path.default.join(TEST_RUN_DIR, i);
    const s = [before, content, after].join("\n\n");
    import_fs.default.writeFileSync(output, s);
  }
}
var TIME_KEY = "Time";
var OUTPUT_KEY = "output";
function generateMd(data2) {
  const engines = Object.keys(data2);
  const header = import_fs.default.readdirSync(TEST_RUN_DIR).map((i) => i.split(".")[0]);
  console.log("engines:", engines, header);
  const headerMd = "| | " + header.join(" | ") + " |\n|" + " --- |".repeat(header.length + 1);
  const rows = [headerMd];
  for (const engine of engines) {
    const row = [engine];
    for (const i of header) {
      row.push(((data2[engine][i] || {})[OUTPUT_KEY] || "").toString());
    }
    console.log("row:", row, data2[engine]);
    rows.push("| " + row.join(" | ") + " |");
  }
  return rows.join("\n");
}
async function main() {
  prepare();
  for (const item of info_default) {
    for (const test of (0, import_fs.readdirSync)(TEST_RUN_DIR)) {
      const name = test.split(".")[0];
      const testPath = import_path.default.join(TEST_RUN_DIR, test);
      try {
        const i = item.bin || item.name;
        const { subcmd = "" } = item;
        const execPath = getExePath(i);
        const execDir = import_path.default.dirname(execPath);
        if (!(i in data)) {
          data[i] = {};
        }
        if (!(name in data[i])) {
          data[i][name] = {};
        }
        const startTime = Date.now();
        const out = await execCmd(
          `${i} ${subcmd} ${testPath}`,
          execDir
        );
        const endTime = Date.now();
        console.error("out: ", out);
        data[i][name][OUTPUT_KEY] = out;
        data[i][name][TIME_KEY] = endTime - startTime | 0;
      } catch (e) {
        console.error("error:", e);
      }
    }
  }
  console.error(JSON.stringify(data));
  console.log(JSON.stringify(data));
  const jsonPath = import_path.default.join(OUTPUT_DIR, `${OS}-${ARCH}.json`);
  import_fs.default.writeFileSync(jsonPath, JSON.stringify(data));
  const md = generateMd(data);
  const mdPath = import_path.default.join(OUTPUT_DIR, `${OS}-${ARCH}.md`);
  import_fs.default.writeFileSync(mdPath, md);
}
main();
