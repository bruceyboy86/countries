import React, { useState, useEffect } from "react";
import axios from "axios";

const CallApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [countries, setcountries] = useState(null);
  const [searchInput, setSearchInput] = useState("uk");

  const Input = () => {
    return (
      <>
        <label for="countrySearch">Choose a country:</label>
        <input
          list="countries"
          id="countrySearch"
          name="countrySearch"
          aria-label="Search through countries"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <datalist id="countries">
          {countries &&
            countries.map((item) => (
              <option key={item?.name?.official} value={item?.name?.official} />
            ))}
        </datalist>
      </>
    );
  };
  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        url: "https://restcountries.com/v3.1/all"
      };

      setIsLoading(true);

      await axios
        .request(options)
        .then((response) => {
          setcountries(response.data);
          setHasError(false);
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
    fetchData().catch(console.error);
  }, [searchInput]);

  return (
    <>
      <Input />
      {console.log(countries && countries.map((r) => r.name.official))}
      {!isLoading && hasError && <span>error</span>}
      {isLoading && <div>spinner</div>}
      {!isLoading && countries && (
        <ul>
          {countries.map((item) => (
            <li key={item?.name?.official}>{item?.name?.official}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CallApi;
