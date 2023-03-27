#!/usr/bin/env node
const readline = require('readline');
const { stdout, stdin } = require('process');
const fs = require('fs');
const path = require('path');

const TEMPLATE_FOLDER_NAME = 'template';

async function main() {
  // 获取项目名
  stdout.write('请输入您的项目名：');
  const projectName = await readStdin();
  stdout.write('-------------------- \n');

  // 选择模板
  stdout.write('请选择模板：\n');
  const templateList = fs.readdirSync(path.join(__dirname, '/', TEMPLATE_FOLDER_NAME));
  printTemplateList(templateList, 0);
  stdout.write('\x1B[?25l'); // 隐藏光标
  readline.emitKeypressEvents(stdin); // 监听键盘输入
  const index = await getSelectIndex(templateList);

  // 创建文件
  const sourceFolder = path.join(__dirname, '/', TEMPLATE_FOLDER_NAME, '/', templateList[index]);
  const targetFolder = path.join(process.cwd(), '/', projectName);
  copyFolderSync(sourceFolder, targetFolder);

  // 重写package.json
  const packageJsonDirName = path.join(targetFolder, '/package.json');
  const file = fs.readFileSync(packageJsonDirName, 'utf-8');
  const indent = file.match(/^\s+/m)?.[0] || 2;
  const jsonFile = JSON.parse(file);
  jsonFile.name = projectName;
  fs.writeFileSync(packageJsonDirName, JSON.stringify(jsonFile, null, indent));

  // output response
  stdout.write('--------------------\n' + 'success !\n' + 'cd ' + projectName + '\n' + 'npm install');
  process.exit();
}

main();

function readStdin() {
  return new Promise((resolve) => {
    process.stdin.on('data', (data) => {
      resolve(data.toString().trim());
    });
  });
}

function getSelectIndex(templateList) {
  const length = templateList.length;
  const originRaw = stdin.isRaw;
  stdin.setRawMode(true);
  return new Promise((res) => {
    let index = 0;
    stdin.on('keypress', (chunk, key) => {
      if (key.name === 'up' || key.name === 'k') {
        if (index > 0) {
          index--;
          clearRecentOutput(length);
          printTemplateList(templateList, index);
        }
      }
      if (key.name === 'down' || key.name === 'j') {
        if (index < length - 1) {
          index++;
          clearRecentOutput(length);
          printTemplateList(templateList, index);
        }
      }
      if (key.sequence === '\x03' && key.name === 'c') {
        return process.exit();
      }
      if (key.name === 'return') {
        stdin.setRawMode(originRaw);
        return res(index);
      }
    });
  });
}

function printTemplateList(templateList, selectedIndex) {
  templateList.forEach((item, i) => {
    console.log(`${i === selectedIndex ? '\x1b[36m-> ' : '   '}[${item}]\x1b[0m`);
  });
}

function clearRecentOutput(n) {
  for (let i = 0; i < n; i++) {
    process.stdout.write('\x1B[1A\x1B[2K');
  }
}

function copyFolderSync(sourceFolder, destinationFolder) {
  // 创建目标文件夹
  fs.mkdirSync(destinationFolder, { recursive: true });

  // 读取源文件夹的内容
  const files = fs.readdirSync(sourceFolder);

  // 遍历源文件夹的内容并复制
  files.forEach((file) => {
    const sourcePath = path.join(sourceFolder, file);
    const destinationPath = path.join(destinationFolder, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      // 如果是文件夹，递归复制
      copyFolderSync(sourcePath, destinationPath);
    } else {
      // 如果是文件，直接复制
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}
