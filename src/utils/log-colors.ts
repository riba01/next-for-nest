import { styleText } from 'util';

export function logColor(...msg: (string | number)[]) {
  const messages = msg
    .map(m => styleText(['bgGreen', 'whiteBright'], `${m}`))
    .join(' ');
  console.log(styleText('green', messages));
}
