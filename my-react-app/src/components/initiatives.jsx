import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../assets/css/all.css';
import help1 from '../assets/img/img_initiatives/help1.jpg';

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

  useEffect(() => {
    const storedInitiatives = JSON.parse(localStorage.getItem("initiatives")) || [
      { id: 1, title: "Допомога дітям", date: "2025-03-10", place: "Київ", neededVolunteers: 10, type: "Соціальні", img: help1, description: "Допомога дітям у дитячому будинку." },
      { id: 2, title: "Прибирання парку", date: "2025-03-15", place: "Львів", neededVolunteers: 20, img: help1, description: "Організоване прибирання місцевого парку." },
      { id: 3, title: "Плетіння маскувальних сіток", date: "2025-03-20", place: "Одеса", neededVolunteers: 15, img: help1, description: "Допомога у плетінні сіток для військових." },
      { id: 4, title: "Допомога літнім людям", date: "2025-03-25", place: "Харків", neededVolunteers: 5, img: help1, description: "Збір продуктів та ліків для людей похилого віку." },

      { id: 5, title: "Збір одягу для нужденних", date: "2025-04-05", place: "Дніпро", neededVolunteers: 12, img: help1, description: "Організація збору та роздачі одягу для малозабезпечених." },
      { id: 7, title: "Допомога дітям", date: "2025-03-10", place: "Київ", neededVolunteers: 10, img: help1, description: "Допомога дітям у дитячому будинку." },
      { id: 8, title: "Прибирання парку", date: "2025-03-15", place: "Львів", neededVolunteers: 20, img: help1, description: "Організоване прибирання місцевого парку." },
      { id: 9, title: "Плетіння маскувальних сіток", date: "2025-03-20", place: "Одеса", neededVolunteers: 15, img: help1, description: "Допомога у плетінні сіток для військових." },
      { id: 10, title: "Допомога літнім людям", date: "2025-03-25", place: "Харків", neededVolunteers: 5, img: help1, description: "Збір продуктів та ліків для людей похилого віку." },
      { id: 11, title: "Збір одягу для нужденних", date: "2025-04-05", place: "Дніпро", neededVolunteers: 12, img: help1, description: "Організація збору та роздачі одягу для малозабезпечених." },
      { id: 12, title: "Еко-акція в лісі", date: "2025-04-10", place: "Київ", neededVolunteers: 30, img: help1, description: "Прибирання сміття та висадка дерев у місцевому лісі." },

      { id: 13, title: "Прибирання парку", date: "2025-03-15", place: "Львів", neededVolunteers: 20, img: help1, description: "Організоване прибирання місцевого парку." },
      { id: 14, title: "Плетіння маскувальних сіток", date: "2025-03-20", place: "Одеса", neededVolunteers: 15, img: help1, description: "Допомога у плетінні сіток для військових." },
      { id: 15, title: "Допомога літнім людям", date: "2025-03-25", place: "Харків", neededVolunteers: 5, img: help1, description: "Збір продуктів та ліків для людей похилого віку." },
      { id: 16, title: "Збір одягу для нужденних", date: "2025-04-05", place: "Дніпро", neededVolunteers: 12, img: help1, description: "Організація збору та роздачі одягу для малозабезпечених." },
      { id: 18, title: "Допомога дітям", date: "2025-03-10", place: "Київ", neededVolunteers: 10, img: help1, description: "Допомога дітям у дитячому будинку." },
      { id: 19, title: "Прибирання парку", date: "2025-03-15", place: "Львів", neededVolunteers: 20, img: help1, description: "Організоване прибирання місцевого парку." },
      { id: 20, title: "Плетіння маскувальних сіток", date: "2025-03-20", place: "Одеса", neededVolunteers: 15, img: help1, description: "Допомога у плетінні сіток для військових." },
      { id: 21, title: "Допомога літнім людям", date: "2025-03-25", place: "Харків", neededVolunteers: 5, img: help1, description: "Збір продуктів та ліків для людей похилого віку." },
      { id: 22, title: "Збір одягу для нужденних", date: "2025-04-05", place: "Дніпро", neededVolunteers: 12, img: help1, description: "Організація збору та роздачі одягу для малозабезпечених." },
      { id: 23, title: "Еко-акція в лісі", date: "2025-04-10", place: "Київ", neededVolunteers: 30, img: help1, description: "Прибирання сміття та висадка дерев у місцевому лісі." },

    ];
    setInitiatives(storedInitiatives);

    const storedMyInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];
    setMyInitiatives(storedMyInitiatives);
  }, []);

  const handleJoinClick = (initiative) => {
    setSelectedInitiative(initiative);
    setShowModal(true);
  };

  const handleConfirmJoin = () => {
    if (!userName || !userEmail) return;
    const updatedInitiatives = [...initiatives];
    const initiativeIndex = updatedInitiatives.findIndex(item => item.id === selectedInitiative.id);
    if (initiativeIndex !== -1 && updatedInitiatives[initiativeIndex].neededVolunteers > 0) {
      updatedInitiatives[initiativeIndex].neededVolunteers--;
      setInitiatives(updatedInitiatives);
      localStorage.setItem("initiatives", JSON.stringify(updatedInitiatives));
      const updatedMyInitiatives = [...myInitiatives, updatedInitiatives[initiativeIndex]];
      setMyInitiatives(updatedMyInitiatives);
      localStorage.setItem("myInitiatives", JSON.stringify(updatedMyInitiatives));
    }
    setShowModal(false);
    setUserName("");
    setUserEmail("");
  };

  const filteredInitiatives = initiatives
    .filter((initiative) => cityFilter === "all" || initiative.place === cityFilter)
    .filter((initiative) => dateFilter === "all" || new Date(initiative.date) >= new Date())
    .filter((initiative) => typeFilter === "all" || initiative.type === typeFilter);

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
            <i className="bx bx-shield-plus" ></i>
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
        
        <label htmlFor="date-filter">Фільтр за датою:</label>
        <select id="date-filter" onChange={handleDateSort}>
          <option value="all">Всі дати</option>
          <option value="oldest">Старіші</option>
          <option value="newest">Новіші</option>
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