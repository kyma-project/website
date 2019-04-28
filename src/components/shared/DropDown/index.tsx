import React, { useRef } from "react";
import useDropdown from "./useDropdown";

const Dropdown: React.FunctionComponent = () => {
  const coutriesEl = useRef(null);
  const countriesDropEl = useRef(null);
  const [countriesDropOpen, toggleCountriesDrop] = useDropdown(
    countriesDropEl,
    coutriesEl,
  );

  return (
    <>
      <div ref={coutriesEl} onClick={toggleCountriesDrop as any}>
        <span>Countries</span>
        <span>{countriesDropOpen ? "▲" : "▼"}</span>
      </div>
      <div ref={countriesDropEl} hidden={!countriesDropOpen}>
        <div>Greece</div>
        <div>Poland</div>
        <div>Spain</div>
      </div>
    </>
  );
};

export default Dropdown;
