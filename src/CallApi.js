import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import Region from "./Region";

const CallApi = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [countries, setcountries] = useState(null);
  const [region, setRegion] = useState("Europe");
  const [searchInput, setSearchInput] = useState("");

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
          setcountries(
            response.data.filter((cntry) => cntry.region === region)
          );
          setHasError(false);
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
    fetchData().catch(console.error);
  }, [searchInput, region]);

  return (
    <>
      {!isLoading && hasError && <span>no match</span>}
      {isLoading && <div>spinner</div>}
      {!isLoading && countries && (
        <>
          <Region region={region} setRegion={setRegion} />

          <Input
            searchInput={searchInput}
            countries={countries}
            setSearchInput={setSearchInput}
          />
          <ul>
            {countries.map((item) => (
              <li key={item?.name?.common}>{item?.name?.common}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CallApi;
