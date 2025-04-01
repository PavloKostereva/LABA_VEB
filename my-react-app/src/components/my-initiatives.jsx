import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../js/firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import '../assets/css/all.css';

const MyInitiatives = () => {
  const [myInitiatives, setMyInitiatives] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserInitiatives(currentUser.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserInitiatives = async (userId) => {
    try {
      const initiativesSnapshot = await getDocs(collection(db, "initiatives"));
      const userInitiatives = [];
      
      initiativesSnapshot.forEach((doc) => {
        const initiativeData = doc.data();
        if (initiativeData.volunteers && 
            initiativeData.volunteers.some(volunteer => volunteer.userId === userId)) {
          userInitiatives.push({ id: doc.id, ...initiativeData });
        }
      });
      
      setMyInitiatives(userInitiatives);
    } catch (error) {
      console.error("Error fetching initiatives: ", error);
    } finally {
      setLoading(false);
    }
  };

  const leaveInitiative = async (initiativeId) => {
    if (!user) return;

    try {
      const initiativeRef = doc(db, "initiatives", initiativeId);
      const initiativeDoc = await getDoc(initiativeRef);
      
      if (!initiativeDoc.exists()) {
        console.error("Initiative not found");
        return;
      }

      const initiativeData = initiativeDoc.data();
      const updatedVolunteers = initiativeData.volunteers.filter(
        volunteer => volunteer.userId !== user.uid
      );
      
      await updateDoc(initiativeRef, {
        volunteers: updatedVolunteers,
        neededVolunteers: initiativeData.neededVolunteers + 1
      });
      
      setMyInitiatives(prev => prev.filter(item => item.id !== initiativeId));
    } catch (error) {
      console.error("Error leaving initiative: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/initiatives">Initiatives</Link></li>
            <li><Link to="/my-initiatives">My Initiatives</Link></li>
            <li><Link to="/about">About</Link></li>
            <li className="log_in_m"><Link to="/log_in">Login <i className="bx bx-log-in"></i></Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>

      <main id="my-initiatives-container">
        <h2>My Initiatives</h2>
        {!user ? (
          <p>Please log in to view your initiatives.</p>
        ) : myInitiatives.length > 0 ? (
          <div className="grid-container">
            {myInitiatives.map((initiative) => (
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
                  <p><strong>Volunteers Needed:</strong> {initiative.neededVolunteers}</p>
                  <p className="description">{initiative.description}</p>
                  <button 
                    className="leave-btn" 
                    onClick={() => leaveInitiative(initiative.id)}
                  >
                    Leave
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>You haven't joined any initiatives yet.</p>
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

export default MyInitiatives;