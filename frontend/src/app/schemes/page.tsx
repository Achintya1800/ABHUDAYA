"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Search, Share2, Clock, Building2, Users, MoreVertical, Bookmark } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { SchemeDetailModal } from "@/components/schemes-detail-modal"
import ChatbotWidget from "@/components/chatbotWidget"
// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

interface Scheme {
  id: string
  ministry: string
  title: string
  description: string
  visits: number
  tags: string[]
  state?: string
  grant?: string
  eligibilityPercentage?: number
  statistics?: {
    centers?: string
    beneficiaries?: string
    houses?: string
    families?: string
    subscribers?: string
    disbursed?: string
  }
  deadline?: string
  // missingDocuments?: string[]
  emoji?: string
  rating?: number
  reviews?: number
}

const filters = [
  {
    id: "state",
    label: "State",
    options: ["All States", "Assam", "Bihar", "Delhi", "Gujarat", "Maharashtra", "Puducherry"],
  },
  {
    id: "gender",
    label: "Gender",
    options: ["All", "Male", "Female", "Transgender"],
  },
  {
    id: "age",
    label: "Age",
    options: ["All Ages", "0-18", "19-40", "41-60", "60+"],
  },
  {
    id: "caste",
    label: "Caste",
    options: ["All", "General", "OBC", "SC", "ST"],
  },
  {
    id: "level",
    label: "Level",
    options: ["All Levels", "Central", "State"],
  },
  {
    id: "residence",
    label: "Residence",
    options: ["All", "Rural", "Urban"],
  },
  {
    id: "minority",
    label: "Minority",
    options: ["All", "Yes", "No"],
  },
  {
    id: "differently-abled",
    label: "Differently Abled",
    options: ["All", "Yes", "No"],
  },
  {
    id: "benefit-type",
    label: "Benefit Type",
    options: ["All Types", "Cash", "Kind", "Service"],
  },
  {
    id: "dbt-scheme",
    label: "DBT Scheme",
    options: ["All", "Yes", "No"],
  },
  {
    id: "marital-status",
    label: "Marital Status",
    options: ["All", "Single", "Married", "Widowed"],
  },
  {
    id: "disability-percentage",
    label: "Disability Percentage",
    options: ["All", "40-60%", "60-80%", "80%+"],
  },
  {
    id: "below-poverty-line",
    label: "Below Poverty Line",
    options: ["All", "Yes", "No"],
  },
  {
    id: "economic-distress",
    label: "Economic Distress",
    options: ["All", "Yes", "No"],
  },
  {
    id: "government-employee",
    label: "Government Employee",
    options: ["All", "Yes", "No"],
  },
  {
    id: "employment-status",
    label: "Employment Status",
    options: ["All", "Employed", "Unemployed", "Self-Employed"],
  },
  {
    id: "student",
    label: "Student",
    options: ["All", "Yes", "No"],
  },
  {
    id: "occupation",
    label: "Occupation",
    options: ["All", "Farmer", "Farm Labor", "Agricultural Worker", "Other"],
  },
  {
    id: "application-mode",
    label: "Application Mode",
    options: ["All", "Online", "Offline", "Both"],
  },
]

