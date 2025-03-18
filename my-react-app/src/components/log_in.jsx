import React, { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app, googleAuthProvider } from "../js/firebase";
import '../assets/css/all.css';
const auth = getAuth(app);

const AuthForm = ({ isRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (maybeUser) => {
      setUser(maybeUser);
    });
    return () => unsubscribe();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!user && isRegister) {
    setError('Спочатку увійдіть у профіль.');
    return;
  }

  if (isRegister && password !== confirmPassword) {
    setError('Паролі не співпадають!');
    return;
  }

  try {
    if (isRegister) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  } catch (err) {
    setError(err.message);
  }
};


  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <header>
        <div className="head-logo">
          <div className="logo">
            <i className="bx bx-shield-plus"></i>
            <h4>Helping Hands</h4>
          </div>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/initiatives">Доступні ініціативи</Link></li>
            <li><Link to="/my-initiatives">Мої ініціативи</Link></li>
            <li><Link to="/about">Про нас</Link></li>
            <li className="log_in_m"><Link to="/log_in">Увійти <i className="bx bx-log-in"></i></Link></li>
          </ul>
        </nav>
      </header>
      
      <section className="main-sect">
        <div className="main-sect-text">
          <h2>{isRegister ? 'Реєстрація' : 'Вхід'} до акаунту</h2>
          {error && <p className="error">{error}</p>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Електронна пошта:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password">Пароль:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            {isRegister && (
              <>
                <label htmlFor="confirm-password">Підтвердіть пароль:</label>
                <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </>
            )}

            <button type="submit" className="btn">{isRegister ? 'Зареєструватися' : 'Увійти'}</button>
            <button type="button" className="btn google-btn" onClick={handleGoogleSignIn}>Увійти через Google</button>
          </form>
          <p>
            {isRegister ? 'Вже маєте акаунт?' : 'Не маєте акаунту?'} 
            <Link to={isRegister ? '/log_in' : '/sign_up'}>{isRegister ? ' Увійдіть тут' : ' Зареєструйтеся тут'}</Link>
          </p>
        </div>
      </section>

      
      <footer>
        <p>Приєднуйтесь до нас і станьте частиною змін!</p>
        <p>
          Контакти:
          <a href="mailto:volunteer@initiative.org">volunteer@initiative.org</a> |
          <a href="tel:+380991234567">+380 99 123 45 67</a>
        </p>
        <a href="#">Політика конфіденційності</a>
      </footer>
    </div>
  );
};

export const LogIn = () => <AuthForm isRegister={false} />;
export const SignUp = () => <AuthForm isRegister={true} />;
