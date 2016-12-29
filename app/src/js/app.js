'use strict';

(() => {

  //=require 'routes/*.js'
  //=require 'lib/*.js'
  //=require 'middlewares/*.js'
  //=require 'classes/*.js'

  /// firebase initialization
  const firebaseConfig = {
    apiKey: "AIzaSyDxqaqwSuRSplsYujTYRSOJpWjpiYPPxbE",
    authDomain: "instaprjct-49b5e.firebaseapp.com",
    databaseURL: "https://instaprjct-49b5e.firebaseio.com",
    storageBucket: "instaprjct-49b5e.appspot.com",
    messagingSenderId: "220366328900"
  };
  firebase.initializeApp(firebaseConfig);

  const { location, history, templates } = window;
  const rootElement = qs('#root');

  function render(tplName, data = {}) {
    const user = firebase.auth().currentUser;
    const userData = user ? user.toJSON() : null;
    data = Object.assign(data, { user: userData });
    rootElement.innerHTML = templates[tplName](data);
  }

  function render404() {
    render('404');
  }

  page('*', auth);
  page('/', main);
  page('/login', login);
  page('/logout', logout);
  page('/signup', signup);
  page('/profile', profile);
  page('*', render404);

  render('preloader');

  // simulate firebase 'onready' behavior
  const unsubsribe = firebase.auth().onAuthStateChanged(() => {
    page();
    unsubsribe();
  });

})();