export default function SchemesPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [allSchemes, setAllSchemes] = useState([])
  const [displayedSchemes, setDisplayedSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [totalSchemes, setTotalSchemes] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [selectedFilters, setSelectedFilters] = useState(() => {
    const initialFilters = Object.fromEntries(filters.map((filter) => [filter.id, filter.options[0]]))
    const category = searchParams.get("category")
    if (category) {
      initialFilters.category = category
    }
    return initialFilters
  })

  const [sortOrder, setSortOrder] = useState("a-z")
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState([])

  // Function to get category emoji
  const getCategoryEmoji = (category) => {
    const emojiMap = {
      agriculture: "🌾",
      education: "📚",
      health: "🏥",
      housing: "🏠",
      employment: "💼",
      welfare: "🤲",
      financial: "💰",
      rural: "🏞",
      urban: "🏙",
    }
    return emojiMap[category?.toLowerCase()] || "📋"
  }

  // Parse documents requirements into an array
  const parseDocuments = (docString) => {
    if (!docString) return []
    return docString
      .split(";")
      .map((doc) => doc.trim())
      .filter(Boolean)
  }

  // Function to transform API data to match frontend Scheme interface
  const transformSchemeData = (data) => {
    return data.map((scheme, index) => ({
      id: scheme._id?.$oid || index.toString(),
      ministry: scheme.ministry,
      title: scheme.title || "Untitled Scheme",
      description: scheme.description || "No description available",
      state: scheme.state || undefined,
      visits: Math.floor(Math.random() * 10000),
      tags: [scheme.tag1, scheme.tag2, scheme.tag3, scheme.tag4, scheme.tag5].filter(Boolean),

      grant: `₹${scheme.benefits || 10}`,
      eligibilityPercentage: Math.floor(Math.random() * 30) + 70, // Random between 70-100%
      statistics: {
        beneficiaries: scheme.benefits ? `${Math.floor(Math.random() * 1000) + 500},000` : "N/A",
        disbursed: scheme.benefits ? `₹${Math.floor(Math.random() * 100) + 10} Crore` : "N/A",
      },
      deadline: Math.floor(Math.random() * 100) + " days left to apply",
      missingDocuments: parseDocuments(scheme.docReq).slice(0, 2),
      emoji: getCategoryEmoji(scheme.Category),
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 200) + 50,
    }))
  }

  // Function to fetch all schemes using axios
  const fetchAllSchemes = async () => {
    try {
      setLoading(true)
      const response = await api.get("/schemes/all")
      const data = response.data
      console.log(data)
      // Transform backend data to match frontend Scheme interface
      const transformedData = transformSchemeData(data)
      setAllSchemes(transformedData)
      setTotalSchemes(transformedData.length)
      setTotalPages(Math.ceil(transformedData.length / itemsPerPage))
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      setAllSchemes([])
      setTotalSchemes(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  // Function to search schemes by keyword using axios
  const searchSchemes = async (keyword) => {
    try {
      setLoading(true)
      const response = await api.get("/schemes/bykey", {
        params: {
          keyword,
          page: currentPage,
          limit: itemsPerPage,
        },
      })
      const data = response.data

      // Transform backend data to match frontend Scheme interface
      const transformedData = transformSchemeData(data)
      setAllSchemes(transformedData)
      setTotalSchemes(transformedData.length)
      setTotalPages(Math.ceil(transformedData.length / itemsPerPage))

      // Don't reset current page if using pagination
      if (!keyword) {
        setCurrentPage(1) // Reset to first page on new search only
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      setAllSchemes([])
      setTotalSchemes(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  // Function to filter schemes based on selected filters
  const filterSchemes = (filters = selectedFilters) => {
    const state = filters.state !== "All States" ? filters.state : null
    const gender = filters.gender !== "All" ? filters.gender : null
    const caste = filters.caste !== "All" ? filters.caste : null
    const level = filters.level !== "All Levels" ? filters.level : null
    const residence = filters.residence !== "All" ? filters.residence : null
    const minority = filters.minority !== "All" ? filters.minority : null
    const differentlyAbled = filters["differently-abled"] !== "All" ? filters["differently-abled"] : null
    const benefitType = filters["benefit-type"] !== "All Types" ? filters["benefit-type"] : null
    const dbtScheme = filters["dbt-scheme"] !== "All" ? "DBT" : null
    const maritalStatus = filters["marital-status"] !== "All" ? filters["marital-status"] : null
    const belowPovertyLine = filters["below-poverty-line"] !== "All" ? filters["below-poverty-line"] : null
    const occupation = filters.occupation !== "All" ? filters.occupation : null
    const student = filters.student !== "All" ? "Student" : null

    const keywordFromFilters =
      state ||
      gender ||
      caste ||
      level ||
      residence ||
      minority ||
      differentlyAbled ||
      benefitType ||
      dbtScheme ||
      maritalStatus ||
      belowPovertyLine ||
      occupation ||
      student

    if (keywordFromFilters) {
      searchSchemes(keywordFromFilters)
    } else if (searchQuery) {
      searchSchemes(searchQuery)
    } else {
      fetchAllSchemes()
    }
  }

  // Debounced search effect (filters apply instantly, but search is delayed)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchSchemes(searchQuery)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  useEffect(() => {
    getPaginatedSchemes()
  }, [allSchemes, currentPage])

  // Apply pagination to get current schemes
  const getPaginatedSchemes = () => {
    const indexOfLastScheme = currentPage * itemsPerPage
    const indexOfFirstScheme = indexOfLastScheme - itemsPerPage
    setDisplayedSchemes(allSchemes.slice(indexOfFirstScheme, indexOfLastScheme))
  }

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber !== "...") {
      setCurrentPage(pageNumber)
    }
  }

  // Effect to load schemes on initial render
  useEffect(() => {
    // Create a cancellation token source for axios request
    const cancelTokenSource = axios.CancelToken.source()

    fetchAllSchemes()

    // Clean up function to cancel any pending requests when component unmounts
    return () => {
      cancelTokenSource.cancel("Component unmounted")
    }
  }, [])

  // Effect to handle search changes
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchSchemes(searchQuery)
      } else {
        filterSchemes()
      }
    }, 500)

    return () => {
      clearTimeout(delayDebounceFn)
      cancelTokenSource.cancel("New search initiated")
    }
  }, [searchQuery])

  // Effect to handle filter changes
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()

    filterSchemes()

    return () => {
      cancelTokenSource.cancel("Filter changed")
    }
  }, [selectedFilters])

  // Effect to handle sort order
  useEffect(() => {
    if (allSchemes.length === 0) return

    const sortedSchemes = [...allSchemes]

    switch (sortOrder) {
      case "a-z":
        sortedSchemes.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "z-a":
        sortedSchemes.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "visits":
        sortedSchemes.sort((a, b) => b.visits - a.visits)
        break
      case "rating":
        sortedSchemes.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setAllSchemes(sortedSchemes)
  }, [sortOrder])

  // Effect to update displayed schemes when page changes or all schemes change
  useEffect(() => {
    getPaginatedSchemes()
  }, [currentPage, allSchemes])

  const handleShare = async (scheme) => {
    const shareText = `Check out ${scheme.title} - ${scheme.grant}

Eligibility: ${scheme.eligibilityPercentage}%
Deadline: ${scheme.deadline}

Apply now on MyScheme`
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
    window.open(shareUrl, "_blank")
  }

  const toggleBookmark = (schemeId) => {
    setBookmarkedSchemes((prev) =>
      prev.includes(schemeId) ? prev.filter((id) => id !== schemeId) : [...prev, schemeId],
    )
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleFilterChange = (filterId, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [filterId]: value,
      }

      setCurrentPage(1) // Reset to first page when filters change
      return updatedFilters
    })
  }

  useEffect(() => {
    filterSchemes(selectedFilters)
  }, [selectedFilters])

  const resetFilters = () => {
    const resetFilters = Object.fromEntries(filters.map((filter) => [filter.id, filter.options[0]]))
    setSelectedFilters(resetFilters)
    setSearchQuery("")
    setCurrentPage(1)
    fetchAllSchemes()
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisibleButtons = 5

    // Show just a few buttons with ellipsis for many pages
    if (totalPages <= maxVisibleButtons) {
      // Show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)

      if (currentPage > 2) {
        // Show ellipsis after first page if current page is not near the beginning
        pageNumbers.push("...")
      }

      // Show current page and neighbors
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        if (i === 1 || i === totalPages) continue // Skip first and last which are always shown
        pageNumbers.push(i)
      }

      if (currentPage < totalPages - 1) {
        // Show ellipsis before last page if current page is not near the end
        pageNumbers.push("...")
      }

      // Always show last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5 mr-1" />
              All Schemes
            </Link>
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search Schemes"
                className="pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto" onClick={resetFilters}>
                Reset
              </Button>
            </div>
            <Accordion type="multiple" className="space-y-2">
              {filters.map((filter) => (
                <AccordionItem
                  key={filter.id}
                  value={filter.id}
                  className={`border rounded-lg ${
                    selectedFilters[filter.id] !== filter.options[0] ? "border-blue-500 bg-blue-50" : ""
                  }`}
                >
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="text-sm font-medium flex items-center justify-between w-full">
                      {filter.label}
                      {selectedFilters[filter.id] !== filter.options[0] && (
                        <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700 border-blue-300">
                          {selectedFilters[filter.id]}
                        </Badge>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            name={filter.id}
                            value={option}
                            checked={selectedFilters[filter.id] === option}
                            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                            className="text-blue-600 focus:ring-blue-600"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg font-semibold">
                Total <span className="text-blue-600">{totalSchemes}</span> Schemes Available
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-z">Scheme Name (A-Z)</SelectItem>
                    <SelectItem value="z-a">Scheme Name (Z-A)</SelectItem>
                    <SelectItem value="visits">Most Visited</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-red-800 font-semibold mb-2">Error loading schemes</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchAllSchemes}>Try Again</Button>
              </div>
            ) : displayedSchemes.length === 0 ? (
              <div className="text-center p-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No schemes found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedSchemes.map((scheme) => (
                  <Card key={scheme.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          {scheme.state && <div className="text-sm text-gray-600">{scheme.state}</div>}
                          <div className="text-sm text-gray-600">{scheme.ministry}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{scheme.emoji}</span>
                            <h3 className="text-xl font-semibold text-blue-600">{scheme.title}</h3>
                          </div>
                          <div className="flex items-center gap-4">
                            {scheme.tags && scheme.tags[0] && (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                {scheme.tags[0]}
                              </Badge>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-yellow-600">{scheme.rating} ★</span>
                              <span className="text-sm text-gray-600">({scheme.reviews} reviews)</span>
                            </div>
                          </div>
                          <p className="text-gray-600">{scheme.grant}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleShare(scheme)}>
                            <Share2 className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleBookmark(scheme.id)
                            }}
                          >
                            <Bookmark
                              className={`h-5 w-5 ${
                                bookmarkedSchemes.includes(scheme.id) ? "fill-yellow-400 text-yellow-400" : ""
                              }`}
                            />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="px-4 py-3 border-t border-b">
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-1">
                          <div className="text-3xl font-bold text-blue-600">{scheme.eligibilityPercentage}%</div>
                          <div className="text-sm text-gray-600">Eligible</div>
                        </div>
                        <div className="flex gap-6 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Beneficiaries</div>
                              <div className="font-medium">{scheme.statistics?.beneficiaries || "N/A"}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Disbursed</div>
                              <div className="font-medium">{scheme.statistics?.disbursed || "N/A"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-blue-600">
                        <Clock className="h-4 w-4" />
                        <span>{scheme.deadline}</span>
                      </div>
                      {/* <ChatbotWidget/> */}
                      <Button variant="outline" onClick={() => setSelectedScheme(scheme)}>
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && displayedSchemes.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                  {getPageNumbers().map((pageNumber, index) => (
                    <Button
                      key={index}
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 ${pageNumber === "..." ? "cursor-default" : ""}`}
                      disabled={pageNumber === "..."}
                    >
                      {pageNumber}
                    </Button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          isOpen={!!selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </div>
  )
}