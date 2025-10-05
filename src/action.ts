import fs, { existsSync, readdirSync, } from "fs";
import path from "path";
import { exec, execSync } from "child_process";
import info from "../info.json";
import os from 'os'
import { stripANSI } from "bun";

const CWD = process.env.GITHUB_WORKSPACE || process.cwd()
const TEST_RUN_DIR = path.join(CWD, "__test_run__");
const TEST_DIR = path.join(CWD, "./test");
const OS = process.env.RUNNER_OS || os.platform()
const ARCH = process.env.RUNNER_ARCH || os.arch()

const OUTPUT_DIR = path.join(CWD, "output");

if (!existsSync(TEST_RUN_DIR)) {
  fs.mkdirSync(TEST_RUN_DIR)
}

if (!existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
}

function execCmd(cmd: string, cwd?: string) {
  console.error(`cmd:`, { cmd, cwd });
  return new Promise<string>((r) => {
    // exec(`bash -c "${cmd}"`, { cwd }, (err, stdout, stderr) => {
    // goja output to stderr
    exec(cmd, { cwd }, (err, stdout, stderr) => {
      console.error("exec output", { err, stdout, stderr });

      let s = stripANSI(stdout?.trim() || "")
      if (cmd.includes("boa")) {
        s = s.split('\n').slice(0, -1).join('\n').trim()
      }
      r(s);
    });
  });
}

type DATA = Record<string, Record<string, Record<string, string | number>>>
const data: DATA = {};

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

const TIME_KEY = 'Time'
const OUTPUT_KEY = 'output'

function generateMd(data: DATA): string {
  const engines = Object.keys(data)
  const header = fs.readdirSync(TEST_RUN_DIR).map(i => i.split('.')[0])

  const headerMd = "| | " + header.join(" | ") + " |" + "\n" + "|" +
    " --- |".repeat(header.length + 1);

  const rows: string[] = [headerMd]

  for (const engine of engines) {
    const row: string[] = [engine]

    for (const i of header) {
      const s = ((data[engine][i] || {})[OUTPUT_KEY] || '').toString().replaceAll('\n', '<br>')
      row.push(s)
    }
    rows.push('| ' + row.join(" | ") + " |");
  }

  return rows.join("\n");
}

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

  const jsonPath = path.join(OUTPUT_DIR, `${OS}-${ARCH}.json`)
  fs.writeFileSync(jsonPath, JSON.stringify(data))

  const md = generateMd(data)
  const mdPath = path.join(OUTPUT_DIR, `${OS}-${ARCH}.md`)
  fs.writeFileSync(mdPath, md)
}

main();
