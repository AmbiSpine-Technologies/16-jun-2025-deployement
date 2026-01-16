
"use client";
import { useEffect, useState, useCallback } from "react";
import { Country, State, City } from "country-state-city";
import SearchableDropdown from './SearchableDropdown';

export default function LocationSelector({
  onLocationChange,
  initialData = {},
  errors={}
}) {
  // Full Data Objects (ISO Codes ke liye zaroori hai)
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  // Selected Values (Sirf Naam Store karenge)
  const [selectedCountry, setSelectedCountry] = useState(initialData.country || "");
  const [selectedState, setSelectedState] = useState(initialData.state || "");
  const [selectedCity, setSelectedCity] = useState(initialData.city || "");

  // 1. Load Countries
  useEffect(() => {
    try {
      const allCountries = Country.getAllCountries();
      setCountries(allCountries); // Pura object store karein
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  }, []);

  // 2. Load States (Jab Country Change ho)
  useEffect(() => {
    try {
      if (selectedCountry) {
        // Name se Country Object dhundo taaki ISO Code mile
        const countryObj = countries.find((c) => c.name === selectedCountry);
        if (countryObj) {
          const statesData = State.getStatesOfCountry(countryObj.isoCode);
          setStates(statesData);
        }
      } else {
        setStates([]);
        setSelectedState("");
      }
    } catch (error) {
      console.error("Error loading states:", error);
      setStates([]);
    }
  }, [selectedCountry, countries]);

  // 3. Load Cities (Jab State Change ho)
  useEffect(() => {
    try {
      if (selectedCountry && selectedState) {
        const countryObj = countries.find((c) => c.name === selectedCountry);
        const stateObj = states.find((s) => s.name === selectedState);

        if (countryObj && stateObj) {
          const citiesData = City.getCitiesOfState(
            countryObj.isoCode,
            stateObj.isoCode
          );
          setCities(citiesData);
        }
      } else {
        setCities([]);
        setSelectedCity("");
      }
    } catch (error) {
      console.error("Error loading cities:", error);
      setCities([]);
    }
  }, [selectedCountry, selectedState, countries, states]);

  // 4. Parent ko Data bhejo
  const handleLocationUpdate = useCallback(() => {
    onLocationChange({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    });
  }, [selectedCountry, selectedState, selectedCity]);

  useEffect(() => {
    handleLocationUpdate();
  }, [handleLocationUpdate]);

  return (
    <div className="space-y-3">
      <div>
      {/* Country Dropdown */}
      <SearchableDropdown
        label="Country"
        name="country"
        placeholder="Select Country"
        // ✅ FIX 1: Sirf Name ka array pass karein
        options={countries.map((c) => c.name)} 
        value={selectedCountry}
        // ✅ FIX 2: Value direct set karein (SearchableDropdown string return karta hai)
        onChange={(val) => {
          setSelectedCountry(val);
          setSelectedState(""); // State reset
          setSelectedCity("");  // City reset
        }}
      />
{errors.country && <p className="text-red-500 text-xs mt-1 ml-2">{errors.country}</p>}
      </div>

      {/* State Dropdown */}
<div>
        <SearchableDropdown
        label="State / Province"
        name="state"
        placeholder="Select State"
        options={states.map((s) => s.name)}
        value={selectedState}
        onChange={(val) => {
          setSelectedState(val);
          setSelectedCity(""); // City reset
        }}
      />
{errors.state && <p className="text-red-500 text-xs mt-1 ml-2">{errors.state}</p>}
</div>
<div>
    {/* City Dropdown */}
      <SearchableDropdown
        label="City"
        name="city"
        placeholder="Select City"
        // ✅ FIX: Sirf Name pass karein
        options={cities.map((c) => c.name)}
        value={selectedCity}
        onChange={(val) => setSelectedCity(val)}
      />
      {errors.city && <p className="text-red-500 text-xs mt-1 ml-2">{errors.city}</p>}
</div>
  
    </div>
  );
}