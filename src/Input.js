const Input = (props) => {
  return (
    <>
      <label htmlFor="countrySearch">Choose a country:</label>
      <input
        list="countries"
        id="countrySearch"
        name="countrySearch"
        aria-label="Search through countries"
        value={props.searchInput}
        onChange={(e) => props.setSearchInput(e.target.value)}
      />
      <datalist id="countries">
        {props.countries?.map((item) => (
          <option key={item.name?.common} value={item.name?.common} />
        ))}
      </datalist>
    </>
  );
};

export default Input;
