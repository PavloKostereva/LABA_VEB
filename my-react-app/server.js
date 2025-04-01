import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const initializeApp = async () => {
  try {
    const serviceAccount = JSON.parse(
      await readFile(join(__dirname, 'serviceAccountKey.json'), 'utf8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://volonter-27646.firebaseio.com"
    });

    const db = admin.firestore();

    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));
    app.use(express.json());

    app.get('/', (req, res) => {
      res.status(200).json({
        status: 'Сервер працює',
        endpoints: {
          ratings: {
            get: '/api/initiatives/:id/rating',
            post: '/api/initiatives/:id/rate'
          }
        }
      });
    });

    app.get('/api/initiatives/:id/rating', async (req, res) => {
      try {
        const { id } = req.params;
        
        if (!id) {
          return res.status(400).json({ error: 'Потрібен ID ініціативи' });
        }

        const snapshot = await db.collection('ratings')
          .where('initiativeId', '==', id)
          .get();

        if (snapshot.empty) {
          return res.status(200).json({ 
            averageRating: 0,
            count: 0,
            ratings: []
          });
        }

        let sum = 0;
        const ratingsData = [];
        
        snapshot.forEach(doc => {
          const data = doc.data();
          sum += data.rating;
          ratingsData.push(data);
        });

        const averageRating = parseFloat((sum / snapshot.size).toFixed(2));
        
        res.status(200).json({
          averageRating,
          count: snapshot.size,
          ratings: ratingsData
        });
      } catch (error) {
        console.error('Помилка отримання рейтингів:', error);
        res.status(500).json({ 
          error: 'Не вдалося отримати рейтинги',
          details: error.message 
        });
      }
    });

    app.post('/api/initiatives/:id/rate', async (req, res) => {
      try {
        const { id } = req.params;
        const { userId, rating } = req.body;

        if (!id || !userId || rating === undefined) {
          return res.status(400).json({ error: 'Недостатньо даних' });
        }

        const numRating = Number(rating);
        if (isNaN(numRating) || numRating < 1 || numRating > 5) {
          return res.status(400).json({ error: 'Рейтинг має бути від 1 до 5' });
        }

        const existingRating = await db.collection('ratings')
          .where('initiativeId', '==', id)
          .where('userId', '==', userId)
          .limit(1)
          .get();

        let operation;
        if (!existingRating.empty) {
          await db.collection('ratings').doc(existingRating.docs[0].id).update({ 
            rating: numRating,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          operation = 'updated';
        } else {
          await db.collection('ratings').add({
            initiativeId: id,
            userId,
            rating: numRating,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          operation = 'created';
        }

        const updatedRatings = await db.collection('ratings')
          .where('initiativeId', '==', id)
          .get();

        let sum = 0;
        updatedRatings.forEach(doc => {
          sum += doc.data().rating;
        });

        const averageRating = parseFloat((sum / updatedRatings.size).toFixed(2));

        res.status(200).json({
          averageRating,
          count: updatedRatings.size,
          operation
        });

      } catch (error) {
        console.error('Помилка додавання рейтингу:', error);
        res.status(500).json({ 
          error: 'Не вдалося додати рейтинг',
          details: error.message 
        });
      }
    });


    app.use((req, res) => {
      res.status(404).json({
        error: 'Маршрут не знайдено',
        availableEndpoints: [
          'GET    /api/initiatives/:id/rating',
          'POST   /api/initiatives/:id/rate'
        ]
      });
    });

    app.listen(PORT, () => {
      console.log(`Сервер запущено на http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Помилка ініціалізації сервера:', error);
    process.exit(1);
  }
};

initializeApp();