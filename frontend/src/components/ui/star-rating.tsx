"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  initialRating?: number
  totalStars?: number
  onRate?: (rating: number) => void
  readOnly?: boolean
}

export function StarRating({ initialRating = 0, totalStars = 5, onRate, readOnly = false }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleClick = (value: number) => {
    if (!readOnly) {
      setRating(value)
      onRate?.(value)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const value = index + 1
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => !readOnly && setHover(value)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={`${readOnly ? "cursor-default" : "cursor-pointer"}`}
          >
            <Star
              className={`h-5 w-5 ${
                value <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
              } transition-colors`}
            />
          </button>
        )
      })}
      {!readOnly && (
        <span className="text-sm text-gray-600 ml-2">
          {rating > 0 ? `${rating} out of ${totalStars}` : "Rate this scheme"}
        </span>
      )}
    </div>
  )
}

