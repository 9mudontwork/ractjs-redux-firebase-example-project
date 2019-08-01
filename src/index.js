import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reactReduxFirebase(firebaseConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true }),
        reduxFirestore(firebaseConfig)
    )
);

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}><App /></Provider>,
        document.getElementById('root')
    );
    serviceWorker.register();
});

// // ใช้ redux devtools ใน chrome
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const rrfConfig = {
//     useFirestoreForProfile: true,
//     userProfile: 'users',
//     attachAuthIsReady: true,
//     firebaseStateName: 'firebase'
// };

// const store = createStore(rootReducer,
//     composeEnhancers(
//         applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
//         reduxFirestore(firebase, rrfConfig),
//     )
// );

// const rrfProps = {
//     firebase,
//     config: rrfConfig,
//     dispatch: store.dispatch,
//     createFirestoreInstance,
// };

// // authIsReady(store, 'firebase').then(() => {
// //     console.log('Auth has loaded')
// // })

// ReactDOM.render(
//     <Provider store={store}>
//         <ReactReduxFirebaseProvider {...rrfProps}>
//             <App />
//         </ReactReduxFirebaseProvider>
//     </Provider >,
//     document.getElementById('root')
// );



// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
