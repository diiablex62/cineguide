import { createContext } from "react";

const initialState = {
  articles: [],
  selectedArticle: null,
  setSelectedArticle: () => {},
  loading: false,
  error: null,
};

export const ActuContext = createContext(initialState);
