import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalType: null, // 'details' | 'confirmDelete'
  quizId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.modalType = payload.type; // 'details' або 'confirmDelete'
      state.quizId = payload.quizId;
    },
    closeModal: state => {
      state.isOpen = false;
      state.modalType = null;
      state.quizId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
