import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  grade: 'all',
  language: 'all',
  dealType: 'all',
  minPrice: 0,
  maxPrice: 2000,
  page: 1,
  sort: 'newest',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setFilterParam: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
      state.page = 1;
    },
    resetFilters: (state) => {
      state.search = '';
      state.grade = 'all';
      state.language = 'all';
      state.dealType = 'all';
      state.minPrice = 0;
      state.maxPrice = 2000;
      state.page = 1;
      state.sort = 'newest';
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setSearchQuery, setFilterParam, resetFilters, setPage } = filterSlice.actions;
export default filterSlice.reducer;
