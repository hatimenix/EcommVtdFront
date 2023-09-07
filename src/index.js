import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import 'animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import ReactDOM from 'react-dom';



import store__ from './store/store__';
import { selectCategory } from "./store/slices/categoriesSlice";
import { ContextProvider } from "./context/ContextProvider";


const selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
if (selectedCategory) {
  store.dispatch(selectCategory(selectedCategory));
}
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(

//     <Provider store={store}>
//       <PersistProvider>
//         <App />
//       </PersistProvider>
//     </Provider>

ReactDOM.render(
  <Provider store={store__}>
    <ContextProvider>
    <App />
    </ContextProvider>
    
  </Provider>,
  document.getElementById('root')
);

