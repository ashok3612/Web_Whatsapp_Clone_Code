import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

export const makeAutoScroll = (block, duration) => {
  block = block || $("html, body");
  duration = duration || 2000;

  if (typeof block === "string") {
    block = $(block);
  }
  if (block.length) {
    block.animate(
      {
        scrollTop: block.get(0).scrollHeight,
      },
      duration
    );
  }
};

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </React.StrictMode>,
  document.getElementById('root')
);

