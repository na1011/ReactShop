import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { worker } from './mocks/browser';

const startWorker = async (): Promise<ServiceWorkerRegistration | undefined> =>
    await worker.start({
        onUnhandledRequest: 'bypass'
    });

startWorker()
    .then(() => {
        const root = document.getElementById('root')!;
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <RecoilRoot>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </RecoilRoot>
            </React.StrictMode>
        );
    })
    .catch((error) => {
        console.error('Worker Start Error : ', error);
    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
