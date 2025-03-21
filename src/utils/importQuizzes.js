// import { db } from '../api/firebaseAPI.js';
// import { collection, addDoc } from 'firebase/firestore';

// // Функція для завантаження JSON у Firestore
// export const importQuizzes = async () => {
//   try {
//     // Отримуємо файл quizzes.json
//     const response = await fetch('/quizzes.json');
//     const quizzes = await response.json();

//     // Додаємо кожен квіз у Firestore
//     for (const quiz of quizzes) {
//       await addDoc(collection(db, 'quizzes'), quiz);
//     }

//     console.log('📦 JSON імпортовано у Firestore!');
//   } catch (error) {
//     console.error('❌ Помилка імпорту:', error);
//   }
// };
