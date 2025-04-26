"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
import { DoubleBarChart } from "@/components/double-bar-chart"
import { CurrencySymbol } from "@/components/currency-symbol"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

// Datos para diferentes períodos (limitados a 7 elementos)
const weeklyData = [
  { label: "السبت", value1: 70, value2: 85, profit: 1200, income: 3500, growthRate: 8.5 },
  { label: "الأحد", value1: 85, value2: 95, profit: 1450, income: 4200, growthRate: 12.3 },
  { label: "الإثنين", value1: 60, value2: 75, profit: 980, income: 2800, growthRate: -5.2 },
  { label: "الثلاثاء", value1: 55, value2: 65, profit: 920, income: 2600, growthRate: 3.1 },
  { label: "الأربعاء", value1: 50, value2: 60, profit: 850, income: 2400, growthRate: 1.8 },
  { label: "الخميس", value1: 65, value2: 80, profit: 1100, income: 3200, growthRate: 7.2 },
  { label: "الجمعة", value1: 75, value2: 90, profit: 1300, income: 3800, growthRate: 9.6 },
]

const monthlyData = [
  { label: "يناير", value1: 60, value2: 80, profit: 5200, income: 15000, growthRate: 4.2 },
  { label: "فبراير", value1: 70, value2: 90, profit: 6100, income: 17500, growthRate: 6.8 },
  { label: "مارس", value1: 80, value2: 100, profit: 7000, income: 20000, growthRate: 9.3 },
  { label: "أبريل", value1: 65, value2: 85, profit: 5600, income: 16200, growthRate: -2.1 },
  { label: "مايو", value1: 75, value2: 95, profit: 6500, income: 18700, growthRate: 7.5 },
  { label: "يونيو", value1: 85, value2: 105, profit: 7400, income: 21300, growthRate: 8.9 },
  { label: "يوليو", value1: 90, value2: 110, profit: 7800, income: 22500, growthRate: 10.2 },
]

const yearlyData = [
  { label: "2018", value1: 40, value2: 50, profit: 32000, income: 95000, growthRate: 3.5 },
  { label: "2019", value1: 45, value2: 55, profit: 38000, income: 110000, growthRate: 5.2 },
  { label: "2020", value1: 50, value2: 65, profit: 42000, income: 120000, growthRate: 2.8 },
  { label: "2021", value1: 60, value2: 75, profit: 52000, income: 150000, growthRate: 7.3 },
  { label: "2022", value1: 70, value2: 85, profit: 61000, income: 175000, growthRate: 8.1 },
  { label: "2023", value1: 80, value2: 95, profit: 70000, income: 200000, growthRate: 9.4 },
  { label: "2024", value1: 90, value2: 110, profit: 78000, income: 225000, growthRate: 6.2 },
]

// Función para formatear números
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Función para calcular el porcentaje de cambio
const calculateChange = (current: number, previous: number) => {
  if (previous === 0) return 100
  return ((current - previous) / previous) * 100
}

export function StatisticsCard() {
  const [period, setPeriod] = useState<"أسبوعي" | "شهري" | "سنوي">("أسبوعي")
  const [selectedBar, setSelectedBar] = useState<number | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [totalProfit, setTotalProfit] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [chartData, setChartData] = useState(weeklyData)
  const [profitChange, setProfitChange] = useState(0)
  const [incomeChange, setIncomeChange] = useState(0)
  const [previousPeriod, setPreviousPeriod] = useState<"أسبوعي" | "شهري" | "سنوي" | null>(null)
  const prevTotalProfitRef = useRef(0)
  const prevTotalIncomeRef = useRef(0)

  // Actualizar datos según el período seleccionado
  useEffect(() => {
    let newData
    switch (period) {
      case "أسبوعي":
        newData = weeklyData
        break
      case "شهري":
        newData = monthlyData
        break
      case "سنوي":
        newData = yearlyData
        break
      default:
        newData = weeklyData
    }

    setChartData(newData)

    // Guardar valores anteriores para calcular el cambio
    if (previousPeriod !== null && previousPeriod !== period) {
      prevTotalProfitRef.current = totalProfit
      prevTotalIncomeRef.current = totalIncome
    }

    // Calcular totales
    const profit = newData.reduce((sum, item) => sum + item.profit, 0)
    const income = newData.reduce((sum, item) => sum + item.income, 0)

    // Calcular cambios porcentuales
    if (previousPeriod !== null) {
      setProfitChange(calculateChange(profit, prevTotalProfitRef.current))
      setIncomeChange(calculateChange(income, prevTotalIncomeRef.current))
    }

    // Animación de números
    setIsAnimating(true)
    let startProfit = 0
    let startIncome = 0
    const duration = 1000
    const interval = 20
    const steps = duration / interval
    const profitStep = profit / steps
    const incomeStep = income / steps

    const timer = setInterval(() => {
      startProfit += profitStep
      startIncome += incomeStep

      if (startProfit >= profit && startIncome >= income) {
        setTotalProfit(profit)
        setTotalIncome(income)
        setIsAnimating(false)
        clearInterval(timer)
      } else {
        setTotalProfit(Math.floor(startProfit))
        setTotalIncome(Math.floor(startIncome))
      }
    }, interval)

    setPreviousPeriod(period)

    return () => clearInterval(timer)
  }, [period])

  // Manejar clic en una barra
  const handleBarClick = (item: any, index: number) => {
    setSelectedBar(index)
    setShowDetails(true)
  }

  return (
    <Card className="bg-white shadow-sm rounded-3xl border border-gray-100 h-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-medium">إحصائيات</h2>
          <div className="flex gap-1">
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 19L8 12L15 5"
                  stroke="#858585"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 5L16 12L9 19"
                  stroke="#858585"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1">
            <button
              className={`px-3 py-1 rounded-full text-xs ${period === "أسبوعي" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
              onClick={() => setPeriod("أسبوعي")}
            >
              أسبوعي
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs ${period === "شهري" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
              onClick={() => setPeriod("شهري")}
            >
              شهري
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs ${period === "سنوي" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
              onClick={() => setPeriod("سنوي")}
            >
              سنوي
            </button>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-blue-500 text-xs mb-0.5">
                <span>الربح</span>
                {profitChange !== 0 && previousPeriod !== null && (
                  <div className={`flex items-center text-xs ${profitChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {profitChange >= 0 ? <TrendingUpIcon size={10} /> : <TrendingDownIcon size={10} />}
                    <span>{Math.abs(profitChange).toFixed(1)}%</span>
                  </div>
                )}
              </div>
              <div className="text-xl font-bold text-blue-500">
                {isAnimating ? formatNumber(totalProfit) : formatNumber(totalProfit)} <CurrencySymbol />
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-gray-500 text-xs mb-0.5">
                <span>الدخل</span>
                {incomeChange !== 0 && previousPeriod !== null && (
                  <div className={`flex items-center text-xs ${incomeChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {incomeChange >= 0 ? <TrendingUpIcon size={10} /> : <TrendingDownIcon size={10} />}
                    <span>{Math.abs(incomeChange).toFixed(1)}%</span>
                  </div>
                )}
              </div>
              <div className="text-xl font-bold">
                {isAnimating ? formatNumber(totalIncome) : formatNumber(totalIncome)} <CurrencySymbol />
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-2">
          <Dialog
            open={showDetails && selectedBar !== null}
            onOpenChange={(open) => {
              setShowDetails(open)
              if (!open) setSelectedBar(null)
            }}
          >
            <DoubleBarChart data={chartData} onBarClick={handleBarClick} />
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
