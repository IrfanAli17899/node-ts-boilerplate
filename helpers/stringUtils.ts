/* eslint-disable no-param-reassign */
export const populateEnvs = (envNames: string[], envs: string, additionalEnvs: string[]): string => {
  const additionalEnvsStrs = additionalEnvs.map((additionalEnv) => additionalEnv.split('\n'));

  envNames.forEach((envName) => {
    envs += `${envName}="`;
    envs += additionalEnvsStrs
      .map(
        (additionalEnvStrs) => {
          const additionalEnvStr = additionalEnvStrs.find((envStr) => envStr.startsWith(envName)) || '';
          return additionalEnvStr.replace(new RegExp(`(${envName}=|")`, 'g'), '');
        },
      )
      .filter((str) => str)
      .join(';');
    envs += '"\n';
  });

  return envs;
};

export const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1);
export const kebabCase = (str: string): string => str.replace(/\s+/g, '-').toLowerCase();
export const clampSpaces = (str: string): string => str.trim().replace(/\s+/g, ' ');

export const clampSpacesEOLs = (str: string): string => {
  const lines = str.split('\n').map(clampSpaces);

  let isContent = false;

  return lines
    .filter((line, idx, arr) => {
      isContent = isContent || !!line;
      return isContent && (!!line || !!arr[idx - 1]);
    })
    .join('\n');
};

export const toBase64 = (str: string): string => Buffer.from(str).toString('base64');
export const fromBase64 = (str: string): string => Buffer.from(str, 'base64').toString();
