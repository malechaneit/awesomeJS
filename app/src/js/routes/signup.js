function signup(ctx, next) {
  //if (ctx.user) {
  //  return page.redirect('/profile');
  //}

  render('signup');

  const signUpForm = document.forms['signup-form'];
  const submit = qs('button', signUpForm); // Ask how to get button of target form
  const errorsContainer = qs('#errors', signUpForm);
  const auth = firebase.auth();

  function renderErrors(errors = []) {
    return errors.map(err => {
          return `
            <li class="list-group-item list-group-item-danger">
              <span>${err}</span>
            </li>`;
      }).join('');
  }

  function showErrors(errors = []) {
    errorsContainer.innerHTML = renderErrors(errors);
    errorsContainer.hidden = false;
  }

  function hideErrors() {
    errorsContainer.hidden = true;
    errorsContainer.innerHTML = '';
  }

  function onUserCreationError(error) {
    showErrors(error.message);
  }

  function onUserCreated() {
    console.log('Success');
    hidePreloder(form);
    return page.redirect('/profile');
  }


  function handler(e) {

    e.preventDefault();

    const form = e.target;
    const { email, password, password_confirm } = form.elements;
    const errors = [];

    if (email.value.indexOf('@') === -1) {
      errors.push('Email is invalid');
    }

    if (!password.value.length) {
      errors.push('Please enter password');
    } else if (password.value !== password_confirm.value) {
      errors.push('Password is incorrect');
    }

    if (errors.length) {
      return showErrors(errors);
    }

    hideErrors();

    showPreloader();

    auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(onUserCreated)
        .catch(onUserCreationError);

    function showPreloader() { // Ask how to move outside
      signUpForm.classList.add('is-loading');
      submit.disabled = true;
    }

    function hidePreloder() {
      signUpForm.classList.remove('is-loading');
      submit.disabled = false;
    }

  }

  signUpForm.addEventListener('submit', handler);
}
