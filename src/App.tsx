import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "./components";
import { searchIcon, spinnerIcon } from "./assets/svgs";

function App() {
  const [cityName, setCityName] = useState("lagos");
  const [cityData, setCityData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_KEY = "4e390c4c44fcd728e7c86d8c882463ce";

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      getData();
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(URL);
      setCityData(data);
    } catch (e: any) {
      if (e.response.status === 404) {
        setErrorMessage("City not found, please check the spelling.");
      }
      setCityData({});
      console.debug(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app overlay">
      <Input
        className="search-input"
        value={cityName}
        onChange={handleCityChange}
        onKeyUp={handleSearch}
        placeholder="Search"
        icon={searchIcon}
        alt="Search city"
        onClickIcon={getData}
      />
      <main>
        {loading && (
          <img className="centered" src={spinnerIcon} alt="loading spinner" />
        )}
        {!loading && Object.keys(cityData).length !== 0 && (
          <div className="city-data">
            <p className="text-md">
              {cityData?.name}, {cityData?.sys?.country}
            </p>
            <h2 className="text-lg">{cityData?.main?.temp}&#8451;</h2>
            <div className="weather-description">
              <span>{cityData?.weather[0]?.description}</span>
              <img
                src={`http://openweathermap.org/img/wn/${cityData?.weather[0]?.icon}.png`}
                alt={cityData?.weather[0]?.description}
              />
            </div>
            <div className="other-data">
              <div>
                <h4>Pressure</h4>
                <p>{cityData?.main?.pressure}hPa</p>
              </div>
              <div>
                <h4>Humidity</h4>
                <p>{cityData?.main?.humidity}%</p>
              </div>
              <div>
                <h4>Wind Speed</h4>
                <p>{cityData?.wind?.speed}m/s</p>
              </div>
            </div>
          </div>
        )}
        {!loading && Object.keys(cityData).length === 0 && (
          <h3 className="text-md centered">{errorMessage}</h3>
        )}
      </main>
    </div>
  );
}

export default App;
