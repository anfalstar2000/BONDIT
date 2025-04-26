"use client"

interface NodePosition {
  x: number
  y: number
}

interface Node {
  id: string
  type: string
  position: NodePosition
  data: any
}

interface Connection {
  id: string
  source: string
  target: string
  label?: string
}

interface FlowConnectionProps {
  connection: Connection
  nodes: Node[]
  isSelected: boolean
  onClick: () => void
}

export function FlowConnection({ connection, nodes, isSelected, onClick }: FlowConnectionProps) {
  const sourceNode = nodes.find((node) => node.id === connection.source)
  const targetNode = nodes.find((node) => node.id === connection.target)

  if (!sourceNode || !targetNode) return null

  // حساب نقاط البداية والنهاية للاتصال
  const startX = sourceNode.position.x + 24 // منتصف العنصر
  const startY = sourceNode.position.y + 40 // أسفل العنصر
  const endX = targetNode.position.x + 24 // منتصف العنصر
  const endY = targetNode.position.y // أعلى العنصر

  // حساب نقطة التحكم للمنحنى
  const controlPointY = (startY + endY) / 2

  // إنشاء مسار SVG للاتصال
  const path = `M ${startX} ${startY} C ${startX} ${controlPointY}, ${endX} ${controlPointY}, ${endX} ${endY}`

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      <path
        d={path}
        fill="none"
        stroke={isSelected ? "#3b82f6" : "#94a3b8"}
        strokeWidth={isSelected ? 3 : 2}
        strokeDasharray={isSelected ? "5,5" : "none"}
        markerEnd="url(#arrowhead)"
      />
      {connection.label && (
        <text
          x={(startX + endX) / 2}
          y={(startY + endY) / 2 - 10}
          textAnchor="middle"
          fill="#64748b"
          fontSize="12"
          onClick={onClick}
          className="pointer-events-auto cursor-pointer"
        >
          {connection.label}
        </text>
      )}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  )
}
