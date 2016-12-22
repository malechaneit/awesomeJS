function signup(ctx, user) {
  if (ctx.user) {
    return page.redirect('/profile');
  }

  render('signup');

  const signUpForm = document.forms['signup-form'];

  function handler(e) {

    const form = e.target;
    const { email, password, password_confirm } = form.elements;

    if (email.value.indexOf('@') > -1) {

    } else {

    }

    e.preventDefault();

  }

  signUpForm.addEventListener('submit', handler);
}
