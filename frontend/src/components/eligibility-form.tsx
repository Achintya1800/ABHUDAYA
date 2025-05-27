"use client"
 
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, HelpCircle, X } from "lucide-react"
import Link from "next/link"
// import type { FormData, SchemeCategory } from "@/types/form"
 
// types/form.ts
 
/**
 * Form data structure for the eligibility form
 */
export interface FormData {
  // Current step in the multi-step form
  step: number;
 
  // Basic details (Step 1)
  state: string;
  category: string; // General, OBC, PVTG, SC, ST
  gender: string; // Male, Female, Transgender
  isBPL: boolean;
  isDifferentlyAbled: boolean;
  isSeniorCitizen: boolean;
 
  // Additional info (Step 2)
  area: string; // Urban, Rural
  occupation: string;
  employmentStatus: string;
  isMinority: boolean;
}
 
/**
 * Structure for scheme categories to display in the UI
 */
export interface SchemeCategory {
  // Display name of the category
  name: string;
 
  // Number of schemes in this category
  count: number;
 
  // Emoji icon representing the category
  icon: string;
 
  // Tailwind CSS background color class
  color: string;
 
  // Optional original database category name (for filtering)
  dbCategory?: string;
}
 
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]
 
const occupations = [
  "agriculture",
  "Construction",
  "Education",
  "Healthcare",
  "IT",
  "Manufacturing",
  "Retail",
  "services",
  "Transportation",
  "Other",
]
 
const employmentStatuses = ["Employed", "Self-Employed", "Unemployed", "Student", "Homemaker", "Retired"]
 
interface Scheme {
  _id?: string;
  state?: string;
  title: string;
  description: string;
  Category?: string;
  gender?: string;
  caste?: string;
  ministry?: string;
  disabilityPercentage?: number;
  BPL?: string;
  eligibility?: string;
  gov_emp?: string;
  emp_status?: string;
  student?: string;
  occupation?: string;
  appMode?: string;
  docReq?: string;
  benefits?: number;
  DBT?: string;
  benefit_type?: string;
  marital_status?: string;
  differently_abled?: string;
  tag1?: string;
  tag2?: string;
  tag3?: string;
  tag4?: string;
  tag5?: string;
  [key: string]: any; // For any additional fields
}
 
// Define a mapping for categories to their respective icons and colors
const categoryMapping: Record<string, { icon: string, color: string }> = {
  "social": { icon: "👥", color: "bg-purple-50" },
  "banking": { icon: "🏦", color: "bg-blue-50" },
  "employment": { icon: "💼", color: "bg-green-50" },
  "education": { icon: "📚", color: "bg-red-50" },
  "health": { icon: "🏥", color: "bg-emerald-50" },
  "business": { icon: "💡", color: "bg-orange-50" },
  "utility": { icon: "🚰", color: "bg-cyan-50" },
  "agriculture": { icon: "🌾", color: "bg-lime-50" },
  "housing": { icon: "🏠", color: "bg-yellow-50" },
  "technology": { icon: "🔬", color: "bg-indigo-50" },
  "sports": { icon: "🏅", color: "bg-rose-50" },
  "transport": { icon: "🚆", color: "bg-slate-50" },
  // Default fallback
  "default": { icon: "📋", color: "bg-gray-50" }
};
 
// Map display names to DB fields
const displayToCategoryMap: Record<string, string> = {
  "Social welfare & Empowerment": "social",
  "Banking,Financial Services and Insurance": "banking",
  "Skills & Employment": "employment",
  "Education & Learning": "education",
  "Health & Wellness": "health",
  "Business & Entrepreneurship": "business",
  "Utility & Sanitation": "utility",
  "Agriculture,Rural & Environment": "agriculture",
  "Housing & Shelter": "housing",
  "Science, IT & Communications": "technology",
  "Sports & Culture": "sports",
  "Transport & Infrastructure": "transport"
};
 
interface EligibilityFormProps {
  onClose: () => void
}
 
