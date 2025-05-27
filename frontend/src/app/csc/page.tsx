"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

type CSC = {
  id: number;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  description: string;
  address: string;
  state: string;
  district: string;
  subdistrict: string;
  village: string;
  services: string[];
  imageUrl?: string;
};

type LocationFilters = {
  state: string;
  district: string;
  subdistrict: string;
  village: string;
};

type RouteInfo = {
  distance: number;
  duration: number;
  geometry: any;
};

const Page = () => {
  const mapRef = useRef(null);
  const [olaMaps, setOlaMaps] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [userMarker, setUserMarker] = useState<any>(null);
  const [filters, setFilters] = useState<LocationFilters>({
    state: "",
    district: "",
    subdistrict: "",
    village: ""
  });
  const [showDirections, setShowDirections] = useState<boolean>(false);
  const [startLocation, setStartLocation] = useState<[number, number] | null>(null);
  const [startLocationName, setStartLocationName] = useState<string>('');
  const [startSearchQuery, setStartSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [routeLayer, setRouteLayer] = useState<any>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [isRouteFetching, setIsRouteFetching] = useState<boolean>(false);
  const [directionsFrom, setDirectionsFrom] = useState<'current' | 'search'>('current');

  // Common Service Centers data
  const cscLocations: CSC[] = [
    // Mumbai CSCs
    {
      id: 1,
      name: "Mumbai Central CSC",
      coordinates: [72.8245, 18.9695],
      description: "Main Common Service Center for Aadhaar, PAN and passport services in Mumbai.",
      address: "Near Mumbai Central Station, Mumbai 400008",
      state: "Maharashtra",
      district: "Mumbai",
      subdistrict: "Mumbai Central",
      village: "Mumbai Central",
      services: ["Aadhaar", "PAN Card", "Passport", "Voter ID"],
      imageUrl: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=200"
    },
    {
      id: 2,
      name: "Andheri CSC",
      coordinates: [72.8691, 19.1136],
      description: "Common Service Center for all government services in western suburbs.",
      address: "Near Andheri Station, Mumbai 400058",
      state: "Maharashtra",
      district: "Mumbai",
      subdistrict: "Andheri",
      village: "Andheri East",
      services: ["Aadhaar", "PAN Card", "Utility Bills", "Insurance"]
    },
    {
      id: 3,
      name: "Dadar CSC",
      coordinates: [72.8410, 19.0178],
      description: "Central Mumbai CSC with multiple government scheme services.",
      address: "Dadar West, Mumbai 400028",
      state: "Maharashtra",
      district: "Mumbai",
      subdistrict: "Dadar",
      village: "Dadar West",
      services: ["Aadhaar", "Banking", "Pension Schemes", "Certificates"]
    },
    {
      id: 30,
      name: "Bandra Digital Seva Kendra",
      coordinates: [72.8296, 19.0596],
      description: "Comprehensive digital services hub for West Mumbai residents.",
      address: "Linking Road, Bandra West, Mumbai 400050",
      state: "Maharashtra",
      district: "Mumbai",
      subdistrict: "Bandra",
      village: "Bandra West",
      services: ["Aadhaar", "PAN Card", "Banking", "Education Registration", "Skill Development"],
      imageUrl: "https://images.unsplash.com/photo-1590796583326-afd3bb20d22d?q=80&w=200"
    },
    {
      id: 31,
      name: "Borivali E-Governance Center",
      coordinates: [72.8560, 19.2307],
      description: "North Mumbai digital services center with focus on senior citizens.",
      address: "S.V. Road, Borivali West, Mumbai 400092",
      state: "Maharashtra",
      district: "Mumbai",
      subdistrict: "Borivali",
      village: "Borivali West",
      services: ["Aadhaar", "Pension Services", "Health Registration", "Digital Literacy", "Bill Payments"]
    },
    // Bangalore CSCs
    {
      id: 4,
      name: "Koramangala CSC",
      coordinates: [77.6216, 12.9279],
      description: "Digital service center for all government schemes.",
      address: "80 Feet Road, Koramangala, Bangalore 560034",
      state: "Karnataka",
      district: "Bangalore",
      subdistrict: "Koramangala",
      village: "Koramangala",
      services: ["Aadhaar", "PAN Card", "Property Registration", "Banking"],
      imageUrl: "https://images.unsplash.com/photo-1541183710533-d40c1b56aed3?q=80&w=200"
    },
    {
      id: 5,
      name: "Indiranagar CSC",
      coordinates: [77.6408, 12.9784],
      description: "Common Service Center for digital services in East Bangalore.",
      address: "100 Feet Road, Indiranagar, Bangalore 560038",
      state: "Karnataka",
      district: "Bangalore",
      subdistrict: "Indiranagar",
      village: "Indiranagar",
      services: ["Aadhaar", "Pension Schemes", "Digital Literacy", "Bills Payment"]
    },
    {
      id: 32,
      name: "Indiranagar Digital Hub",
      coordinates: [77.6497, 12.9744],
      description: "Premium digital services center with minimal wait times.",
      address: "12th Main Road, Indiranagar, Bangalore 560038",
      state: "Karnataka",
      district: "Bangalore",
      subdistrict: "Indiranagar",
      village: "Indiranagar East",
      services: ["Aadhaar", "Passport", "GST Registration", "Company Registration", "International Money Transfer"]
    },
    {
      id: 6,
      name: "Jayanagar CSC",
      coordinates: [77.5961, 12.9258],
      description: "South Bangalore CSC with full range of government services.",
      address: "11th Main Road, Jayanagar, Bangalore 560041",
      state: "Karnataka",
      district: "Bangalore",
      subdistrict: "Jayanagar",
      village: "Jayanagar",
      services: ["Aadhaar", "Banking", "Insurance", "Skill Development"]
    },
    {
      id: 33,
      name: "Whitefield G2C Center",
      coordinates: [77.7406, 12.9698],
      description: "IT corridor service center with extended working hours.",
      address: "Whitefield Main Road, Bangalore 560066",
      state: "Karnataka",
      district: "Bangalore",
      subdistrict: "Whitefield",
      village: "Whitefield",
      services: ["Aadhaar", "PAN Card", "Professional Tax", "Visa Services", "NRI Services"]
    },
    {
      id: 34,
      name: "Electronic City Digital Point",
      coordinates: [77.6701, 12.8458],
      description: "Tech hub digital services center with advanced facilities.",
      address: "Phase 1, Electronic City, Bangalore 560100",
      state: "Karnataka",
      district: "Bangalore",
      subdistrict: "Electronic City",
      village: "Electronic City",
      services: ["Aadhaar", "Digital Certificate", "Income Tax Filing", "Startup Registration", "Digital Signature"]
    },
    // Delhi CSCs
    {
      id: 7,
      name: "Connaught Place CSC",
      coordinates: [77.2100, 28.6329],
      description: "Central Delhi CSC with all government digital services.",
      address: "Block C, Connaught Place, New Delhi 110001",
      state: "Delhi",
      district: "Central Delhi",
      subdistrict: "Connaught Place",
      village: "Connaught Place",
      services: ["Aadhaar", "PAN Card", "Passport", "Voter ID"],
      imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=200"
    },
    {
      id: 8,
      name: "Lajpat Nagar CSC",
      coordinates: [77.2433, 28.5693],
      description: "South Delhi digital service center for all government schemes.",
      address: "Lajpat Nagar Market, New Delhi 110024",
      state: "Delhi",
      district: "South Delhi",
      subdistrict: "Lajpat Nagar",
      village: "Lajpat Nagar",
      services: ["Aadhaar", "Banking", "Insurance", "Education Registration"]
    },
    {
      id: 35,
      name: "Lajpat Nagar Digital Zone",
      coordinates: [77.2393, 28.5713],
      description: "Modern digital services hub with express counters.",
      address: "Central Market, Lajpat Nagar, New Delhi 110024",
      state: "Delhi",
      district: "South Delhi",
      subdistrict: "Lajpat Nagar",
      village: "Lajpat Nagar Central",
      services: ["Aadhaar", "Foreign Exchange", "Passport", "Property Registration", "Legal Services"]
    },
    {
      id: 9,
      name: "Dwarka CSC",
      coordinates: [77.0266, 28.5823],
      description: "West Delhi Common Service Center with all government facilities.",
      address: "Sector 6, Dwarka, New Delhi 110075",
      state: "Delhi",
      district: "West Delhi",
      subdistrict: "Dwarka",
      village: "Dwarka Sector 6",
      services: ["Aadhaar", "PAN Card", "Driving License", "Certificates"]
    },
    {
      id: 36,
      name: "Dwarka Digital Square",
      coordinates: [77.0366, 28.5923],
      description: "Flagship digital services center with premium facilities.",
      address: "Sector 10, Dwarka, New Delhi 110075",
      state: "Delhi",
      district: "West Delhi",
      subdistrict: "Dwarka",
      village: "Dwarka Sector 10",
      services: ["Aadhaar", "Immigration Services", "Land Records", "Court Services", "Employment Registration"]
    },
    // Kolkata CSCs
    {
      id: 10,
      name: "Park Street CSC",
      coordinates: [88.3639, 22.5550],
      description: "Central Kolkata digital services hub with all facilities.",
      address: "Park Street, Kolkata 700016",
      state: "West Bengal",
      district: "Kolkata",
      subdistrict: "Park Street",
      village: "Park Street",
      services: ["Aadhaar", "PAN Card", "Passport", "Banking", "Insurance"],
      imageUrl: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=200"
    },
    {
      id: 11,
      name: "Salt Lake E-Governance Center",
      coordinates: [88.4177, 22.5726],
      description: "Major digital facility in Salt Lake IT sector.",
      address: "Sector V, Salt Lake, Kolkata 700091",
      state: "West Bengal",
      district: "Kolkata",
      subdistrict: "Salt Lake",
      village: "Salt Lake Sector V",
      services: ["Aadhaar", "Digital Certificate", "Property Tax", "Health Cards", "Pension"]
    },
    {
      id: 12,
      name: "New Town Digital Hub",
      coordinates: [88.4636, 22.6253],
      description: "Modern digital services center in New Town Smart City zone.",
      address: "Action Area I, New Town, Kolkata 700156",
      state: "West Bengal",
      district: "Kolkata",
      subdistrict: "New Town",
      village: "New Town Action Area I",
      services: ["Aadhaar", "Smart Card", "Utility Bills", "Startup Registration", "Government Schemes"]
    },
    // Chennai CSCs
    {
      id: 13,
      name: "T.Nagar Service Center",
      coordinates: [80.2329, 13.0416],
      description: "Primary digital services hub in central Chennai.",
      address: "Thyagaraya Road, T.Nagar, Chennai 600017",
      state: "Tamil Nadu",
      district: "Chennai",
      subdistrict: "T.Nagar",
      village: "T.Nagar",
      services: ["Aadhaar", "TN e-Services", "PAN Card", "Property Registration"]
    },
    {
      id: 14,
      name: "Adyar Digital Point",
      coordinates: [80.2574, 13.0048],
      description: "South Chennai comprehensive digital service center.",
      address: "Gandhi Nagar, Adyar, Chennai 600020",
      state: "Tamil Nadu",
      district: "Chennai",
      subdistrict: "Adyar",
      village: "Gandhi Nagar",
      services: ["Aadhaar", "Banking", "Driving License", "Education Services", "Utility Payments"]
    },
    {
      id: 15,
      name: "Anna Nagar CSC",
      coordinates: [80.2098, 13.0850],
      description: "Major west Chennai digital services facility.",
      address: "2nd Avenue, Anna Nagar, Chennai 600040",
      state: "Tamil Nadu",
      district: "Chennai",
      subdistrict: "Anna Nagar",
      village: "Anna Nagar East",
      services: ["Aadhaar", "Passport", "Insurance", "Income Tax", "Business Registration"]
    },
    // Hyderabad CSCs
    {
      id: 16,
      name: "Banjara Hills MeeSeva",
      coordinates: [78.4456, 17.4156],
      description: "Premium digital services center in upscale Banjara Hills.",
      address: "Road No. 12, Banjara Hills, Hyderabad 500034",
      state: "Telangana",
      district: "Hyderabad",
      subdistrict: "Banjara Hills",
      village: "Banjara Hills",
      services: ["Aadhaar", "Telangana e-Services", "Passport", "Land Records", "Banking"],
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=200"
    },
    {
      id: 17,
      name: "HITEC City Digital Center",
      coordinates: [78.3762, 17.4452],
      description: "Tech hub digital services with extended working hours.",
      address: "HITEC City Main Road, Hyderabad 500081",
      state: "Telangana",
      district: "Hyderabad",
      subdistrict: "HITEC City",
      village: "Madhapur",
      services: ["Aadhaar", "PAN Card", "International Services", "Company Registration", "Employment"]
    },
    {
      id: 18,
      name: "Secunderabad Services Hub",
      coordinates: [78.5046, 17.4399],
      description: "Major digital services center for North Hyderabad residents.",
      address: "S.D. Road, Secunderabad, Hyderabad 500003",
      state: "Telangana",
      district: "Hyderabad",
      subdistrict: "Secunderabad",
      village: "Secunderabad",
      services: ["Aadhaar", "Voter ID", "Digital Literacy", "Banking", "Defense Pension"]
    },
    // Pune CSCs
    {
      id: 19,
      name: "Koregaon Park Service Center",
      coordinates: [73.8967, 18.5362],
      description: "Comprehensive digital services hub in East Pune.",
      address: "North Main Road, Koregaon Park, Pune 411001",
      state: "Maharashtra",
      district: "Pune",
      subdistrict: "Koregaon Park",
      village: "Koregaon Park",
      services: ["Aadhaar", "PAN Card", "Property Tax", "Banking", "Certificates"]
    },
    {
      id: 20,
      name: "Hinjewadi Digital Hub",
      coordinates: [73.7379, 18.5994],
      description: "IT park service center catering to tech professionals.",
      address: "Phase 2, Hinjewadi IT Park, Pune 411057",
      state: "Maharashtra",
      district: "Pune",
      subdistrict: "Hinjewadi",
      village: "Hinjewadi Phase 2",
      services: ["Aadhaar", "Income Tax Filing", "Digital Signature", "Passport", "Visa Services"]
    },
    {
      id: 21,
      name: "Aundh CSC",
      coordinates: [73.8071, 18.5589],
      description: "Modern digital services facility in Northwest Pune.",
      address: "D.P. Road, Aundh, Pune 411007",
      state: "Maharashtra",
      district: "Pune",
      subdistrict: "Aundh",
      village: "Aundh",
      services: ["Aadhaar", "PAN Card", "Property Registration", "Banking", "Education"]
    },
    // Jaipur CSCs
    {
      id: 22,
      name: "Vaishali Nagar E-Mitra",
      coordinates: [75.7525, 26.9349],
      description: "Major Rajasthan government digital services kendra.",
      address: "Vaishali Nagar, Jaipur 302021",
      state: "Rajasthan",
      district: "Jaipur",
      subdistrict: "Vaishali Nagar",
      village: "Vaishali Nagar",
      services: ["Aadhaar", "Bhamashah", "PAN Card", "Utility Bills", "Certificates"],
      imageUrl: "https://images.unsplash.com/photo-1546479904-a1c973a910cd?q=80&w=200"
    },
    {
      id: 23,
      name: "C-Scheme Digital Center",
      coordinates: [75.7873, 26.9124],
      description: "Central Jaipur premium digital services facility.",
      address: "Civil Lines, C-Scheme, Jaipur 302001",
      state: "Rajasthan",
      district: "Jaipur",
      subdistrict: "C-Scheme",
      village: "Civil Lines",
      services: ["Aadhaar", "PAN Card", "Property Registration", "Passport", "Business Licenses"]
    },
    {
      id: 24,
      name: "Malviya Nagar Jan Seva Kendra",
      coordinates: [75.8236, 26.8535],
      description: "South Jaipur comprehensive digital services hub.",
      address: "Malviya Nagar, Jaipur 302017",
      state: "Rajasthan",
      district: "Jaipur",
      subdistrict: "Malviya Nagar",
      village: "Malviya Nagar",
      services: ["Aadhaar", "Banking", "Education Registration", "Jan Aadhaar", "Social Security"]
    },
    // Ahmedabad CSCs
    {
      id: 25,
      name: "CG Road Jan Seva Kendra",
      coordinates: [72.5682, 23.0334],
      description: "Central Ahmedabad digital services facility.",
      address: "CG Road, Navrangpura, Ahmedabad 380009",
      state: "Gujarat",
      district: "Ahmedabad",
      subdistrict: "Navrangpura",
      village: "Navrangpura",
      services: ["Aadhaar", "PAN Card", "Digital Gujarat", "Banking", "Certificates"]
    },
    {
      id: 26,
      name: "SG Highway E-Governance Center",
      coordinates: [72.5166, 23.0145],
      description: "Western Ahmedabad premium digital services hub.",
      address: "SG Highway, Ahmedabad 380054",
      state: "Gujarat",
      district: "Ahmedabad",
      subdistrict: "SG Highway",
      village: "Bodakdev",
      services: ["Aadhaar", "GST Registration", "Digital Signature", "Property", "Business Services"]
    },
    {
      id: 27,
      name: "GIFT City Digital Hub",
      coordinates: [72.6841, 23.1612],
      description: "Advanced digital services center with international facilities.",
      address: "GIFT City, Gandhinagar 382355",
      state: "Gujarat",
      district: "Gandhinagar",
      subdistrict: "GIFT City",
      village: "GIFT City",
      services: ["Aadhaar", "International Banking", "Forex Services", "Business Registration", "Legal Services"]
    },
    // Lucknow CSCs
    {
      id: 28,
      name: "Gomti Nagar Jan Seva Kendra",
      coordinates: [80.9957, 26.8623],
      description: "Major UP government digital services facility.",
      address: "Vibhuti Khand, Gomti Nagar, Lucknow 226010",
      state: "Uttar Pradesh",
      district: "Lucknow",
      subdistrict: "Gomti Nagar",
      village: "Vibhuti Khand",
      services: ["Aadhaar", "UP e-District", "PAN Card", "Banking", "Public Welfare Schemes"]
    },
    {
      id: 29,
      name: "Hazratganj Digital Center",
      coordinates: [80.9462, 26.8540],
      description: "Central Lucknow comprehensive digital services hub.",
      address: "Hazratganj, Lucknow 226001",
      state: "Uttar Pradesh",
      district: "Lucknow",
      subdistrict: "Hazratganj",
      village: "Hazratganj",
      services: ["Aadhaar", "PAN Card", "Birth Certificate", "Income Certificate", "Property Registration"],
      imageUrl: "https://images.unsplash.com/photo-1624634574132-202fbb15af51?q=80&w=200"
    },
    // More diverse locations in smaller cities
    {
      id: 37,
      name: "Shimla Digital Hub",
      coordinates: [77.1734, 31.1048],
      description: "Mountain region's primary digital services center.",
      address: "The Mall Road, Shimla 171001",
      state: "Himachal Pradesh",
      district: "Shimla",
      subdistrict: "Mall Road",
      village: "Mall Road",
      services: ["Aadhaar", "HP e-District", "Land Records", "Tourism Permits", "Certificates"]
    },
    {
      id: 38,
      name: "Varanasi Jan Seva Kendra",
      coordinates: [83.0060, 25.3176],
      description: "Heritage city digital services facility.",
      address: "Lanka, Varanasi 221005",
      state: "Uttar Pradesh",
      district: "Varanasi",
      subdistrict: "Lanka",
      village: "Lanka",
      services: ["Aadhaar", "Religious Tourism Services", "PAN Card", "Banking", "Property Records"]
    },
    {
      id: 39,
      name: "Kochi Digital Center",
      coordinates: [76.2673, 9.9312],
      description: "Coastal Kerala's comprehensive e-governance facility.",
      address: "MG Road, Ernakulam, Kochi 682011",
      state: "Kerala",
      district: "Ernakulam",
      subdistrict: "MG Road",
      village: "Ernakulam",
      services: ["Aadhaar", "Akshaya e-Kendras", "Coastal Services", "Banking", "International Services"]
    },
    {
      id: 40,
      name: "Guwahati Digital Point",
      coordinates: [91.7362, 26.1445],
      description: "Northeast India's premier digital services hub.",
      address: "GS Road, Guwahati 781005",
      state: "Assam",
      district: "Kamrup Metropolitan",
      subdistrict: "GS Road",
      village: "Bhangagarh",
      services: ["Aadhaar", "NE Special Services", "PAN Card", "Land Records", "Tribal Certificates"]
    },
    // Madhya Pradesh CSCs
    {
      id: 41,
      name: "PRAHLAD COMPUTER'S & ONLINE WORK",
      coordinates: [80.6843, 22.8916],
      description: "Common Service Center providing digital services in Mandla district.",
      address: "GRAM AHMADPUR, POST GHAGHA TEH MANDLA, MANDLA, MADHYA PRADESH - 481661",
      state: "Madhya Pradesh",
      district: "Mandla",
      subdistrict: "Mandla",
      village: "Ahmadpur",
      services: ["Aadhaar", "PAN Card", "MP e-District", "Banking", "Certificate Services"],
      imageUrl: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=200"
    },
    {
      id: 42,
      name: "MATA PITA COMPUTER",
      coordinates: [80.3700, 22.5966],
      description: "Rural digital services center for Narayanganj region.",
      address: "KODARA, NARAYANGANJ, MANDLA, MADHYA PRADESH-481661",
      state: "Madhya Pradesh",
      district: "Mandla",
      subdistrict: "Narayanganj",
      village: "Kodara",
      services: ["Aadhaar", "Banking", "MP Online", "Certificate Services", "Bill Payments"]
    },
    {
      id: 43,
      name: "SATGURU ONLINE AND STAITIONARY",
      coordinates: [80.3397, 22.7163],
      description: "Digital services and stationery supplies for Gwari area.",
      address: "GWARI, MANDLA, MANDLA, MADHYA PRADESH-481661",
      state: "Madhya Pradesh",
      district: "Mandla",
      subdistrict: "Mandla",
      village: "Gwari",
      services: ["Aadhaar", "PAN Card", "Stationery", "Banking", "MP e-District"]
    },
    {
      id: 44,
      name: "CSC KHARI",
      coordinates: [80.3686, 22.6020],
      description: "Village level digital services provider.",
      address: "VILLAGE KHARI, MANDLA, MADHYA PRADESH - 481661",
      state: "Madhya Pradesh",
      district: "Mandla",
      subdistrict: "Mandla",
      village: "Khari",
      services: ["Aadhaar", "Banking", "Insurance", "Bill Payments", "Certificate Services"]
    },
    {
      id: 45,
      name: "MA REWA COMPUTER",
      coordinates: [80.3709, 22.5980],
      description: "Market center digital services provider.",
      address: "BAJAR CHOK, BAKORI MANDLA, MANDLA, MADHYA PRADESH - 481661",
      state: "Madhya Pradesh",
      district: "Mandla",
      subdistrict: "Mandla",
      village: "Bakori",
      services: ["Aadhaar", "PAN Card", "Computer Training", "Banking", "MP e-District"]
    },
    {
      id: 46,
      name: "PRATIBHA ONLINE COMPUTER",
      coordinates: [80.2886, 22.7528],
      description: "Digital services center on Jujhari main road.",
      address: "JUJHARI MAIN ROAD, INDIAN, NIWAS, MANDLA, MADHYA PRADESH - 481662",
      state: "Madhya Pradesh",
      district: "Mandla",
      subdistrict: "Niwas",
      village: "Jujhari",
      services: ["Aadhaar", "Banking", "Digital Services", "MP Online", "Certificates"]
    },
    {
      id: 47,
      name: "PRATIBHA BAIRAGI GANESH ONLINE",
      coordinates: [80.2886, 22.7528],
      description: "Common digital services provider in Narayanganj.",
      address: "CHIRAI DONGRI MAL., NARAYANGANJ, MANDLA, MADHYA PRADESH-481662",
      state: "Madhya Pradesh",
      district: "Mandla",
      subdistrict: "Narayanganj",
      village: "Chirai Dongri",
      services: ["Aadhaar", "Banking", "Insurance", "Pension Services", "MP e-District"]
    },
    {
      id: 48,
      name: "CSC CENTRE - RAMKUMAR",
      coordinates: [77.6407, 24.7078],
      description: "Digital services center in Shadhora region.",
      address: "SHADHORA, ASHOKNAGAR, MADHYA PRADESH - 473330",
      state: "Madhya Pradesh",
      district: "Ashoknagar",
      subdistrict: "Shadhora",
      village: "Shadhora",
      services: ["Aadhaar", "Banking", "MP e-District", "Certificate Services", "Social Welfare Schemes"]
    },
    {
      id: 49,
      name: "COMMON SERVICE CENTRE - DILEEP",
      coordinates: [77.6153, 24.7185],
      description: "Comprehensive government service provider in Shadhora.",
      address: "SHADHORA, ASHOKNAGAR, MADHYA PRADESH - 473330",
      state: "Madhya Pradesh",
      district: "Ashoknagar",
      subdistrict: "Shadhora",
      village: "Shadhora",
      services: ["Aadhaar", "PAN Card", "Banking", "Insurance", "MP Online"]
    },
    {
      id: 50,
      name: "CSC CENTRE - PAWAN",
      coordinates: [77.6411, 24.7077],
      description: "Digital services hub for Shadhora community.",
      address: "SHADHORA, ASHOKNAGAR, MADHYA PRADESH - 473330",
      state: "Madhya Pradesh",
      district: "Ashoknagar",
      subdistrict: "Shadhora",
      village: "Shadhora",
      services: ["Aadhaar", "Banking", "Social Welfare", "Rural Development", "MP e-District"]
    },
    {
      id: 51,
      name: "CSC CENTER - ISAGARH",
      coordinates: [77.7953, 24.5715],
      description: "Digital services provider for Isagarh region.",
      address: "ISAGARH, ASHOKNAGAR, MADHYA PRADESH - 473331",
      state: "Madhya Pradesh",
      district: "Ashoknagar",
      subdistrict: "Isagarh",
      village: "Isagarh",
      services: ["Aadhaar", "Banking", "MP Online", "Insurance", "Certificate Services"]
    },
    {
      id: 52,
      name: "JAN SEVA KENDRA CSC CHIROLI",
      coordinates: [77.6107, 24.7103],
      description: "Public service digital center for Chiroli area.",
      address: "CHIROLI, SHADHORA, ASHOK NAGAR, MADHYA PRADESH-473330",
      state: "Madhya Pradesh",
      district: "Ashoknagar",
      subdistrict: "Shadhora",
      village: "Chiroli",
      services: ["Aadhaar", "PAN Card", "Banking", "Social Welfare", "MP Online"]
    },
    {
      id: 53,
      name: "ANUJ JATAV CSC",
      coordinates: [77.5919, 24.6302],
      description: "Digital services provider for Umari village.",
      address: "UMARI, ASHOKNAGAR, ASHOK NAGAR, MADHYA PRADESH-473330",
      state: "Madhya Pradesh",
      district: "Ashoknagar",
      subdistrict: "Ashoknagar",
      village: "Umari",
      services: ["Aadhaar", "Banking", "Insurance", "MP e-District", "Rural Services"]
    },
    {
      id: 54,
      name: "BAGULYA JAN SEVA KENDRA",
      coordinates: [77.6407, 24.7078], // Using approximate coordinates since specific ones weren't provided
      description: "Village level Common Service Center for Bagulya.",
      address: "BAGULYA, SHADHORA, ASHOKNAGAR, MADHYA PRADESH - 473330",
      state: "Madhya Pradesh",
      district: "Ashoknagar",
      subdistrict: "Shadhora",
      village: "Bagulya",
      services: ["Aadhaar", "Banking", "MP Online", "Rural Development Services", "Social Welfare"]
    }
  ];

  // Get unique values for filter dropdowns
  const getUniqueValues = (field: keyof CSC) => {
    const values = new Set(cscLocations.map(csc => csc[field]));
    return [...values].filter(Boolean).sort() as string[];
  };

  const states = getUniqueValues('state');
  
  const districts = filters.state ? 
    getUniqueValues('district').filter(district => 
      cscLocations.some(csc => 
        csc.state === filters.state && csc.district === district
      )
    ) : getUniqueValues('district');
    
  const subdistricts = filters.district ? 
    getUniqueValues('subdistrict').filter(subdistrict => 
      cscLocations.some(csc => 
        csc.district === filters.district && csc.subdistrict === subdistrict
      )
    ) : getUniqueValues('subdistrict');

  const villages = filters.subdistrict ?
    getUniqueValues('village').filter(village =>
      cscLocations.some(csc =>
        csc.subdistrict === filters.subdistrict && csc.village === village
      )
    ) : getUniqueValues('village');

  // Filter locations based on selected filters
  const filteredLocations = cscLocations.filter(csc => {
    return (!filters.state || csc.state === filters.state) &&
           (!filters.district || csc.district === filters.district) &&
           (!filters.subdistrict || csc.subdistrict === filters.subdistrict) &&
           (!filters.village || csc.village === filters.village);
  });

  // Handle filter changes
  const handleFilterChange = (field: keyof LocationFilters, value: string) => {
    // Reset subsequent filters when a parent filter changes
    const updatedFilters = { ...filters, [field]: value };
    
    if (field === 'state') {
      updatedFilters.district = '';
      updatedFilters.subdistrict = '';
      updatedFilters.village = '';
    } else if (field === 'district') {
      updatedFilters.subdistrict = '';
      updatedFilters.village = '';
    } else if (field === 'subdistrict') {
      updatedFilters.village = '';
    }
    
    setFilters(updatedFilters);
    
    // If there's only one filtered location after applying filter, select it
    const newFilteredLocations = cscLocations.filter(csc => {
      return (!updatedFilters.state || csc.state === updatedFilters.state) &&
             (!updatedFilters.district || csc.district === updatedFilters.district) &&
             (!updatedFilters.subdistrict || csc.subdistrict === updatedFilters.subdistrict) &&
             (!updatedFilters.village || csc.village === updatedFilters.village);
    });
    
    if (newFilteredLocations.length === 1) {
      setSelectedLocation(newFilteredLocations[0].id);
      if (map) {
        map.flyTo({
          center: newFilteredLocations[0].coordinates,
          zoom: 14
        });
      }
    } else if (newFilteredLocations.length > 0) {
      // Center map to show all filtered locations
      centerMapToShowAll(newFilteredLocations);
    }
  };

  // Center map to show all filtered locations
  const centerMapToShowAll = (locations: CSC[]) => {
    if (!map || locations.length === 0) return;
    
    // Calculate bounds
    const bounds = locations.reduce(
      (bounds, location) => {
        const [lng, lat] = location.coordinates;
        bounds.minLng = Math.min(bounds.minLng, lng);
        bounds.maxLng = Math.max(bounds.maxLng, lng);
        bounds.minLat = Math.min(bounds.minLat, lat);
        bounds.maxLat = Math.max(bounds.maxLat, lat);
        return bounds;
      },
      { minLng: 180, maxLng: -180, minLat: 90, maxLat: -90 }
    );
    
    map.fitBounds([
      [bounds.minLng, bounds.minLat], // Southwest corner
      [bounds.maxLng, bounds.maxLat]  // Northeast corner
    ], { padding: 50, maxZoom: 12 });
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to central India as fallback
          setCurrentLocation([78.9629, 20.5937]);
        }
      );
    }
  }, []);

  // Initialize map with improved layer styling (fixed to use only supported API methods)
  useEffect(() => {
    import('olamaps-web-sdk').then((module) => {
      const { OlaMaps } = module;
      const olaMapInstance = new OlaMaps({
        apiKey: "RHn3shvzySH8e8LEmOKPN4mXxcMUXYk4TPTct8Gb",
      });
      
      setOlaMaps(olaMapInstance);
      
      const myMap = olaMapInstance.init({
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: 'map',
        center: currentLocation || [78.9629, 20.5937], // Default to central India
        zoom: 5,
      });
      
      setMap(myMap);
      
      // Add navigation controls with compass
      const navigationControls = olaMapInstance.addNavigationControls({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
        position: 'top-right'
      });
      
      myMap.addControl(navigationControls);
      
      // Wait for map to load before adding markers
      myMap.on("load", () => {
        addMarkers(olaMapInstance, myMap);
        addUserMarker(olaMapInstance, myMap);
        
        // Add a map attribution control (built into maplibregl)
        if (myMap.addControl && typeof myMap.addControl === 'function') {
          try {
            // Add built-in attribution control
            const attributionControl = new (window as any).maplibregl.AttributionControl({
              compact: true
            });
            myMap.addControl(attributionControl, 'bottom-right');
          } catch (error) {
            console.error("Error adding attribution control:", error);
          }
        }
      });
    });
  }, [currentLocation]);

  // Clear existing route from map
  const clearRoute = () => {
    if (map) {
      try {
        // Remove all layers associated with route
        if (Array.isArray(routeLayer)) {
          routeLayer.forEach(layerId => {
            if (map.getLayer(layerId)) {
              map.removeLayer(layerId);
            }
          });
        } else if (routeLayer && map.getLayer(routeLayer)) {
          map.removeLayer(routeLayer);
        }
        
        // Then remove the source if it exists
        if (map.getSource('route')) {
          map.removeSource('route');
        }
      } catch (error) {
        console.error("Error clearing route:", error);
      }
      
      setRouteLayer(null);
      setRoute(null);
    }
  };

  // Clear route when selected location changes
  useEffect(() => {
    clearRoute();
    if (selectedLocation) {
      setShowDirections(true);
    } else {
      setShowDirections(false);
    }
  }, [selectedLocation]);

  // Update start location when directionsFrom changes
  useEffect(() => {
    if (directionsFrom === 'current') {
      setStartLocation(currentLocation);
      setStartLocationName('Your Location');
      if (selectedLocation && currentLocation) {
        getRoute(currentLocation, getSelectedLocationCoords()).catch(err => {
          console.error("Failed to get route in useEffect:", err);
          // Error is handled inside getRoute function
        });
      }
    } else {
      setStartLocation(null);
      setStartLocationName('');
    }
  }, [directionsFrom, currentLocation, selectedLocation]);

  // Get coordinates of selected location
  const getSelectedLocationCoords = (): [number, number] => {
    const selected = cscLocations.find(loc => loc.id === selectedLocation);
    return selected ? selected.coordinates : [0, 0];
  };

  // Search for locations using OLA Maps search API
  const searchLocations = async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(
        `https://api.olamaps.io/search/geocode/forward?apiKey=RHn3shvzySH8e8LEmOKPN4mXxcMUXYk4TPTct8Gb&text=${encodeURIComponent(query)}&limit=5`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Search request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.results) {
        setSearchResults(data.results);
        setShowSearchDropdown(true);
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
      // Could show a user-friendly error message here
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input changes with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartSearchQuery(value);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      searchLocations(value);
    }, 500);
    
    setSearchTimeout(timeout);
  };

  // Select a location from search results
  const selectSearchResult = (result: any) => {
    const coordinates: [number, number] = [
      result.geometry.coordinates[0],
      result.geometry.coordinates[1]
    ];
    
    setStartLocation(coordinates);
    setStartLocationName(result.properties.name);
    setStartSearchQuery(result.properties.name);
    setShowSearchDropdown(false);
    
    if (selectedLocation) {
      getRoute(coordinates, getSelectedLocationCoords());
    }
  };

  // Get directions using OLA Maps directions API - following the correct API structure
  const getRoute = async (start: [number, number], end: [number, number]) => {
    if (!start || !end) return;
    
    setIsRouteFetching(true);
    clearRoute();
    
    try {
      // Format coordinates for API request - API expects lat,lng format for query params
      const origin = `${start[1]},${start[0]}`; // lat,lng
      const destination = `${end[1]},${end[0]}`; // lat,lng
      
      const apiKey = "RHn3shvzySH8e8LEmOKPN4mXxcMUXYk4TPTct8Gb";
      const url = `https://api.olamaps.io/routing/v1/directions?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving&alternatives=false&steps=true&overview=full&language=en&traffic_metadata=false&api_key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Directions request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Directions API Response:", data);
      
      if (data.status === 'SUCCESS' && data.routes && data.routes.length > 0) {
        const routeData = data.routes[0];
        
        // Get distance and duration from route legs
        let totalDistance = 0;
        let totalDuration = 0;
        
        if (routeData.legs && routeData.legs.length > 0) {
          routeData.legs.forEach((leg: any) => {
            if (typeof leg.distance === 'number') {
              totalDistance += leg.distance;
            }
            if (typeof leg.duration === 'number') {
              totalDuration += leg.duration;
            }
          });
        }
        
        // Extract route geometry from overview_polyline
        const routeCoordinates = decodePolyline(routeData.overview_polyline);
        
        if (routeCoordinates.length > 1) {
          const routeGeometry = {
            type: "LineString",
            coordinates: routeCoordinates
          };
          
          setRoute({
            distance: totalDistance / 1000, // Convert to km
            duration: totalDuration / 60,   // Convert to minutes
            geometry: routeGeometry
          });
          
          // Draw the route on the map
          drawRoute(routeGeometry);
          
          // Calculate bounds from coordinates
          const bounds = routeCoordinates.reduce(
            (acc, curr) => {
              return {
                minLng: Math.min(acc.minLng, curr[0]),
                maxLng: Math.max(acc.maxLng, curr[0]),
                minLat: Math.min(acc.minLat, curr[1]),
                maxLat: Math.max(acc.maxLat, curr[1])
              };
            },
            { minLng: 180, maxLng: -180, minLat: 90, maxLat: -90 }
          );
          
          // Fit map to show the entire route
          map.fitBounds([
            [bounds.minLng, bounds.minLat],
            [bounds.maxLng, bounds.maxLat]
          ], { padding: 50 });
        } else {
          throw new Error("Failed to decode polyline data");
        }
      } else {
        throw new Error(`API Error: ${data.status || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      drawFallbackRoute(start, end);
    } finally {
      setIsRouteFetching(false);
    }
  };
  
  // Function to decode polyline with improved error handling
  const decodePolyline = (str: string): [number, number][] => {
    if (!str || typeof str !== 'string') {
      console.error("Invalid polyline string provided");
      return [];
    }

    try {
      let index = 0;
      let lat = 0;
      let lng = 0;
      const coordinates: [number, number][] = [];
      let shift = 0;
      let result = 0;
      let byte = null;
      let latitude_change;
      let longitude_change;

      while (index < str.length) {
        // Reset shift and result for latitude
        shift = 0;
        result = 0;

        // Extract latitude
        do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        
        // Reset shift and result for longitude
        shift = 0;
        result = 0;

        // Extract longitude
        do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
        } while (byte >= 0x20);
        
        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        
        lat += latitude_change;
        lng += longitude_change;

        // Convert to degrees and store as [lng, lat] for consistency with GeoJSON
        coordinates.push([lng * 1e-5, lat * 1e-5]);
      }

      return coordinates;
    } catch (error) {
      console.error("Error decoding polyline:", error);
      return [];
    }
  };

  // Draw route on the map with enhanced error handling
  const drawRoute = (geometry: any) => {
    if (!map) return;
    
    try {
      // Ensure geometry is valid
      if (!geometry || !geometry.coordinates || geometry.coordinates.length < 2) {
        console.error("Invalid geometry for route drawing");
        return;
      }
      
      // Check if the map has the source; if not, add it
      if (!map.getSource('route')) {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: geometry
          }
        });
        
        // Add the route line layer with improved styling
        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#00A86B', // Green color for better visibility
            'line-width': 6,
            'line-opacity': 0.8
          }
        });

        // Add a glow effect with a second line
        map.addLayer({
          id: 'route-glow',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#64DD17',
            'line-width': 10,
            'line-opacity': 0.3,
            'line-blur': 3
          }
        }, 'route-line');
        
        // Save references to remove later
        setRouteLayer(['route-line', 'route-glow']);
      } else {
        // Update existing source with new route data
        map.getSource('route').setData({
          type: 'Feature',
          properties: {},
          geometry: geometry
        });
      }
    } catch (error) {
      console.error("Error drawing route:", error);
    }
  };

  // Draw a fallback route when API attempts fail
  const drawFallbackRoute = (start: [number, number], end: [number, number]) => {
    // Create a simple direct line between points
    const simpleGeometry = {
      type: "LineString",
      coordinates: [start, end]
    };
    
    // Calculate simple distance (very rough)
    const lngDiff = Math.abs(end[0] - start[0]);
    const latDiff = Math.abs(end[1] - start[1]);
    const distance = Math.sqrt(lngDiff * lngDiff + latDiff * latDiff) * 111; // ~111km per degree
    
    // Calculate simple duration (assuming 40km/h average speed)
    const duration = (distance / 40) * 60; // minutes
    
    setRoute({
      distance: distance,
      duration: duration,
      geometry: simpleGeometry
    });
    
    // Draw the route on the map
    drawRoute(simpleGeometry);
    
    // Fit map to show the entire route (with padding)
    map.fitBounds([
      [Math.min(start[0], end[0]), Math.min(start[1], end[1])],
      [Math.max(start[0], end[0]), Math.max(start[1], end[1])]
    ], { padding: 50 });
  };

  // Format distance and duration for display
  const formatDistance = (km: number) => {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
  };
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      return `${hours} h ${mins} min`;
    }
  };

  // Show directions panel
  const handleShowDirections = (locationId: number) => {
    setSelectedLocation(locationId);
    setShowDirections(true);
    
    // If using current location and it's available, get route
    if (directionsFrom === 'current' && currentLocation) {
      const selectedCoords = cscLocations.find(loc => loc.id === locationId)?.coordinates || [0, 0];
      getRoute(currentLocation, selectedCoords);
    }
  };

  // Close directions panel
  const handleCloseDirections = () => {
    setShowDirections(false);
    clearRoute();
  };

  // Get directions from current location
  const getDirectionsFromCurrentLocation = () => {
    if (currentLocation && selectedLocation) {
      setDirectionsFrom('current');
      const selectedCoords = getSelectedLocationCoords();
      getRoute(currentLocation, selectedCoords).catch(err => {
        console.error("Failed to get directions from current location:", err);
        // Error is handled inside getRoute function
      });
    }
  };

  // Add custom styled markers for CSC locations
  const addMarkers = (olaMapInstance: any, mapInstance: any) => {
    if (!olaMapInstance || !mapInstance) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    const newMarkers: any[] = [];
    
    // Add markers for each location
    filteredLocations.forEach((location) => {
      // Create popup for this location with improved styling
      const popup = olaMapInstance
        .addPopup({ offset: [0, -15] })
        .setHTML(`
          <div style="padding: 15px; max-width: 280px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0; color: #1a3a5f; font-weight: 600;">${location.name}</h3>
            ${location.imageUrl ? `
              <div style="margin: 10px 0; width: 100%; height: 120px; overflow: hidden; border-radius: 6px;">
                <img src="${location.imageUrl}" alt="${location.name}" 
                     style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            ` : ''}
            <p style="margin: 8px 0; font-weight: 500;"><strong>Address:</strong> ${location.address}</p>
            <p style="margin: 8px 0; color: #555;">${location.description}</p>
            <div style="margin: 10px 0;">
              <strong>Services:</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px;">
                ${location.services.map(service => 
                  `<span style="background: #e8f5e9; color: #2e7d32; padding: 3px 8px; 
                   border-radius: 4px; font-size: 12px;">${service}</span>`
                ).join('')}
              </div>
            </div>
            <p style="margin: 8px 0; color: #666;"><strong>District:</strong> ${location.district}, ${location.state}</p>
            <button onclick="document.dispatchEvent(new CustomEvent('getDirections', {detail: ${location.id}}))" 
                    style="background: #00A86B; color: white; border: none; padding: 8px 16px; 
                    border-radius: 4px; cursor: pointer; margin-top: 5px; width: 100%;">
              Get Directions
            </button>
          </div>
        `);
      
      // Create custom marker element for CSC location
      const el = document.createElement('div');
      
      // Apply styles directly to marker element
      el.style.width = '32px';
      el.style.height = '42px';
      el.style.backgroundImage = selectedLocation === location.id ? 
        'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 32\'%3e%3cpath fill=\'%23FF3E4D\' stroke=\'white\' stroke-width=\'1\' d=\'M12 0c-6.627 0-12 5.373-12 12 0 8.432 12 20 12 20s12-11.568 12-20c0-6.627-5.373-12-12-12zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z\'/%3e%3c/svg%3e")' : 
        'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 32\'%3e%3cpath fill=\'%2300A86B\' stroke=\'white\' stroke-width=\'1\' d=\'M12 0c-6.627 0-12 5.373-12 12 0 8.432 12 20 12 20s12-11.568 12-20c0-6.627-5.373-12-12-12zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z\'/%3e%3c/svg%3e")';
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.cursor = 'pointer';
      
      // Add animation for selected markers
      if (selectedLocation === location.id) {
        el.style.animation = 'bounce 0.5s ease infinite alternate';
      }
      
      // Add marker with custom element
      const marker = olaMapInstance
        .addMarker({ 
          element: el,
          offset: [0, 0], 
          anchor: 'bottom' 
        })
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(mapInstance);
      
      // Add click event to marker
      marker.getElement().addEventListener('click', () => {
        setSelectedLocation(location.id);
        mapInstance.flyTo({
          center: location.coordinates,
          zoom: 14
        });
      });
      
      newMarkers.push(marker);
    });
    
    setMarkers(newMarkers);
    
    // Add event listener for "Get Directions" button in popups
    document.addEventListener('getDirections', (e: any) => {
      const locationId = e.detail;
      handleShowDirections(locationId);
    });
  };

  // Add user location marker with improved styling - using green colors
  const addUserMarker = (olaMapInstance: any, mapInstance: any) => {
    if (!olaMapInstance || !mapInstance || !currentLocation) return;
    
    if (userMarker) {
      userMarker.remove();
    }
    
    // Create popup for user location with improved styling
    const popup = olaMapInstance
      .addPopup({ offset: [0, -15] })
      .setHTML(`
        <div style="padding: 12px; max-width: 220px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; color: #00A86B; font-weight: 600;">Your Location</h3>
          <p style="margin: 5px 0; color: #333;">This is your current position</p>
        </div>
      `);
    
    // Custom marker element with green styling
    const el = document.createElement('div');
    el.className = styles.userMarker;
    
    // Create inner elements for the user marker with explicit styles
    const dotElement = document.createElement('div');
    dotElement.className = styles.userMarkerDot;
    dotElement.style.backgroundColor = '#00A86B'; // Green dot
    dotElement.style.border = '2px solid white';
    
    const pulseElement = document.createElement('div');
    pulseElement.className = styles.userMarkerPulse;
    pulseElement.style.backgroundColor = 'rgba(0, 168, 107, 0.3)'; // Green pulse with transparency
    
    // Append children to marker element
    el.appendChild(dotElement);
    el.appendChild(pulseElement);
    
    // Add marker
    const marker = olaMapInstance
      .addMarker({ 
        element: el,
        offset: [0, 0], 
        anchor: 'center' 
      })
      .setLngLat(currentLocation)
      .setPopup(popup)
      .addTo(mapInstance);
    
    setUserMarker(marker);
  };
  
  // Update markers when selected location changes or filters change
  useEffect(() => {
    if (olaMaps && map) {
      addMarkers(olaMaps, map);
    }
  }, [selectedLocation, filters, olaMaps, map]);
  
  // Handle clicking on a location in the list
  const handleLocationClick = (location: CSC) => {
    setSelectedLocation(location.id);
    
    if (map) {
      map.flyTo({
        center: location.coordinates,
        zoom: 14
      });
    }
    
    // If start location is already set, get route
    if (startLocation) {
      getRoute(startLocation, location.coordinates);
    }
  };

  // Center map on user location
  const goToMyLocation = () => {
    if (map && currentLocation) {
      map.flyTo({
        center: currentLocation,
        zoom: 15
      });
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      state: "",
      district: "",
      subdistrict: "",
      village: ""
    });
    setSelectedLocation(null);
    
    if (map) {
      map.flyTo({
        center: currentLocation || [78.9629, 20.5937],
        zoom: 5
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer} id="map" ref={mapRef}></div>
      
      <div className={styles.sidebar}>
        <div className={styles.filterSection}>
          <h2>Find Common Service Centers</h2>
          
          <div className={styles.filters}>
            <div className={styles.filterItem}>
              <label htmlFor="state">State</label>
              <select 
                id="state"
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className={styles.selectInput}
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterItem}>
              <label htmlFor="district">District</label>
              <select 
                id="district"
                value={filters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className={styles.selectInput}
              >
                <option value="">All Districts</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterItem}>
              <label htmlFor="subdistrict">Subdistrict</label>
              <select 
                id="subdistrict"
                value={filters.subdistrict}
                onChange={(e) => handleFilterChange('subdistrict', e.target.value)}
                className={styles.selectInput}
              >
                <option value="">All Subdistricts</option>
                {subdistricts.map(subdistrict => (
                  <option key={subdistrict} value={subdistrict}>{subdistrict}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterItem}>
              <label htmlFor="village">Village</label>
              <select 
                id="village"
                value={filters.village}
                onChange={(e) => handleFilterChange('village', e.target.value)}
                className={styles.selectInput}
              >
                <option value="">All Villages</option>
                {villages.map(village => (
                  <option key={village} value={village}>{village}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterActions}>
              <button onClick={resetFilters} className={styles.resetBtn}>
                Reset Filters
              </button>
              <button onClick={goToMyLocation} className={styles.myLocationBtn}>
                My Location
              </button>
            </div>
          </div>
        </div>
        
        {showDirections ? (
          <div className={styles.directionsPanel}>
            <div className={styles.directionsPanelHeader}>
              <h3>Directions</h3>
              <button 
                onClick={handleCloseDirections} 
                className={styles.closeBtn}
                aria-label="Close directions"
              >
                ✕
              </button>
            </div>
            
            <div className={styles.directionsContent}>
              {selectedLocation && (
                <div className={styles.destination}>
                  <h4>Destination:</h4>
                  <p>{cscLocations.find(loc => loc.id === selectedLocation)?.name}</p>
                  <p className={styles.locationAddress}>
                    {cscLocations.find(loc => loc.id === selectedLocation)?.address}
                  </p>
                </div>
              )}
              
              <div className={styles.directionsOptions}>
                <div className={styles.optionsTabs}>
                  <button 
                    className={`${styles.optionTab} ${directionsFrom === 'current' ? styles.activeTab : ''}`}
                    onClick={() => setDirectionsFrom('current')}
                  >
                    Current Location
                  </button>
                  <button 
                    className={`${styles.optionTab} ${directionsFrom === 'search' ? styles.activeTab : ''}`}
                    onClick={() => setDirectionsFrom('search')}
                  >
                    Search Location
                  </button>
                </div>
                
                {directionsFrom === 'current' ? (
                  <div className={styles.currentLocationOption}>
                    <p>From: {currentLocation ? 'Your Current Location' : 'Locating you...'}</p>
                    <button 
                      onClick={getDirectionsFromCurrentLocation} 
                      className={styles.getDirectionsBtn}
                      disabled={!currentLocation || !selectedLocation}
                    >
                      Get Directions
                    </button>
                  </div>
                ) : (
                  <div className={styles.searchLocationOption}>
                    <div className={styles.searchBox}>
                      <input
                        type="text"
                        placeholder="Enter a starting location"
                        value={startSearchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => {
                          if (searchResults.length > 0) setShowSearchDropdown(true);
                        }}
                        className={styles.searchInput}
                      />
                      {isSearching && <span className={styles.searchingIndicator}>Searching...</span>}
                      
                      {showSearchDropdown && searchResults.length > 0 && (
                        <div className={styles.searchResultsDropdown}>
                          {searchResults.map((result, index) => (
                            <div 
                              key={index} 
                              className={styles.searchResultItem}
                              onClick={() => selectSearchResult(result)}
                            >
                              <span>{result.properties.name}</span>
                              <small>{result.properties.city || ''} {result.properties.country || ''}</small>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => {
                        if (startLocation && selectedLocation) {
                          getRoute(startLocation, getSelectedLocationCoords());
                        }
                      }} 
                      className={styles.getDirectionsBtn}
                      disabled={!startLocation || !selectedLocation}
                    >
                      Get Directions
                    </button>
                  </div>
                )}
              </div>
              
              {isRouteFetching && (
                <div className={styles.loadingRoute}>
                  <div className={styles.spinner}></div>
                  <p>Finding the best route...</p>
                </div>
              )}
              
              {route && (
                <div className={styles.routeInfo}>
                  <div className={styles.routeSummary}>
                    <div className={styles.routeMetric}>
                      <span className={styles.routeMetricValue}>
                        {formatDistance(route.distance)}
                      </span>
                      <span className={styles.routeMetricLabel}>Distance</span>
                    </div>
                    <div className={styles.routeMetric}>
                      <span className={styles.routeMetricValue}>
                        {formatDuration(route.duration)}
                      </span>
                      <span className={styles.routeMetricLabel}>Duration</span>
                    </div>
                  </div>
                  <div className={styles.routeTips}>
                    <p>Follow the green route to reach your destination.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.locationsList}>
            <h3>CSC Locations {filteredLocations.length > 0 ? `(${filteredLocations.length})` : ''}</h3>
            
            {filteredLocations.length === 0 ? (
              <div className={styles.noResults}>No CSCs found with current filters</div>
            ) : (
              <ul>
                {filteredLocations.map((location) => (
                  <li 
                    key={location.id}
                    className={`${styles.locationItem} ${selectedLocation === location.id ? styles.selected : ''}`}
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className={styles.locationContent}>
                      <h4>{location.name}</h4>
                      <p className={styles.locationAddress}>{location.address}</p>
                      <p className={styles.locationRegion}>{location.subdistrict}, {location.district}</p>
                      <div className={styles.services}>
                        {location.services.slice(0, 3).map((service, idx) => (
                          <span key={idx} className={styles.serviceTag}>{service}</span>
                        ))}
                        {location.services.length > 3 && (
                          <span className={styles.serviceTag}>+{location.services.length - 3} more</span>
                        )})
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowDirections(location.id);
                      }}
                      className={styles.directionsBtn}
                      aria-label="Get directions"
                    >
                      Directions
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;