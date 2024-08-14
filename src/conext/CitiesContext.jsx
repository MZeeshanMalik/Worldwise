import React, { useReducer } from "react";
import { createContext, useEffect, useContext } from "react";
const CitiesContext = createContext();
const Base_Url = "http://localhost:8000/cities";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: false
}

function reducer(state , action){
  switch (action.type) {
    case 'loading':
      return {
        isLoading: true
      };
    case 'cities/loaded':
      return {
        ...state , isLoading: false , cities: action.payload
      };
      case 'city/loaded':
        return{        
        ...state , isLoading: false , currentCity: action.payload
      };
    case 'city/deleted':
      return{
        ...state , cities: [...state.cities.filter(city=>city.id !== action.payload)]
      };
    case 'city/created':
      return{
        ...state , cities: [...state.cities , action.payload],currentCity: action.payload
      };
    case 'rejected':
      return{
        ...state,
        isLoading: false, 
        error: action.payload
      };
    
    default:
      throw new Error("Unknown action type");
      
  }
}

// eslint-disable-next-line react/prop-types
function CitiesProvider({children}) {
  const [{cities , isLoading , currentCity,error}  , dispatch] = useReducer(reducer , initialState)
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsloading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetctCities() {
      try {
        const res = await fetch(Base_Url);
        const data = await res.json();
        dispatch({ type: "cities/loaded" , payload: data});

      } catch {
        console.error('error in fetching data')
        dispatch({type: 'rejected' , payload: "There was an error in Loading data."})
      } 
    }
    fetctCities();
  }, []);
  async function getCity(id) {
    try {
      const res = await fetch(`${Base_Url}/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded" , payload: data})
    } catch {
      dispatch({type: 'rejected' , payload: "There was an error in Loading data."})
    } 
  }
  async function createCity(newCity) {
    try {
      
      const res = await fetch(`${Base_Url}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({type: 'city/created' , payload: data})
    } catch {
      dispatch({type: 'rejected' , payload: "There was an error in Loading data."})
    }
  }
  async function deleteCity(id) {
    try {
      
      await fetch(`${Base_Url}/${id }`, {
        method: "DELETE",
      });
      dispatch({type: 'city/deleted' , payload: id})
    } catch {
      dispatch({type: 'rejected' , payload: "There was an error in Loading data."})
    } 
  }
  
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw Error("Context is not in the scope");
  
  return context;
}

export { CitiesProvider, useCities };
