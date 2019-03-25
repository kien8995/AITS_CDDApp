import path from 'path';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';

export const readRes = (directory, file) => {
  const result = [];
  const lineReader = createInterface({
    input: createReadStream(path.join(directory, file)),
  });
  lineReader.on('line', line => {
    console.log(line);
  });

  return result;
};
