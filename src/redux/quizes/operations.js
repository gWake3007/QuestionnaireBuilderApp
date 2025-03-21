import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../api/firebaseAPI.js';
import { addDoc, getDocs, collection } from 'firebase/firestore';
