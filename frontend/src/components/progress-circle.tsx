"use client"

import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressCircleVariants = cva("relative inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "h-20 w-20",
      md: "h-24 w-24",
      lg: "h-32 w-32",
    },
    variant: {
      default: "[--progress-color:theme(colors.blue.600)]",
      success: "[--progress-color:theme(colors.green.600)]",
      warning: "[--progress-color:theme(colors.yellow.600)]",
      danger: "[--progress-color:theme(colors.red.600)]",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
})

interface ProgressCircleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressCircleVariants> {
  value: number
  label?: string
}

export function ProgressCircle({ value, label, size, variant, className, ...props }: ProgressCircleProps) {
  // Ensure value is between 0-100
  const progress = Math.max(0, Math.min(100, value))

  // Calculate circle properties
  const strokeWidth = 8
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={cn(progressCircleVariants({ size, variant }), className)} {...props}>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-label={`${progress}%`}>
        {/* Background circle */}
        <circle
          className="stroke-gray-200 dark:stroke-gray-800"
          strokeWidth={strokeWidth}
          fill="none"
          cx="50"
          cy="50"
          r={radius}
        />
        {/* Progress circle */}
        <circle
          className="stroke-[--progress-color] transition-[stroke-dashoffset] duration-500 ease-in-out"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{progress}%</span>
        {label && <span className="mt-1 text-sm text-gray-600 dark:text-gray-400">{label}</span>}
      </div>
    </div>
  )
}

