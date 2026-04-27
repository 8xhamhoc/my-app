import React, { type FormEvent } from 'react';
import './LoginForm.css';

type Props = Record<string, never>;

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconReset() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function IconLogin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

const LoginForm: React.FC<Props> = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">Sign in</h2>

      <div className="login-form__field">
        <label className="login-form__label" htmlFor="login-username">
          <span className="login-form__label-icon">
            <IconUser />
          </span>
          Username
        </label>
        <input
          id="login-username"
          name="username"
          className="login-form__input"
          type="text"
          autoComplete="username"
          placeholder="Enter username"
        />
      </div>

      <div className="login-form__field">
        <label className="login-form__label" htmlFor="login-password">
          <span className="login-form__label-icon">
            <IconLock />
          </span>
          Password
        </label>
        <input
          id="login-password"
          name="password"
          className="login-form__input"
          type="password"
          autoComplete="current-password"
          placeholder="Enter password"
        />
      </div>

      <div className="login-form__actions">
        <button className="login-form__btn login-form__btn--reset" type="reset">
          <IconReset />
          Reset
        </button>
        <button className="login-form__btn login-form__btn--login" type="submit">
          <IconLogin />
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
