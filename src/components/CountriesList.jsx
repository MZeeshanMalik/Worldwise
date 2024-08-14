/* eslint-disable react/react-in-jsx-scope */
// import CityItem from "./CityItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CounryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../conext/CitiesContext";
function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length)
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <Message message="Add your first city by clicking on a city on the map" />
    );
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log(cities);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CounryItem key={country.countryName} country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
