import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalStore: {
    showLoading: false,
    db: [],
    prev: [],
    loggedUser: { user: "demo" },
    editingItem: undefined,
    isSigningUp: false,
    reloadSelectionItems: false,
    // {
    //   coordinates: [],
    //   additionalCosts: [],
    //   additionalText: [],
    // },
    tempPrev: [],
    prevMainObject: {},
  },
};

export const globalStoreSlice = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.globalStore = { ...state.globalStore, ...action.payload };
    },
    // reload: (state) => {
    //   state.profileData.reload = !state.profileData.reload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  setState,
  //reload,
} = globalStoreSlice.actions;

export const getglobalStoreObject = (state) => state.globalStore.globalStore;

export default globalStoreSlice.reducer;
