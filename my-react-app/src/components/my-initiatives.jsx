import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../js/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import '../assets/css/all.css';

const MyInitiatives = () => {
  const [myInitiatives, setMyInitiatives] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserInitiatives(currentUser.uid);
      }
    });
  }, []);

  const fetchUserInitiatives = async (userId) => {
    try {
      const q = query(collection(db, "userInitiatives"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const initiativesList = querySnapshot.docs.map((doc) => doc.data().initiative);
      setMyInitiatives(initiativesList);
    } catch (error) {
      console.error("Помилка під час отримання ініціатив: ", error);
    }
    };
    

  const leaveInitiative = async (initiativeId) => {
    if (!user) return;

    try {
        await deleteDoc(doc(db, "userInitiatives", `${user.uid}_${initiativeId}`));
        
      const updatedInitiatives = myInitiatives.filter((item) => item.id !== initiativeId);
      setMyInitiatives(updatedInitiatives);
    } catch (error) {
      console.error("Помилка під час видалення ініціативи: ", error);
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
            <li><Link to="/profile">Профіль</Link></li>
          </ul>
        </nav>
      </header>

      <main id="my-initiatives-container">
        <h2>Мої ініціативи</h2>
        {myInitiatives.length > 0 ? (
          <div className="grid-container">
            {myInitiatives.map((initiative) => (
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