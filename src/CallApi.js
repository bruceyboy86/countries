import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";

const CallApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [countries, setcountries] = useState(null);
  const [searchInput, setSearchInput] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        url: !!searchInput
          ? `https://restcountries.com/v3.1/name/${searchInput}?fullText=true`
          : `https://restcountries.com/v3.1/all`
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
      <Input
        searchInput={searchInput}
        countries={countries}
        setSearchInput={setSearchInput}
      />
      {!isLoading && hasError && <span>no match</span>}
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
