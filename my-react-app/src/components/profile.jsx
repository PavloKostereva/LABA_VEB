import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import '../assets/css/all.css';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {


        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
    

                
                setUser({
                    displayName: user.displayName,
                    email: user.email,
                });
            } else {
                navigate("/log_in");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);


    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate("/log_in");
            })
            .catch((error) => {
                console.error("Помилка під час виходу:", error);
            });
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
                        <li><Link to="/profile">Профіль</Link></li>
                        </ul>
                </nav>
            </header>

            <main>
                <div className="profile-container">
                    <h2>Мій профіль</h2>
                    {user ? (
                        <div>
                            <p><strong>Ім'я та прізвище:</strong> {user.displayName || "Не вказано"}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button onClick={handleLogout} className="logout-button">
                                Вийти з профіля
                            </button>
                        </div>
                    ) : (
                        <p>Завантаження даних...</p>
                    )}
                </div>
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

export default MyProfile;