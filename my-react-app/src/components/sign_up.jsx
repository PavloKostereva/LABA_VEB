import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/all.css';

function Sign_up() {
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
                        <li className="log_in_m"><Link to="/log_in">Увійти <i className="bx bx-log-in" ></i></Link></li>
                        <li className="sign_up_m"><Link to="/sign_up">Зареєструватися <i className="bx bx-log-in-circle" ></i></Link></li>
                    </ul>
                </nav>
            </header>

            <section className="main-sect">
                <div className="main-sect-text">
                    <h2>Реєстрація акаунту</h2>
                    <form className="login-form">
                        <label htmlFor="email">Електронна пошта:</label>
                        <input type="email" id="email" name="email" required />
                        
                        <label htmlFor="password">Пароль:</label>
                        <input type="password" id="password" name="password" required />
                        
                        <label htmlFor="confirm-password">Підтвердіть пароль:</label>
                        <input type="password" id="confirm-password" name="confirm-password" required />
                        
                        <button type="submit" className="btn">Зареєструватися</button>
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

                <Link to="#">Політика конфіденційності</Link>
            </footer>
        </div>
    );
}

export default Sign_up;
