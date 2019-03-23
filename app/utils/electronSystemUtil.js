import os from 'os';

const getOS = () => {
  if (os.platform() === 'darwin') {
    return 'Mac';
  }
  if (os.platform() === 'linux') {
    return 'Linux';
  }
  if (os.platform() === 'win32' || os.platform() === 'win64') {
    if (parseFloat(os.release()) < 6.2) {
      return 'Windows 7';
    }
    return 'Windows 10';
  }
  return null;
};

export default {
  getOS,
};
