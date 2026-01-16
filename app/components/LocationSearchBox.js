// "use client";
// import { useEffect, useMemo, useState, useCallback, useRef } from "react";
// import { Country, State, City } from "country-state-city";
// import { MapPin } from "lucide-react";

// export default function LocationSearchBox({
//   value = "",
//   onChange,
//   placeholder = "Search location (City, State, Country)",
// }) {
//   const [query, setQuery] = useState(value);
//   const [results, setResults] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const containerRef = useRef(null);
//   const timeoutRef = useRef(null);

//   // 🔹 Memoized location builder with optimizations
//   const locations = useMemo(() => {
//     console.time('Location data build');
//     const list = [];
    
//     // Process in smaller chunks to prevent blocking
//     const countries = Country.getAllCountries();
    
//     // Limit initial processing to popular countries or load progressively
//     const popularCountryCodes = ['US', 'IN', 'GB', 'CA', 'AU', 'DE', 'FR', 'JP', 'BR', 'MX'];
    
//     // Process popular countries first
//     popularCountryCodes.forEach(code => {
//       const country = countries.find(c => c.isoCode === code);
//       if (country) {
//         State.getStatesOfCountry(country.isoCode).forEach((state) => {
//           const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
//           // Limit cities per state for initial load
//           cities.slice(0, 50).forEach((city) => {
//             list.push({
//               label: `${city.name}, ${state.name}, ${country.name}`,
//               city: city.name,
//               state: state.name,
//               country: country.name,
//               isoCode: country.isoCode,
//               stateCode: state.isoCode,
//             });
//           });
//         });
//       }
//     });
    
//     console.timeEnd('Location data build');
//     return list;
//   }, []);

//   // 🔹 Debounced search with cancellation
//   const performSearch = useCallback((searchQuery) => {
//     if (!searchQuery.trim()) {
//       setResults([]);
//       setIsLoading(false);
//       return;
//     }

//     const q = searchQuery.toLowerCase().trim();
    
//     // Use more efficient filtering
//     const filtered = [];
    
//     for (let i = 0; i < locations.length; i++) {
//       if (locations[i].label.toLowerCase().includes(q)) {
//         filtered.push(locations[i]);
//         if (filtered.length >= 8) break; // Early exit when we have enough results
//       }
//     }
    
//     setResults(filtered);
//     setIsLoading(false);
//     setOpen(true);
//   }, [locations]);

//   // 🔍 Optimized search effect with debouncing
//   useEffect(() => {
//     setIsLoading(true);
    
//     // Clear previous timeout
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
    
//     // Debounce search to prevent excessive filtering
//     timeoutRef.current = setTimeout(() => {
//       performSearch(query);
//     }, query.length > 2 ? 50 : 150); // Faster for longer queries

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [query, performSearch]);

