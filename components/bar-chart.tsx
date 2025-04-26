"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface BarChartProps {
  data?: {
    name: string
    value: number
  }[]
  horizontal?: boolean
}

export function BarChart({ data, horizontal = false }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Default data if none provided
    const defaultData = [
      { name: "يناير", value: 65 },
      { name: "فبراير", value: 59 },
      { name: "مارس", value: 80 },
      { name: "أبريل", value: 81 },
      { name: "مايو", value: 56 },
      { name: "يونيو", value: 55 },
      { name: "يوليو", value: 40 },
    ]

    const chartData = data || defaultData
    const labels = chartData.map((item) => item.name)
    const values = chartData.map((item) => item.value)

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar", // Always use 'bar' type
      data: {
        labels,
        datasets: [
          {
            label: "القيمة",
            data: values,
            backgroundColor: "rgba(59, 130, 246, 0.5)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: horizontal ? "y" : "x", // Use indexAxis to control orientation
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, horizontal])

  return <canvas ref={chartRef} />
}
