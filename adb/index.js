'use strict';

const exec = require('shelljs').exec;

module.exports = {
  list: list,
  connect: connect,
  push: push
};

function list() {
  return new Promise((resolve, reject) => {
    exec (`./adb devices`)
      .stdout
      .on('data', resolve)
      .on('err', reject);
  });
}

function connect(ip) {
  return new Promise((resolve, reject) => {
    exec(`./adb connect ${ip}`)
      .stdout
      .on('data', resolve)
      .on('error', reject);
  });
}

function push(local, remote) {
  return new Promise((resolve, reject) => {
    exec(`./adb push ${local} ${remote || '/sdcard/Downloads'}`, {async: true})
      .stdout
      .on('data', resolve)
      .on('error', reject);
  });
}
