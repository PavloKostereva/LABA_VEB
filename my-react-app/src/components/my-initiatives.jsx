import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../assets/css/all.css';
//import "boxicons/css/boxicons.min.css"; // Іконки Boxicons

const MyInitiatives = () => {
    const [myInitiatives, setMyInitiatives] = useState([]);

    useEffect(() => {
        const storedInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];
        console.log("Отримані ініціативи з localStorage:", storedInitiatives);
        setMyInitiatives(storedInitiatives);
    }, []);

    const leaveInitiative = (initiativeId) => {
        const updatedInitiatives = myInitiatives.filter(item => item.id !== initiativeId);
        
        let initiatives = JSON.parse(localStorage.getItem("initiatives")) || [];
        let initiative = initiatives.find(item => item.id === initiativeId);

        if (initiative) {
            initiative.neededVolunteers++;
            localStorage.setItem("initiatives", JSON.stringify(initiatives));
        }

        localStorage.setItem("myInitiatives", JSON.stringify(updatedInitiatives));
        setMyInitiatives(updatedInitiatives);
        console.log("Від'єднано від ініціативи. Залишилося ініціатив:", updatedInitiatives);
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
                    <li><Link to="/about" target="_blank">Про нас</Link></li>
                    <li className="log_in_m"><Link to="/log_in">Увійти <i className="bx bx-log-in"></i></Link></li>
                    <li className="sign_up_m"><Link to="/sign_up">Зареєструватися <i className="bx bx-log-in-circle"></i></Link></li>
                </ul>
                </nav>
            </header>

            <main id="my-initiatives-container">
                <h2>Мої ініціативи</h2>
                {myInitiatives.length > 0 ? (
                    <div className="grid-container">
                        {myInitiatives.map(initiative => (
                            <article key={initiative.id} className="initiative-card">
                                <img src={initiative.img} alt={initiative.title} />
                                <div className="initiative-text">{initiative.title}</div>
                                <h3>{initiative.title}</h3>
                                <p><strong>Дата:</strong> {initiative.date}</p>
                                <p><strong>Місце:</strong> {initiative.place}</p>
                                <p><strong>Залишилось волонтерів:</strong> {initiative.neededVolunteers}</p>
                                <p>{initiative.description}</p>
                                <button className="leave-btn" onClick={() => leaveInitiative(initiative.id)}>Від'єднатися</button>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p>Ви ще не приєдналися до жодної ініціативи.</p>
                )}
            </main>

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

export default MyInitiatives;
