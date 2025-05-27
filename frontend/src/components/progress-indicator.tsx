"use client"
import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  value: number
  label?: string
  variant?: "default" | "success" | "warning" | "danger"
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function ProgressIndicator({
  value,
  label,
  variant = "default",
  size = "md",
  showValue = true,
  className,
}: ProgressIndicatorProps) {
  // Ensure value is between 0-100
  const progress = Math.max(0, Math.min(100, value))

  // Size variants
  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }

  // Color variants
  const variants = {
    default: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    danger: "bg-red-600",
  }

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>}
          {showValue && <span className="text-sm text-gray-600 dark:text-gray-400">{progress}%</span>}
        </div>
      )}
      <div className={cn("relative w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800", sizes[size])}>
        <div
          className={cn("h-full transition-all duration-300 ease-in-out", variants[variant])}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

