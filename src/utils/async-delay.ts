import { logColor } from './log-colors';

export async function asyncDelay(
  milliseconds: number,
  verbose = false,
): Promise<void> {
  if (milliseconds <= 0) return;
  if (verbose) {
    logColor(`Delaying for ${milliseconds}ms`, 'yellow');

    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}
