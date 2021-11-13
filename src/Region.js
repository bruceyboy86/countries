const Region = (props) => {
  return (
    <>
      <label htmlFor="regionSearch">Choose a Region:</label>
      <select
        name="regions"
        id="regionSearch"
        aria-label="Choose a Region"
        onChange={(e) => {
          props.setRegion(e.target.value);
        }}
        value={props.region}
      >
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
};

export default Region;
