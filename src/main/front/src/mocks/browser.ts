import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// serviceWorker.events.on('request:start', (req) => {
//     console.log('Request started:', req);
// });
//
// serviceWorker.events.on('request:match', (req) => {
//     console.log('Request matched:', req);
// });
//
// serviceWorker.events.on('request:unhandled', (req) => {
//     console.warn('Request not handled:', req);
// });
//
// serviceWorker.events.on('response:mocked', (res) => {
//     console.log('Response mocked:', res);
// });
