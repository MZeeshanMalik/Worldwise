

import React, { useReducer, useEffect, createContext, useContext } from "react";

const CitiesContext = createContext();

const data = [
  {
    id: "9357",
    cityName: "Lahore",
    country: "Pakistan",
    emoji: "🇵🇰",
    date: "2024-07-18T07:01:04.077Z",
    notes: "",
    position: {
      lat: "31.514331077323305",
      lng: "74.27032470703126",
    },
  },
  {
    id: "0871",
    cityName: "Kasur",
    country: "Pakistan",
    emoji: "🇵🇰",
    date: "2024-07-18T07:10:42.965Z",
    notes: "",
    position: {
      lat: "31.102508701050045",
      lng: "74.44799423217775",
    },
  },
  {
    id: "4ba1",
    cityName: "Tarn Taran",
    country: "India",
    emoji: "🇮🇳",
    date: "2024-07-18T07:10:42.965Z",
    notes: "nice",
    position: {
      lat: "31.433434130515177",
      lng: "74.70082436946352",
    },
  },
];

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return { ...state, cities: [...state.cities, action.payload], currentCity: action.payload };
    case "city/deleted":
      return { ...state, cities: state.cities.filter(city => city.id !== action.payload) };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

// eslint-disable-next-line react/prop-types
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

  // Initial data load
  useEffect(() => {
    dispatch({ type: "loading" });
    // Simulating a fetch request with local data
    setTimeout(() => {
      dispatch({ type: "cities/loaded", payload: data });
    }, 1000);
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const city = data.find(city => city.id === id);
      dispatch({ type: "city/loaded", payload: city });
    } catch {
      dispatch({ type: "rejected", payload: "There was an error in loading the city data." });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "city/created", payload: newCity });
    } catch {
      dispatch({ type: "rejected", payload: "There was an error in creating the city." });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "There was an error in deleting the city." });
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity, error }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

