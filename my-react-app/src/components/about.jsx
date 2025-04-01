import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/all.css'
import partner1 from '../assets/img/img_about/partner1.png';
import partner2 from '../assets/img/img_about/partner2.png';
import partner3 from '../assets/img/img_about/partner3.png';
import partner4 from '../assets/img/img_about/partner4.png';
import partner5 from '../assets/img/img_about/partner5.png';

function About() {
  return (
    <div>
      <div className="background-photo"></div>
    
      <header>
        <div className="head-logo">
          <div className="logo">
            <i className="bx bx-shield-plus"></i>
            <h4>Helping Hands</h4>
          </div>
        </div>

        <nav>
        <nav>
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/initiatives">Доступні ініціативи</Link></li>
            <li><Link to="/my-initiatives">Мої ініціативи</Link></li>
            <li><Link to="/about">Про нас</Link></li>
            <li className="log_in_m"><Link to="/log_in">Увійти <i className="bx bx-log-in"></i></Link></li>
            <li><Link to="/profile">Профіль</Link></li>
            </ul>
        </nav>
        </nav>
      </header>

      <main>
        <h2>Про нас</h2>
        <p>Наша організація допомагає волонтерам знаходити важливі ініціативи та змінювати світ на краще. Ми створюємо платформу, яка з'єднує небайдужих людей з соціальними проектами, що потребують підтримки.</p>
        <p>Наша мета — об'єднати людей, які готові допомагати, та створити міцну мережу волонтерів і ініціаторів проектів. Разом ми робимо суспільство кращим.</p>

        <h2>Соціальні партнери</h2>
        <nav className="partners">
          <img src={partner1} alt="Партнер 1" />
          <img src={partner2} alt="Партнер 2" />
          <img src={partner3} alt="Партнер 3" />
          <img src={partner4} alt="Партнер 4" />
          <img src={partner5} alt="Партнер 5" />
        </nav>
      </main>

      <section>
        <h2>Поширені питання і відповіді на них:</h2>

        <h3>Як ми працюємо?</h3>
        <p>Наша платформа дозволяє знайти найбільш актуальні ініціативи, які шукають волонтерів. Ви можете зареєструватися як волонтер або ініціатор проекту, створювати нові проекти, подавати заявки на участь або відгукуватися на інші ініціативи. Вся інформація про ініціативи доступна в режимі реального часу, що робить процес ще зручнішим.</p>

        <h3>Які наші цілі?</h3>
        <ul>
          <li>1. Підтримка важливих соціальних проектів.</li>
          <li>2. Покращення якості життя у громадах за допомогою волонтерської діяльності.</li>
          <li>3. Залучення людей до корисних та позитивних змін у суспільстві.</li>
          <li>4. Створення мережі взаємодії між волонтерами та ініціаторами проектів.</li>
        </ul>

        <h3>З чого почати?</h3>
        <p>Щоб почати, просто зареєструйтесь на нашій платформі, оберіть ініціативу, яка вас цікавить, і долучайтесь до проекту. Ви також можете створити власну ініціативу, яка приверне увагу волонтерів.</p>
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
}

export default About;
