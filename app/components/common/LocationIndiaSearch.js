"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, MapPin, X } from "lucide-react";
import { Country, State, City } from "country-state-city";

export default function LocationIndiaSearchInput({
    value = "",
    onChange,
    placeholder = "Search city or state",
    label,
    disabled = false,
}) {
    const [query, setQuery] = useState(value);
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    // 🇮🇳 Build India locations once
    const locations = useMemo(() => {
        const india = Country.getCountryByCode("IN");
        if (!india) return [];

        const data = [];

        State.getStatesOfCountry(india.isoCode).forEach((state) => {
            City.getCitiesOfState(india.isoCode, state.isoCode).forEach((city) => {
                data.push({
                    city: city.name,
                    state: state.name,
                    country: india.name,
                    label: `${city.name}, ${state.name}, ${india.name}`,
                });
            });
        });

        return data;
    }, []);

    // 🔍 SEARCH + SUGGESTIONS
    useEffect(() => {
        if (!open) return;

        const q = query.toLowerCase();

        const filtered = locations
            .filter((loc) =>
                loc.label.toLowerCase().includes(q)
            )
            .slice(0, 8);

        setResults(filtered);
    }, [query, open, locations]);

    // ❌ Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelect = (loc) => {
        setQuery(loc.label);
        setOpen(false);
        onChange && onChange(loc);
    };

    const clearValue = () => {
        setQuery("");
        setResults([]);
        setOpen(false);
        onChange && onChange(null);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            {/* INPUT */}
            <div className="relative">
                <input
                    type="text"
                    label="Location"
                    value={query}
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    className="w-full borderw-full px-6 py-3
                      border-2 border-[#dbdbdb]
                      rounded-full
                      text-[#717171]  font-medium 
                       text-[14px]       
                      transition-all duration-200
                      bg-transparent
                      "
                />

                {query ? (
                    <button
                        onClick={clearValue}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                ) : (
                    <Search className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
                )}
            </div>

            {/* DROPDOWN */}
            {open && results.length > 0 && (
                <div
                    className="absolute z-[9999] mt-1 w-full rounded-lg border bg-white shadow-lg max-h-60 overflow-y-auto"
                >
                    {results.map((loc, idx) => (
                        <button
                            key={idx}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelect(loc);
                            }}
                            className="flex w-full gap-2 px-4 py-2 text-left hover:bg-gray-100"
                        >
                            <MapPin className="mt-1 h-4 w-4 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {loc.city}, {loc.state}
                                </p>
                                <p className="text-xs text-gray-500">{loc.country}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* No results */}
            {open && query && results.length === 0 && (
                <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-500">
                    No locations found
                </div>
            )}
        </div>
    );
}
