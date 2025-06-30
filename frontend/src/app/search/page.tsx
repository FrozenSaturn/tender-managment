// frontend/src/app/search/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { searchCompanies } from "@/libs/api";

type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  logo_url: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Company[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const data = await searchCompanies(query);
    setResults(data);
    setSearched(true);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Search for Companies</h1>
      <form onSubmit={handleSearch} className="mb-8 flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, industry, product, or service..."
          className="w-full px-4 py-2 border rounded-l-md"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-r-md"
        >
          Search
        </button>
      </form>

      <div>
        {searched && results.length === 0 && <p>No companies found.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((company) => (
            <div key={company.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{company.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{company.industry}</p>
              <p className="text-gray-700">{company.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
