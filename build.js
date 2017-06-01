'use strict';

const NWB = require('nwjs-builder');
const path = require('path');

NWB.commands.nwbuild('./', {
  version: 'v0.18.8-sdk',
  platforms: detectCurrentPlatform(),
//  withFFmpeg: true,
  production: false,
  macIcns: path.join(__dirname, 'icon.icns'),
  winIco: path.join(__dirname, 'icon.ico'),
  sideBySide: false,
  outputDir: 'build',
  executableName: 'Linx'
}, (err) => {
  if (err) {
    throw err;
  }
});

function detectCurrentPlatform() {
  switch (process.platform) {
    case 'darwin':
      return process.arch === 'x64' ? 'osx64' : 'osx32';
    case 'win32':
      return (process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')) ? 'win64' : 'win32';
    case 'linux':
      return process.arch === 'x64' ? 'linux64' : 'linux32';
  }
}
