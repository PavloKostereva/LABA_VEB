import React from 'react';
import { Link } from 'react-router-dom'; // Додано для використання в React Router
import '../assets/css/all.css';


function LogIn() {
    return (
        <body>
    <div>
      <header>
        <div className="head-logo">  {/* className замість class */}
          <div className="logo">
            <i className="bx bx-shield-plus"></i>
            <h4>Helping Hands</h4>
          </div>
        </div>

        <nav>
          <ul>
            <li><Link to="/">Головна</Link></li>  {/* Замінили на Link для навігації */}
            <li><Link to="/initiatives">Доступні ініціативи</Link></li>  {/* Замінили на Link */}
            <li><Link to="/my-initiatives">Мої ініціативи</Link></li>  {/* Замінили на Link */}
            <li><Link to="/about">Про нас</Link></li>  {/* Замінили на Link */}
            <li className="log_in_m"><Link to="/log_in">Увійти <i className="bx bx-log-in"></i></Link></li>  {/* Замінили на Link */}
            <li className="sign_up_m"><Link to="/sign_up">Зареєструватися <i className="bx bx-log-in-circle"></i></Link></li>  {/* Замінили на Link */}
          </ul>
        </nav>
      </header>

      <section className="main-sect">
        <div className="main-sect-text">
          <h2>Вхід до акаунту</h2>
          <form className="login-form">
            <label htmlFor="email">Електронна пошта:</label>  {/* Використано htmlFor замість for */}
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Пароль:</label>  {/* Використано htmlFor замість for */}
            <input type="password" id="password" name="password" required />

            <button type="submit" className="btn">Увійти</button>
          </form>
        </div>
      </section>

      <footer>
        <p>Приєднуйтесь до нас і станьте частиною змін!</p>

        <p>
          Контакти:
          <a href="mailto:volunteer@initiative.org">volunteer@initiative.org</a> |
          <a href="tel:+380991234567">+380 99 123 45 67</a>
        </p>

        <Link to="#">Політика конфіденційності</Link>  {/* Замінили на Link */}
      </footer>
            </div>
            </body>
  );
}

export default LogIn;