export function EligibilityForm({ onClose }: EligibilityFormProps) {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    state: "",
    category: "Gen",
    gender: "Male",
    isBPL: false,
    isDifferentlyAbled: false,
    isSeniorCitizen: false,
    area: "",
    occupation: "",
    employmentStatus: "",
    isMinority: false,
  })
 
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [schemeCount, setSchemeCount] = useState(0);
  const [eligibleSchemes, setEligibleSchemes] = useState<SchemeCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [showSchemeDetails, setShowSchemeDetails] = useState(false);
 
  // Function to fetch schemes based on form data
  const fetchSchemes = async () => {
    setLoading(true);
 
    try {
      // Build query parameters
      const params = new URLSearchParams();
 
      // Collect all keywords from form data
      let keywords = [];
 
      // Add state
      if (formData.state) keywords.push(formData.state);
 
      // Add gender
      // if (formData.gender) keywords.push(formData.gender);
 
      // Add category/caste
      if (formData.category) keywords.push(formData.category);
 
      // Add boolean values as keywords
      // if (formData.isBPL) keywords.push("BPL");
      // if (formData.isDifferentlyAbled) keywords.push("Differently Abled");
      // if (formData.isSeniorCitizen) keywords.push("Senior Citizen");
 
      // Add area
      if (formData.area) keywords.push(formData.area);
 
      // Add occupation
      if (formData.occupation) keywords.push(formData.occupation);
 
      // Add employment status
      if (formData.employmentStatus) keywords.push(formData.employmentStatus);
 
      // Add minority status
      if (formData.isMinority) keywords.push("Minority");
 
      // Join all keywords with spaces
      if (keywords.length > 0) {
        params.append("keyword", keywords.join(" "));
      }
 
      // Add pagination parameters
      params.append("page", "1");
      params.append("limit", "10");
 
      // For simulation/testing - using mock data
      // In real implementation, use this:
      const response = await fetch(`http://localhost:4000/api/schemes/bykey?${params.toString()}`);
      const data = await response.json();
 
      // MOCK DATA for testing
      const mockData = [
        {
          "title": "Aam Aadmi Bima Yojana (Maharashtra)",
          "description": "Provides insurance and scholarship benefits to landless laborers in rural areas, aged 18 to 59 years.",
          "tag1": "Insurance",
          "tag2": "Scholarship",
          "tag3": "Accident",
          "tag4": "Disability",
          "tag5": "Student",
          "ministry": "Finance",
          "benefits": 10000,
          "Category": "social"
        },
        {
          "title": "PM Kisan Samman Nidhi",
          "description": "Financial benefit of Rs. 6000 per year in three equal installments to all landholding farmers' families.",
          "tag1": "Agriculture",
          "tag2": "Financial Aid",
          "tag3": "Farmers",
          "tag4": "Rural",
          "tag5": "Income Support",
          "ministry": "Agriculture",
          "benefits": 6000,
          "Category": "agriculture"
        },
        {
          "title": "Pradhan Mantri Jan Dhan Yojana",
          "description": "Financial inclusion program ensuring access to banking, insurance, and pension services.",
          "tag1": "Banking",
          "tag2": "Financial Inclusion",
          "tag3": "Insurance",
          "tag4": "Direct Benefit Transfer",
          "tag5": "Rural",
          "ministry": "Finance",
          "benefits": 0,
          "Category": "banking"
        },
        {
          "title": "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
          "description": "Guarantees 100 days of wage employment to rural households.",
          "tag1": "Employment",
          "tag2": "Wages",
          "tag3": "Rural Development",
          "tag4": "Poverty Alleviation",
          "tag5": "Government Jobs",
          "ministry": "Rural Development",
          "benefits": 24000,
          "Category": "employment"
        },
        {
          "title": "Pradhan Mantri Mudra Yojana",
          "description": "Provides loans up to Rs. 10 lakh to non-corporate, non-farm small/micro enterprises.",
          "tag1": "Loan",
          "tag2": "Small Business",
          "tag3": "Entrepreneurship",
          "tag4": "MSME",
          "tag5": "Finance",
          "ministry": "Finance",
          "benefits": 1000000,
          "Category": "entrepreneurship"
        },
        {
          "title": "Pradhan Mantri Awas Yojana (Urban)",
          "description": "Affordable housing scheme for urban poor with financial assistance.",
          "tag1": "Housing",
          "tag2": "Urban",
          "tag3": "Financial Aid",
          "tag4": "Subsidy",
          "tag5": "Construction",
          "ministry": "Housing and Urban Affairs",
          "benefits": 250000,
          "Category": "housing"
        },
        {
          "title": "Sukanya Samriddhi Yojana",
          "description": "Savings scheme for girl child with high-interest rates and tax benefits.",
          "tag1": "Savings",
          "tag2": "Education",
          "tag3": "Girl Child",
          "tag4": "Women Empowerment",
          "tag5": "Financial Security",
          "ministry": "Finance",
          "benefits": 500000,
          "Category": "social"
        },
        {
          "title": "Atal Pension Yojana",
          "description": "Pension scheme for unorganized sector workers with government contributions.",
          "tag1": "Pension",
          "tag2": "Retirement",
          "tag3": "Unorganized Workers",
          "tag4": "Financial Security",
          "tag5": "Savings",
          "ministry": "Finance",
          "benefits": 5000,
          "Category": "pension"
        },
        {
          "title": "Stand Up India Scheme",
          "description": "Provides bank loans between Rs. 10 lakh and Rs. 1 crore to SC/ST and women entrepreneurs.",
          "tag1": "Entrepreneurship",
          "tag2": "Loan",
          "tag3": "Women",
          "tag4": "SC/ST",
          "tag5": "MSME",
          "ministry": "Finance",
          "benefits": 10000000,
          "Category": "entrepreneurship"
        },
        {
          "title": "Ayushman Bharat Yojana (PMJAY)",
          "description": "Provides health coverage up to Rs. 5 lakh per family per year for secondary and tertiary care hospitalization.",
          "tag1": "Healthcare",
          "tag2": "Insurance",
          "tag3": "Hospitalization",
          "tag4": "Medical Aid",
          "tag5": "Rural",
          "ministry": "Health & Family Welfare",
          "benefits": 500000,
          "Category": "healthcare"
        },
        {
          "title": "National Rural Health Mission (NRHM)",
          "description": "Strengthening healthcare delivery in rural areas, ensuring free treatment.",
          "tag1": "Healthcare",
          "tag2": "Rural Development",
          "tag3": "Medical Services",
          "tag4": "Wellness",
          "tag5": "Public Health",
          "ministry": "Health & Family Welfare",
          "benefits": 0,
          "Category": "healthcare"
        },
        {
          "title": "Beti Bachao Beti Padhao",
          "description": "Promotes girl child education and welfare, preventing gender discrimination.",
          "tag1": "Education",
          "tag2": "Women Empowerment",
          "tag3": "Girl Child",
          "tag4": "Awareness",
          "tag5": "Social Welfare",
          "ministry": "Women & Child Development",
          "benefits": 0,
          "Category": "social"
        },
        {
          "title": "National Pension Scheme (NPS)",
          "description": "Retirement savings scheme offering tax benefits and financial security.",
          "tag1": "Pension",
          "tag2": "Retirement",
          "tag3": "Investment",
          "tag4": "Savings",
          "tag5": "Tax Benefits",
          "ministry": "Finance",
          "benefits": 0,
          "Category": "pension"
        },
        {
          "title": "Kisan Credit Card (KCC)",
          "description": "Provides farmers with credit facilities for crop production and allied activities.",
          "tag1": "Agriculture",
          "tag2": "Loan",
          "tag3": "Farmers",
          "tag4": "Financial Aid",
          "tag5": "Rural Economy",
          "ministry": "Agriculture",
          "benefits": 300000,
          "Category": "agriculture"
        },
        {
          "title": "Rajiv Gandhi Shramik Kalyan Yojana",
          "description": "Unemployment allowance scheme for workers who lose jobs due to retrenchment or closure.",
          "tag1": "Employment",
          "tag2": "Financial Support",
          "tag3": "Workers",
          "tag4": "Unemployment",
          "tag5": "Social Security",
          "ministry": "Labour and Employment",
          "benefits": 10000,
          "Category": "employment"
        },
        {
          "title": "PM Garib Kalyan Anna Yojana",
          "description": "Provides free ration to poor families during crises like COVID-19.",
          "tag1": "Food Security",
          "tag2": "Public Distribution",
          "tag3": "Rural",
          "tag4": "Subsidy",
          "tag5": "Welfare",
          "ministry": "Consumer Affairs, Food & Public Distribution",
          "benefits": 0,
          "Category": "welfare"
        }
      ];
 
 
      setSchemes(mockData);
      organizeSchemesByCategory(mockData);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    } finally {
      setLoading(false);
    }
  };
 
  // Organize schemes by category
  const organizeSchemesByCategory = (schemeData: Scheme[]) => {
    // Create a map to count schemes by category
    const categoryCountMap = new Map<string, number>();
 
    // Count schemes by category
    schemeData.forEach(scheme => {
      const category = scheme.Category?.toLowerCase() || "default";
      categoryCountMap.set(category, (categoryCountMap.get(category) || 0) + 1);
    });
 
    // Transform into the format needed for UI
    const categories: SchemeCategory[] = Array.from(categoryCountMap.entries()).map(([category, count]) => {
      const mappingKey = category in categoryMapping ? category : "default";
      const { icon, color } = categoryMapping[mappingKey];
 
      // Convert DB category to display name
      const displayName = Object.entries(displayToCategoryMap).find(
        ([, value]) => value === category
      )?.[0] || capitalizeFirstLetter(category);
 
      return {
        name: displayName,
        count,
        icon,
        color,
        dbCategory: category // Store original DB category for filtering
      };
    });
 
    setEligibleSchemes(categories);
    setSchemeCount(schemeData.length);
  };
 
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 
  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
 
  const goToNextStep = () => {
    if (formData.step < 3) {
      setFormData((prev) => ({ ...prev, step: prev.step + 1 }));
 
      // Fetch schemes when reaching the final step
      if (formData.step === 2) {
        fetchSchemes();
      }
    }
  };
 
  const goToPreviousStep = () => {
    if (formData.step > 1) {
      setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };
 
  // Filter schemes by selected category
  useEffect(() => {
    if (selectedCategory && schemes.length > 0) {
      const dbCategory = Object.entries(displayToCategoryMap).find(
        ([display]) => display === selectedCategory
      )?.[1] || selectedCategory.toLowerCase();
 
      const filtered = schemes.filter(
        scheme => scheme.Category?.toLowerCase() === dbCategory
      );
 
      setFilteredSchemes(filtered);
      setSchemeCount(filtered.length);
      setShowSchemeDetails(true);
    } else {
      setFilteredSchemes(schemes);
      setSchemeCount(schemes.length);
      setShowSchemeDetails(false);
    }
  }, [selectedCategory, schemes]);
 
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state" className="text-blue-600 font-medium">
            Select Your State <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
            <SelectTrigger id="state" className="w-full">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
 
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-blue-600 font-medium">Category</Label>
            <HelpCircle className="h-4 w-4 text-blue-600" />
          </div>
          <RadioGroup
            value={formData.category}
            onValueChange={(value: any) => updateFormData("category", value)}
            className="flex gap-4"
          >
            {["General", "OBC", "PVTG", "SC", "ST"].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={category} />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
 
        <div className="space-y-2">
          <Label className="text-blue-600 font-medium">Select Your Gender</Label>
          <div className="flex gap-4">
            {["Male", "Female", "Transgender"].map((gender) => (
              <Button
                key={gender}
                type="button"
                variant={formData.gender === gender ? "default" : "outline"}
                onClick={() => updateFormData("gender", gender)}
                className="flex-1"
              >
                {gender}
              </Button>
            ))}
          </div>
        </div>
 
        <div className="space-y-4">
          {[
            { id: "bpl", label: "Do you belong to BPL category?", key: "isBPL" },
            {
              id: "disabled",
              label: "Are you differently abled?",
              key: "isDifferentlyAbled",
            },
            {
              id: "senior",
              label: "Are you senior citizen?",
              key: "isSeniorCitizen",
            },
          ].map(({ id, label, key }) => (
            <div key={id} className="flex items-center space-x-2">
              <Checkbox
                id={id}
                checked={formData[key as keyof FormData] as boolean}
                onCheckedChange={(checked) => updateFormData(key as keyof FormData, checked)}
              />
              <Label htmlFor={id} className="text-gray-700">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
 
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-blue-600">Please select your area of residence</Label>
          <div className="flex gap-4">
            {["Urban", "Rural"].map((area) => (
              <Button
                key={area}
                type="button"
                variant={formData.area === area ? "default" : "outline"}
                onClick={() => updateFormData("area", area)}
                className="flex-1"
              >
                {area}
              </Button>
            ))}
          </div>
        </div>
 
        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-blue-600">
            Is your occupation one of the following?
          </Label>
          <Select value={formData.occupation} onValueChange={(value) => updateFormData("occupation", value)}>
            <SelectTrigger id="occupation">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {occupations.map((occupation) => (
                <SelectItem key={occupation} value={occupation}>
                  {occupation}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
 
        <div className="space-y-2">
          <Label htmlFor="employmentStatus" className="text-blue-600">
            What is your current employment status?
          </Label>
          <Select
            value={formData.employmentStatus}
            onValueChange={(value) => updateFormData("employmentStatus", value)}
          >
            <SelectTrigger id="employmentStatus">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {employmentStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
 
        <div className="flex items-center space-x-2">
          <Checkbox
            id="minority"
            checked={formData.isMinority}
            onCheckedChange={(checked) => updateFormData("isMinority", checked as boolean)}
          />
          <div className="flex items-center gap-2">
            <Label htmlFor="minority" className="text-gray-700">
              Do you belong to minority?
            </Label>
            <HelpCircle className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  )
 
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">You might be eligible for the following schemes...</h3>
        <p className="text-sm text-blue-600 mb-4">* Select one or more categories to view.</p>
 
        {loading ? (
          <div className="text-center py-8">Loading eligible schemes...</div>
        ) : eligibleSchemes.length > 0 ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              {eligibleSchemes.map((scheme, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-md transition-shadow cursor-pointer ${
                    selectedCategory === scheme.name ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === scheme.name ? null : scheme.name
                    );
                  }}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`rounded-lg ${scheme.color} p-3`}>
                      <div className="text-2xl">{scheme.icon}</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-600">{scheme.count} schemes</div>
                      <h4 className="font-medium">{scheme.name}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
 
            {/* Display schemes when a category is selected */}
            {showSchemeDetails && filteredSchemes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">
                  {selectedCategory} Schemes ({filteredSchemes.length})
                </h3>
                <div className="space-y-4">
                  {filteredSchemes.map((scheme, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-lg text-blue-600 mb-2">{scheme.title}</h4>
                        <p className="text-sm text-gray-700 mb-3">{scheme.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {[scheme.tag1, scheme.tag2, scheme.tag3, scheme.tag4, scheme.tag5]
                            .filter(Boolean)
                            .map((tag, tagIndex) => (
                              <span 
                                key={tagIndex} 
                                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-sm text-gray-600">
                            Ministry: <span className="font-medium">{scheme.ministry}</span>
                          </div>
                          {scheme.benefits > 0 && (
                            <div className="text-sm font-medium text-green-600">
                              Benefits: ₹{scheme.benefits.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p>No eligible schemes found based on your criteria.</p>
            <p className="text-sm text-gray-500 mt-2">Try changing some of your selections.</p>
          </div>
        )}
 
        <p className="text-sm text-gray-500 mt-4">Note: Some schemes can fall in multiple categories</p>
      </div>
    </div>
  )
 
  const renderProgressIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {["Basic Details", "Additional Info", "Eligible Schemes"].map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                formData.step > index
                  ? "bg-blue-600 text-white"
                  : formData.step === index + 1
                    ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-xs mt-1 ${formData.step === index + 1 ? "text-blue-600 font-medium" : "text-gray-600"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `${((formData.step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  )
 
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <CardContent className="p-6">
          {renderProgressIndicator()}
 
          {formData.step === 1 && renderStep1()}
          {formData.step === 2 && renderStep2()}
          {formData.step === 3 && renderStep3()}
 
          <div className="flex items-center gap-4 mt-6">
            {formData.step > 1 && (
              <Button variant="outline" onClick={goToPreviousStep} className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                setFormData({
                  step: 1,
                  state: "",
                  category: "General",
                  gender: "Male",
                  isBPL: false,
                  isDifferentlyAbled: false,
                  isSeniorCitizen: false,
                  area: "",
                  occupation: "",
                  employmentStatus: "",
                  isMinority: false,
                });
                setSelectedCategory(null);
              }}
            >
              Reset
            </Button>
            <Link
              href={selectedCategory 
                ? `/schemes?category=${encodeURIComponent(selectedCategory)}` 
                : schemes.length > 0 
                  ? "/schemes" 
                  : "#"
              }
              className={`flex-1 ${schemes.length === 0 && formData.step === 3 ? "pointer-events-none opacity-50" : ""}`}
              onClick={(e) => {
                if (schemes.length === 0 && formData.step === 3) {
                  e.preventDefault();
                }
              }}
            >
              <Button className="w-full">
                Show Schemes ({schemeCount})
              </Button>
            </Link>
            <Button
              onClick={() => {
                if (formData.step < 3) {
                  goToNextStep();
                } else {
                  onClose();
                }
              }}
            >
              {formData.step === 3 ? "Finish" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}