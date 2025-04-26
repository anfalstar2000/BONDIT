"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface DoubleBarChartProps {
  data?: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
    }[]
  }
}

export function DoubleBarChart({ data }: DoubleBarChartProps) {
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
    const defaultData = {
      labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
      datasets: [
        {
          label: "النقاط الموزعة",
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          backgroundColor: "rgba(59, 130, 246, 0.5)",
        },
        {
          label: "النقاط المستبدلة",
          data: [8000, 12000, 10000, 15000, 18000, 20000],
          backgroundColor: "rgba(16, 185, 129, 0.5)",
        },
      ],
    }

    const chartData = data || defaultData

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}
