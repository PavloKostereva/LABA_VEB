import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../js/firebase";
import axios from 'axios';
import '../assets/css/all.css';

const InitiativesPage = () => {
  const [initiatives, setInitiatives] = useState([]);
  const [myInitiatives, setMyInitiatives] = useState([]);
  const [cityFilter, setCityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [ratings, setRatings] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "initiatives"));
        const initiativesData = [];
        
        querySnapshot.forEach((doc) => {
          initiativesData.push({ id: doc.id, ...doc.data() });
        });

        setInitiatives(initiativesData);
        
        initiativesData.forEach(async (initiative) => {
          await fetchRating(initiative.id);
        });
      } catch (error) {
        console.error("Error fetching initiatives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [cityFilter, dateFilter, typeFilter]);
  const fetchRating = async (initiativeId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/initiatives/${initiativeId}/rating`,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      setAverageRatings(prev => ({
        ...prev,
        [initiativeId]: {
          average: parseFloat(response.data.averageRating).toFixed(2),
          count: response.data.count
        }
      }));
    } catch (error) {
      console.error("Помилка отримання рейтингу:", error);
      setAverageRatings(prev => ({
        ...prev,
        [initiativeId]: {
          average: 0,
          count: 0
        }
      }));
    }
  };

  const handleJoinClick = async (initiative) => {
    // Check if user is logged in
    if (!auth.currentUser) {
      navigate('/log_in'); // Redirect to login page
      return;
    }

    // Check if already joined
    if (myInitiatives.some(item => item.id === initiative.id)) {
      return;
    }

    // Check if there are available spots
    if (initiative.neededVolunteers <= 0) {
      return;
    }

    try {
      const initiativeRef = doc(db, "initiatives", initiative.id);
      const user = auth.currentUser;
      
      await updateDoc(initiativeRef, {
        volunteers: arrayUnion({
          name: user.displayName || "Anonymous",
          email: user.email,
          userId: user.uid
        }),
        neededVolunteers: initiative.neededVolunteers - 1
      });

      // Update local state
      const updatedInitiatives = initiatives.map(item => {
        if (item.id === initiative.id) {
          return {
            ...item,
            neededVolunteers: item.neededVolunteers - 1,
            volunteers: [...(item.volunteers || []), {
              name: user.displayName || "Anonymous",
              email: user.email,
              userId: user.uid
            }]
          };
        }
        return item;
      });

      setInitiatives(updatedInitiatives);
      setMyInitiatives(prev => [...prev, {
        ...initiative,
        neededVolunteers: initiative.neededVolunteers - 1
      }]);
      
    } catch (error) {
      console.error("Error joining initiative:", error);
    }
  };

 const handleRating = async (initiativeId, rating) => {
  try {
    if (!auth.currentUser) {
      alert('Please log in to rate initiatives');
      navigate('/log_in');
      return;
    }
    
    const response = await axios.post(
      `http://localhost:3001/api/initiatives/${initiativeId}/rate`,
      {
        userId: auth.currentUser.uid,
        rating: Number(rating)
      }
    );

    // Update local state with transformed data
    setAverageRatings(prev => ({
      ...prev,
      [initiativeId]: {
        average: parseFloat(response.data.averageRating).toFixed(2),
        count: response.data.count
      }
    }));
    
    // Update user's rating
    setRatings(prev => ({ ...prev, [initiativeId]: rating }));
    
  } catch (error) {
    console.error("Rating error:", error.response?.data || error.message);
  }
};


