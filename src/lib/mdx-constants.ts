export const languages = {
  js: 'js',
  jsx: 'jsx',
  css: 'css',
  txt: 'text',
  tsx: 'tsx',
  ts: 'ts',
  python: 'Python',
  html: 'html',
  yaml: 'yaml',
  nginx: 'nginx',
  json: 'json',
  dockerFile: 'docker',
  go: 'go',
  ruby: 'ruby',
  md: 'markdown',
  shell: 'shell',
}

export const codeMap = new Map<string, string>();
for (const [key, value] of Object.entries(languages)) {
  codeMap.set(key, value);
}
