import { configureStore } from "@reduxjs/toolkit";
import globalStoreDefault from "./Stores/globalStore";

export const store = configureStore({
  reducer: {
    globalStore: globalStoreDefault,
  },
});
