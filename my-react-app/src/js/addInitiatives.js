// import { db } from "../js/firebase"; // Імпортуємо Firestore
// import { collection, addDoc } from "firebase/firestore";

// // Ваші ініціативи
// const storedInitiatives = [
//   {
//     id: 1,
//     title: "Допомога дітям",
//     date: "2025-03-10",
//     place: "Київ",
//     neededVolunteers: 10,
//     type: "Соціальні",
//     img: "help1",
//     description: "Допомога дітям у дитячому будинку.",
//   },
//   {
//     id: 2,
//     title: "Прибирання парку",
//     date: "2025-03-15",
//     place: "Львів",
//     neededVolunteers: 20,
//     type: "Соціальні",
//     img: "help1",
//     description: "Організоване прибирання місцевого парку.",
//   },
//   // Додайте решту ініціатив
// ];

// // Функція для додавання ініціатив до Firestore
// const addInitiativesToFirestore = async () => {
//   try {
//     for (const initiative of storedInitiatives) {
//       await addDoc(collection(db, "initiatives"), initiative);
//       console.log(`Ініціатива "${initiative.title}" додана до Firestore.`);
//     }
//     console.log("Всі ініціативи успішно додані до Firestore.");
//   } catch (error) {
//     console.error("Помилка під час додавання ініціатив: ", error);
//   }
// };

// // Викликаємо функцію для додавання ініціатив
// addInitiativesToFirestore();