const renderRatingStars = (initiativeId) => {
  const ratingData = averageRatings[initiativeId] || { average: 0, count: 0 };
  const userRating = ratings[initiativeId] || 0;

  return (
    <div className="rating-container">
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= userRating ? "active" : ""}`}
            onClick={() => handleRating(initiativeId, star)}
          >
            {star <= userRating ? "★" : "☆"}
          </span>
        ))}
      </div>
      
      {ratingData.count > 0 && (
        <div className="average-rating">
          Average: {ratingData.average} ({ratingData.count} votes)
        </div>
      )}
    </div>
  );
};

  const filteredInitiatives = initiatives
    .filter((initiative) => cityFilter === "all" || initiative.place === cityFilter)
    .filter((initiative) => dateFilter === "all" || new Date(initiative.date) >= new Date())
    .filter((initiative) => typeFilter === "all" || initiative.type === typeFilter);

  const handleDateSort = (e) => {
    const sorted = [...filteredInitiatives].sort((a, b) => {
      return e.target.value === "oldest" 
        ? new Date(a.date) - new Date(b.date) 
        : new Date(b.date) - new Date(a.date);
    });
    setInitiatives(sorted);
  };

  const paginatedInitiatives = filteredInitiatives.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="initiatives-page">
      <header>
        <div className="head-logo">
          <div className="logo">
            <i className="bx bx-shield-plus"></i>
            <h4>Helping Hands</h4>
          </div>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/initiatives">Initiatives</Link></li>
            <li><Link to="/my-initiatives">My Initiatives</Link></li>
            <li><Link to="/about">About</Link></li>
            <li className="log_in_m">
              <Link to="/log_in">Login <i className="bx bx-log-in"></i></Link>
            </li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Available Initiatives</h2>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="city-filter">City:</label>
            <select 
              id="city-filter" 
              onChange={(e) => setCityFilter(e.target.value)} 
              value={cityFilter}
            >
              <option value="all">All Cities</option>
              <option value="Київ">Kyiv</option>
              <option value="Львів">Lviv</option>
              <option value="Одеса">Odesa</option>
              <option value="Харків">Kharkiv</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="date-filter">Date:</label>
            <select 
              id="date-filter" 
              onChange={(e) => setDateFilter(e.target.value)} 
              value={dateFilter}
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type-filter">Type:</label>
            <select 
              id="type-filter" 
              onChange={(e) => setTypeFilter(e.target.value)} 
              value={typeFilter}
            >
              <option value="all">All Types</option>
              <option value="Соціальні">Social</option>
              <option value="Екологія">Ecology</option>
              <option value="Допомога тваринам">Animal Help</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">Sort:</label>
            <select id="sort" onChange={handleDateSort}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading initiatives...</div>
        ) : (
          <>
            <div className="grid-container">
              {paginatedInitiatives.map((initiative) => (
                <article key={initiative.id} className="initiative-card">
                  <img 
                    src={`/assets/img/${initiative.img}`} 
                    alt={initiative.title} 
                    onError={(e) => {
                      e.target.src = '../src/assets/img/img_initiatives/help1.jpg';
                    }}
                  />
                  <div className="initiative-content">
                    <h3>{initiative.title}</h3>
                    <p><strong>Date:</strong> {new Date(initiative.date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {initiative.place}</p>
                    <p>
                      <strong>Volunteers Needed:</strong> 
                      <span className={`volunteers-needed ${initiative.neededVolunteers <= 0 ? "full" : ""}`}>
                        {initiative.neededVolunteers}
                      </span>
                    </p>
                    <p><strong>Type:</strong> {initiative.type}</p>
                    <p className="description">{initiative.description}</p>
                    
                    {renderRatingStars(initiative.id)}
                    
                    <button
                      className={`join-btn ${initiative.neededVolunteers <= 0 || myInitiatives.some(item => item.id === initiative.id) ? "joined" : ""}`}
                      onClick={() => handleJoinClick(initiative)}
                      disabled={initiative.neededVolunteers <= 0 || myInitiatives.some(item => item.id === initiative.id)}
                    >
                      {initiative.neededVolunteers <= 0 
                        ? "No spots left" 
                        : myInitiatives.some(item => item.id === initiative.id) 
                          ? "You're joined" 
                          : "Join"}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="pagination">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>Page {page}</span>
              <button 
                onClick={() => setPage(p => p + 1)}
                disabled={page * itemsPerPage >= filteredInitiatives.length}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      <footer>
        <p>Join us and be part of the change!</p>
        <p>
          Contacts:
          <a href="mailto:volunteer@initiative.org">volunteer@initiative.org</a> |
          <a href="tel:+380991234567">+380 99 123 45 67</a>
        </p>
        <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default InitiativesPage;