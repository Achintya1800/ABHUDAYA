"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EligibilityForm } from "./eligibility-form"

// Define the type for a scheme object
type Scheme = {
  title: string;
  description: string;
  benefits?: string;
  tag1?: string;
  tag2?: string;
  tag3?: string;
  tag4?: string;
  tag5?: string;
};

export function SearchBar() {
  const [query, setQuery] = useState<string>("")
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [showEligibility, setShowEligibility] = useState(false)
  const limit = 5 // Number of results per page

  // Fetch schemes from backend
  const fetchSchemes = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get<Scheme[]>(`http://localhost:4000/api/schemes/bykey`, {
        params: { keyword: query, page, limit }
      })
      setSchemes(response.data)
    } catch (err) {
      setError("Failed to fetch schemes")
    } finally {
      setLoading(false)
    }
  }

  // Handle search button click
  const handleSearch = () => {
    if (query.trim() !== "") {
      setPage(1)
      fetchSchemes()
    }
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="relative flex items-center">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search for schemes, categories, or ministries"
              className="h-12 pl-12 pr-4 text-lg w-full rounded-l-full rounded-r-none border-r-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
          <Button className="h-12 rounded-l-none rounded-r-full bg-blue-600 hover:bg-blue-700 text-white px-6" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outline" className="ml-2 h-12 px-4">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full h-12 text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={() => setShowEligibility(true)}
        >
          Explore Eligible Schemes
        </Button>
      </div>

      {showEligibility && <EligibilityForm onClose={() => setShowEligibility(false)} />}

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}

      <div className="grid gap-6">
        {schemes.length > 0 ? (
          schemes.map((scheme, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold text-blue-600">{scheme.title}</h2>
              <p className="text-gray-600">{scheme.description}</p>
              <p className="text-lg font-bold text-green-600">Benefit: {scheme.benefits || "N/A"}</p>
              <div className="mt-2 text-sm text-gray-500">
                Tags: {[scheme.tag1, scheme.tag2, scheme.tag3, scheme.tag4, scheme.tag5].filter(Boolean).join(", ")}
              </div>
              <Button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                View Detail
              </Button>
            </div>
          ))
        ) : (
          !loading && !error && <p className="text-gray-500">No schemes found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {schemes.length > 0 && (
        <div className="mt-4 flex justify-between">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </Button>
          <span>Page {page}</span>
          <Button variant="outline" disabled={schemes.length < limit} onClick={() => setPage((prev) => prev + 1)}>
            Next
          </Button>
        </div>
      )}
    </>
  )
}
