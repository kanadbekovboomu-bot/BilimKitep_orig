import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (filterParams, { rejectWithValue }) => {
    try {
      const response = await api.getBooks(filterParams);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка загрузки книг');
    }
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id, { rejectWithValue }) => {
    try {
      const book = await api.getBookById(id);
      return book;
    } catch (err) {
      return rejectWithValue(err.message || 'Книга не найдена');
    }
  }
);

export const createBookListing = createAsyncThunk(
  'books/createBookListing',
  async (formData, { rejectWithValue }) => {
    try {
      const newBook = await api.createBook(formData);
      return newBook;
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка добавления книги');
    }
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updated = await api.updateBook(id, data);
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка обновления книги');
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteBook(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка удаления книги');
    }
  }
);

export const addReviewToBook = createAsyncThunk(
  'books/addReviewToBook',
  async ({ bookId, review }, { rejectWithValue }) => {
    try {
      const updated = await api.addReview(bookId, review);
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка добавления отзыва');
    }
  }
);

const initialState = {
  items: [],
  selectedBook: null,
  loading: false,
  error: null,
  totalPages: 1,
  totalItems: 0,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchBookById
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createBookListing
      .addCase(createBookListing.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.totalItems += 1;
      })
      // updateBook
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.items.findIndex((b) => b.id === action.payload.id);
        if (index > -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedBook?.id === action.payload.id) {
          state.selectedBook = action.payload;
        }
      })
      // deleteBook
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload);
        state.totalItems = Math.max(0, state.totalItems - 1);
        if (state.selectedBook?.id === action.payload) {
          state.selectedBook = null;
        }
      })
      // addReviewToBook
      .addCase(addReviewToBook.fulfilled, (state, action) => {
        if (state.selectedBook?.id === action.payload.id) {
          state.selectedBook = action.payload;
        }
        const index = state.items.findIndex((b) => b.id === action.payload.id);
        if (index > -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { clearSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;
