import Image from "next/image"

interface CurrencySymbolProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function CurrencySymbol({ size = "medium", className }: CurrencySymbolProps) {
  const sizeMap = {
    small: 12,
    medium: 16,
    large: 20,
  }

  const pixelSize = sizeMap[size]

  return (
    <span className={`inline-flex items-center ${className || ""}`}>
      <Image src="/icons/sar.png" alt="SAR" width={pixelSize} height={pixelSize} className="inline-block" />
    </span>
  )
}
