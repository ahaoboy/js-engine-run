import fs, { existsSync, readdirSync, } from "fs";
import path from "path";
import { exec, execSync } from "child_process";
import info from "../info.json";

const TEST_RUN_DIR = path.join(__dirname, "../__test_run__");
const TEST_DIR = path.join(__dirname, "../test");

if (!existsSync(TEST_RUN_DIR)) {
  fs.mkdirSync(TEST_RUN_DIR)
}


function execCmd(cmd: string, cwd?: string) {
  console.error(`cmd:`, { cmd, cwd });
  return new Promise<string>((r) => {
    // exec(`bash -c "${cmd}"`, { cwd }, (err, stdout, stderr) => {
    exec(cmd, { cwd }, (err, stdout, stderr) => {
      console.error("exec output", { err, stdout, stderr });

      // goja output to stderr
      r(stdout?.trim() || "");
    });
  });
}


const data: Record<string, Record<string, Record<string, string | number>>> = {};

function isMsys() {
  return !!process.env["MSYSTEM"];
}
function fromMsysPath(s: string) {
  if (!isMsys() || !s.startsWith("/")) {
    return s;
  }
  s = s.replace(/^\/([A-Za-z])\//, (_, drive) => `${drive.toUpperCase()}:/`);
  return s;
}


function getExePath(i: string) {
  const execPath = execSync(`which ${i}`).toString().trim();
  const fullPath = existsSync(execPath + '.exe') ? execPath + '.exe' : execPath;
  return fromMsysPath(fullPath);
}

function getText(p: string) {
  if (!existsSync(p)) {
    return ''
  }
  return fs.readFileSync(p, 'utf-8')
}

function prepare() {
  const before = getText(path.join(TEST_DIR, 'before.js'))
  const after = getText(path.join(TEST_DIR, 'after.js'))
  for (const i of fs.readdirSync(TEST_DIR)) {
    if (!i.endsWith('.js') || ['before.js', 'after.js'].includes(i)) {
      continue
    }
    const content = getText(path.join(TEST_DIR, i))
    const output = path.join(TEST_RUN_DIR, i)
    const s = [before, content, after].join('\n\n')
    fs.writeFileSync(output, s)
  }
}

const TIME_KEY = 'Time(ms)'
const OUTPUT_KEY = 'output'

async function main() {

  prepare()

  for (const item of info) {
    for (const test of readdirSync(TEST_RUN_DIR)) {
      const name = test.split('.')[0]
      const testPath = path.join(TEST_RUN_DIR, test);

      try {
        const i = item.bin || item.name
        const { subcmd = "" } = item
        const execPath = getExePath(i);

        const execDir = path.dirname(execPath);

        if (!(i in data)) {
          data[i] = {};
        }

        if (!(name in data[i])) {
          data[i][name] = {};
        }

        const startTime = Date.now();
        const out = await execCmd(
          `${i} ${subcmd} ${testPath}`,
          execDir,
        );
        const endTime = Date.now();
        console.error("out: ", out);
        data[i][name][OUTPUT_KEY] = out
        data[i][name][TIME_KEY] = ((endTime - startTime)) | 0;
      } catch (e) {
        console.error("error:", e);
      }
    }
  }

  console.error(JSON.stringify(data));
  console.log(JSON.stringify(data));
}

main();
