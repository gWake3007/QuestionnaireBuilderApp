import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { db } from '../../api/firebaseAPI.js';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

//? Take all quizzes
export const fetchQuizzes = createAsyncThunk(
  'quizzes/fetchQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'quizzes'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? Added quiz
export const addQuiz = createAsyncThunk(
  'quizzes/addQuiz',
  async (newQuiz, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'quizzes'), newQuiz);
      toast.success('The quiz was successfully added!');
      return { id: docRef.id, ...newQuiz };
    } catch (error) {
      toast.error('Failed to add quiz. Please try again!');
      return rejectWithValue(error.message);
    }
  }
);

//? Update quiz
export const updateQuiz = createAsyncThunk(
  'quizzes/updateQuiz',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'quizzes', id);
      await updateDoc(docRef, updatedData);
      toast.success('The quiz was successfully changed!');
      return { id, ...updatedData };
    } catch (error) {
      toast.error('Failed to change quiz. Please try again!');
      return rejectWithValue(error.message);
    }
  }
);

//? Delete quiz
export const deleteQuiz = createAsyncThunk(
  'quizzes/deleteQuiz',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'quizzes', id));
      toast.success('The quiz was successfully deleted!');
      return id;
    } catch (error) {
      toast.error('Failed to delete quiz. Please try again!');
      return rejectWithValue(error.message);
    }
  }
);
