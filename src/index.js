import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
    RecoilRoot,
    useRecoilSnapshot
} from 'recoil';


function DebugObserver() {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
      console.log('The following atoms were modified:');
      for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
        console.log(node.key, snapshot.getLoadable(node));
      }
    }, [snapshot]);
  
    return null;
  }

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
        <DebugObserver />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();