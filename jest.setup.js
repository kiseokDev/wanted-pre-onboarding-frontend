// jest.setup.js 또는 테스트 설정 파일
// import JSDOM from 'jsdom'

// const dom = new JSDOM('', {
//     url: 'http://localhost',
//     beforeParse(window) {
//         window._virtualConsole = window.console;
//         window._virtualConsole.sendTo(console, { omitJSDOMErrors: true });
//     },
//     resources: 'usable',
//     runScripts: 'dangerously',
// });

// dom.window._virtualConsole.on('jsdomError', (error) => {
//     if (error.type === 'not implemented') return;
//     console.error(error.message, error.detail);
// });
// global.XMLHttpRequest = undefined;