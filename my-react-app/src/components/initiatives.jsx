import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../assets/css/all.css';
import help1 from '../assets/img/img_initiatives/help1.jpg';
import { db, auth } from "../js/firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

const InitiativesPage = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [myInitiatives, setMyInitiatives] = useState([]);
  const [cityFilter, setCityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [ratings, setRatings] = useState({}); // для оцінок

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "initiatives"));
        const initiativesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInitiatives(initiativesList);
      } catch (error) {
        console.error("Помилка під час отримання ініціатив: ", error);
      }
    };

    fetchInitiatives();
  }, []);

  // Додавання нової ініціативи
  const addInitiative = async () => {
    try {
      const docRef = await addDoc(collection(db, "initiatives"), {
        title: "Допомога дітям",
        date: "2025-03-10",
        place: "Львів",
        neededVolunteers: 10,
        type: "Соціальні",
        img: "help1.jpg",
        description: "Допомога дітям у дитячому будинку.",
      });
      console.log("Документ успішно створено з ID: ", docRef.id);
    } catch (error) {
      console.error("Помилка при додаванні документа: ", error);
    }
  };

  const handleJoinClick = (initiative) => {
    setSelectedInitiative(initiative);
    setShowModal(true);
  };

  const handleConfirmJoin = async () => {
    if (!userName || !userEmail) return;
    const updatedInitiatives = [...initiatives];
    const initiativeIndex = updatedInitiatives.findIndex(
      (item) => item.id === selectedInitiative.id
    );

    if (initiativeIndex !== -1 && updatedInitiatives[initiativeIndex].neededVolunteers > 0) {
      updatedInitiatives[initiativeIndex].neededVolunteers--;
      setInitiatives(updatedInitiatives);

      const updatedMyInitiatives = [...myInitiatives, updatedInitiatives[initiativeIndex]];
      setMyInitiatives(updatedMyInitiatives);

      // Збереження ініціативи користувача в Firestore
      if (auth.currentUser) {
        await setDoc(doc(db, "userInitiatives", `${auth.currentUser.uid}_${selectedInitiative.id}`), {
          userId: auth.currentUser.uid,
          initiativeId: selectedInitiative.id,
          initiative: selectedInitiative,
        });
      }
    }

    setShowModal(false);
    setUserName("");
    setUserEmail("");
  };

  // Функція для оцінювання
  const handleRating = async (initiativeId, rating) => {
    if (!auth.currentUser) {
      alert("Будь ласка, увійдіть, щоб залишити оцінку.");
      return;
    }

    try {
      await setDoc(doc(db, "ratings", `${auth.currentUser.uid}_${initiativeId}`), {
        userId: auth.currentUser.uid,
        initiativeId,
        rating,
      });

      setRatings((prevRatings) => ({
        ...prevRatings,
        [initiativeId]: rating,
      }));

      console.log("Оцінка успішно додана!");
    } catch (error) {
      console.error("Помилка під час додавання оцінки: ", error);
    }
  };

  const renderRatingStars = (initiativeId) => {
    const currentRating = ratings[initiativeId] || 0;

    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= currentRating ? "active" : ""}`}
            onClick={() => handleRating(initiativeId, star)}
          >
            ☆
          </span>
        ))}
      </div>
    );
  };

  // Фільтрація ініціатив
  const filteredInitiatives = initiatives
    .filter((initiative) => cityFilter === "all" || initiative.place === cityFilter)
    .filter((initiative) => dateFilter === "all" || new Date(initiative.date) >= new Date())
    .filter((initiative) => typeFilter === "all" || initiative.type === typeFilter);

  // Сортування за датою
  const handleDateSort = (e) => {
    const sorted = [...filteredInitiatives].sort((a, b) => {
      if (e.target.value === "oldest") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setInitiatives(sorted);
  };

  const handleCityFilter = (e) => setCityFilter(e.target.value);
  const handleTypeFilter = (e) => setTypeFilter(e.target.value);

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
            <button onClick={addInitiative}>Додати ініціативу</button>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Доступні ініціативи</h2>

        <label htmlFor="city-filter">Фільтр за містом:</label>
        <select id="city-filter" onChange={handleCityFilter} value={cityFilter}>
          <option value="all">Всі міста</option>
          <option value="Київ">Київ</option>
          <option value="Львів">Львів</option>
          <option value="Одеса">Одеса</option>
          <option value="Харків">Харків</option>
          <option value="Дніпро">Дніпро</option>
        </select>

        <label htmlFor="date-filter">Сортувати за датою:</label>
        <select id="date-filter" onChange={handleDateSort}>
          <option value="all">Всі дати</option>
          <option value="oldest">Фільтрувати спочатку всі новіші</option>
          <option value="newest">Фільтрувати спочатку всі старіші</option>
        </select>

        <label htmlFor="type-filter">Тип ініціативи:</label>
        <select id="type-filter" onChange={handleTypeFilter} value={typeFilter}>
          <option value="all">Тип ініціативи: </option>
          <option value="Соціальні">Соціальні</option>
          <option value="Екологія">Екологія</option>
          <option value="Допомога тваринам">Допомога тваринам</option>
        </select>

        <div className="grid-container" id="initiatives-container">
          {filteredInitiatives.map((initiative) => (
            <article key={initiative.id} className="initiative-card">
              <img src={initiative.img} alt={initiative.title} />
              <div className="initiative-text">{initiative.title}</div>
              <h3>{initiative.title}</h3>
              <p><strong>Дата:</strong> {initiative.date}</p>
              <p><strong>Місце:</strong> {initiative.place}</p>
              <p><strong>Залишилось волонтерів:</strong> <span className="volunteers-needed">{initiative.neededVolunteers}</span></p>
              <p><strong>Тип зустрічі:</strong> {initiative.type}</p>
              <p>{initiative.description}</p>
              
              {renderRatingStars(initiative.id)}
              <button
                className="join-btn"
                onClick={() => handleJoinClick(initiative)}
                disabled={initiative.neededVolunteers <= 0 || myInitiatives.some(item => item.id === initiative.id)}
              >
                {initiative.neededVolunteers <= 0 || myInitiatives.some(item => item.id === initiative.id) ? "Ви приєдналися" : "Приєднатися"}
              </button>
            </article>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Введіть ваші дані</h3>
            <input
              type="text"
              placeholder="Ваше ім'я"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Ваш Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button onClick={handleConfirmJoin}>Підтвердити</button>
            <button onClick={() => setShowModal(false)}>Скасувати</button>
          </div>
        </div>
      )}

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

export default InitiativesPage;