//   // 🎯 Click outside handler
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleSelect = useCallback((loc) => {
//     setQuery(loc.label);
//     onChange(loc.label);
//     setOpen(false);
//   }, [onChange]);

//   // 🚀 Virtualization for large lists (basic implementation)
//   const renderResults = useMemo(() => {
//     if (!open || results.length === 0) return null;
    
//     return results.map((loc, idx) => (
//       <button
//         key={`${loc.isoCode}-${loc.stateCode}-${loc.city}-${idx}`}
//         onClick={() => handleSelect(loc)}
//         className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
//         onMouseDown={(e) => e.preventDefault()} // Prevent input blur on click
//       >
//         <p className="text-sm font-medium text-gray-700 truncate">
//           {loc.city}, {loc.state}
//         </p>
//         <p className="text-xs text-gray-500 truncate">{loc.country}</p>
//       </button>
//     ));
//   }, [results, open, handleSelect]);

//   return (
//     <div className="relative w-full" ref={containerRef}>
//       {/* Input */}
//       <div className="relative">
//         <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//         {/* <input
//           type="text"
//           value={query}
//           placeholder={placeholder}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setOpen(true)}
//           onKeyDown={(e) => {
//             if (e.key === 'Escape') setOpen(false);
//           }}
//           className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//           aria-label="Location search"
//           aria-expanded={open}
//           aria-controls="location-results"
//         /> */}
//         <input
//   type="text"
//   value={query}
//   placeholder={placeholder}
//   onChange={(e) => {
//     setQuery(e.target.value);
//     onChange("location", e.target.value);
//   }}
//   onFocus={() => setOpen(true)}
//   onKeyDown={(e) => {
//     if (e.key === "Escape") setOpen(false);
//   }}
//   className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
//  />
//         {isLoading && query.length > 0 && (
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//           </div>
//         )}
//       </div>

//       {/* Dropdown */}
//       {open && (results.length > 0 || isLoading) && (
//         <div
//           id="location-results"
//           className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200"
//           role="listbox"
//         >
//           {isLoading && query.length > 0 ? (
//             <div className="flex items-center justify-center px-4 py-8">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
//               <span className="text-sm text-gray-500">Searching...</span>
//             </div>
//           ) : results.length > 0 ? (
//             <>
//               <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b">
//                 <p className="text-xs text-gray-500 font-medium">
//                   {results.length} location{results.length !== 1 ? 's' : ''} found
//                 </p>
//               </div>
//               {renderResults}
//             </>
//           ) : query.length > 0 ? (
//             <div className="px-4 py-8 text-center">
//               <p className="text-sm text-gray-500">No locations found</p>
//               <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
//             </div>
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { Country, State, City } from "country-state-city";
import { MapPin, Loader2, X } from "lucide-react";

// 🌍 Priority list: Search these countries first
const POPULAR_ISO_CODES = ['US', 'IN', 'GB', 'CA', 'AU', 'DE', 'FR', 'JP', 'BR', 'MX'];

export default function LocationSearchBox({
  value = "",
  onChange,
  placeholder = "Search City, State, or Country...",
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  // ⚡ Efficient Search Function
  // Searches hierarchically and breaks early to save resources
  const searchLocations = useCallback((searchText) => {
    if (!searchText || searchText.length < 2) return [];

    const search = searchText.toLowerCase().trim();
    const matches = [];
    const limit = 10; // 🛑 Hard limit to prevent rendering lag

    // Helper to add unique results
    const addResult = (item) => {
      if (matches.length >= limit) return false; // Stop if limit reached
      matches.push(item);
      return true;
    };

    // 1️⃣ Get Priority Countries
    const allCountries = Country.getAllCountries();
    const priorityCountries = allCountries.filter(c => POPULAR_ISO_CODES.includes(c.isoCode));
    const otherCountries = allCountries.filter(c => !POPULAR_ISO_CODES.includes(c.isoCode));
    
    // Combine arrays efficiently
    const searchSpace = [...priorityCountries, ...otherCountries];

    // 2️⃣ Start Search Loop
    // We use a labeled loop to break out of nested loops instantly
    searchLoop: for (const country of searchSpace) {
      
      // A. Match Country Name
      if (country.name.toLowerCase().includes(search)) {
        const added = addResult({
          label: `${country.name}`,
          type: "Country",
          city: "",
          state: "",
          country: country.name,
          isoCode: country.isoCode
        });
        if (!added) break searchLoop;
      }

      // Optimization: Only look deep into states/cities if we haven't found enough country matches
      // OR if the search query is long enough to likely be a city
      
      const states = State.getStatesOfCountry(country.isoCode);

      for (const state of states) {
        // B. Match State Name
        if (state.name.toLowerCase().includes(search)) {
           const added = addResult({
            label: `${state.name}, ${country.name}`,
            type: "State",
            city: "",
            state: state.name,
            country: country.name,
            isoCode: country.isoCode
          });
          if (!added) break searchLoop;
        }

        // C. Match City Name
        // Only search cities if query is long enough (perf optimization)
        if (search.length >= 3) {
           const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
           
           for (const city of cities) {
             if (city.name.toLowerCase().includes(search)) {
               const added = addResult({
                label: `${city.name}, ${state.name}, ${country.name}`,
                type: "City",
                city: city.name,
                state: state.name,
                country: country.name,
                isoCode: country.isoCode
              });
              if (!added) break searchLoop;
             }
           }
        }
      }
    }

    return matches;
  }, []);

  // 🕒 Debounced Search Effect
  useEffect(() => {
    // If query is empty, clear results
    if (!query) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      // Run the search in a non-blocking way
      const found = searchLocations(query);
      setResults(found);
      setIsLoading(false);
      if (found.length > 0) setOpen(true);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutRef.current);
  }, [query, searchLocations]);

  // 🖱️ Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Selection Handler
  const handleSelect = (loc) => {
    setQuery(loc.label);
    setOpen(false);
    
    // Normalize the onChange to pass data clearly
    // Checks if onChange expects an event or a value
    if (onChange) onChange(loc.label); 
  };

  const clearQuery = () => {
      setQuery("");
      setResults([]);
      if(onChange) onChange("");
  }

  return (
    <div className="relative w-full font-sans" ref={containerRef}>
      <div className="relative group">
        <MapPin 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" 
            size={18} 
        />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
              if (results.length > 0) setOpen(true);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
        />

        {/* Loading Spinner or Clear Button */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
                <Loader2 className="animate-spin text-blue-500" size={16} />
            ) : query.length > 0 ? (
                <button onClick={clearQuery} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600">
                    <X size={14} />
                </button>
            ) : null}
        </div>
      </div>

      {/* Results Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl shadow-blue-500/10 max-h-[300px] overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 bg-gray-50/90 backdrop-blur-sm px-4 py-2 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Locations
          </div>
          <div className="py-1">
            {results.map((loc, idx) => (
              <button
                key={`${loc.isoCode}-${idx}`}
                onClick={() => handleSelect(loc)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 group flex flex-col gap-0.5"
              >
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                        {loc.city || loc.state || loc.country}
                    </span>
                    {loc.type !== 'City' && (
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">
                            {loc.type}
                        </span>
                    )}
                </div>
                
                <span className="text-xs text-gray-400 group-hover:text-blue-500/70 truncate">
                  {[loc.city, loc.state, loc.country].filter(Boolean).join(", ")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* No Results State */}
      {open && !isLoading && query.length > 2 && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg p-4 text-center">
            <p className="text-sm text-gray-500">No locations found for "{query}"</p>
        </div>
      )}
    </div>
  );
}