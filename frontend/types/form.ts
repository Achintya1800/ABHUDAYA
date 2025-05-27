export type FormData = {
  step: number
  state: string
  category: "General" | "OBC" | "PVTG" | "SC" | "ST"
  gender: "Male" | "Female" | "Transgender"
  isBPL: boolean
  isDifferentlyAbled: boolean
  isSeniorCitizen: boolean
  area: "Urban" | "Rural" | ""
  occupation: string
  employmentStatus: string
  isMinority: boolean
}

export type SchemeCategory = {
  name: string
  count: number
  icon: string
  color: string
}

