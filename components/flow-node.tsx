"use client"

import type React from "react"
import {
  Flag,
  Filter,
  Check,
  Clock,
  X,
  Mail,
  MessageSquare,
  Bell,
  Award,
  Gift,
  ArrowUp,
  Smartphone,
} from "lucide-react"

interface NodePosition {
  x: number
  y: number
}

interface NodeData {
  label: string
  [key: string]: any
}

interface Node {
  id: string
  type: string
  position: NodePosition
  data: NodeData
}

interface FlowNodeProps {
  node: Node
  isSelected: boolean
  onClick: () => void
  onDragStart: (e: React.MouseEvent) => void
}

export function FlowNode({ node, isSelected, onClick, onDragStart }: FlowNodeProps) {
  const getNodeIcon = () => {
    switch (node.type) {
      case "trigger":
        return <Flag className="h-5 w-5" />
      case "condition":
        return <Filter className="h-5 w-5" />
      case "action":
        if (node.data.actionType === "send_message") {
          switch (node.data.messageType) {
            case "email":
              return <Mail className="h-5 w-5" />
            case "sms":
              return <MessageSquare className="h-5 w-5" />
            case "push":
              return <Bell className="h-5 w-5" />
            case "imessage":
              return <Smartphone className="h-5 w-5" />
            default:
              return <MessageSquare className="h-5 w-5" />
          }
        } else if (node.data.actionType === "add_points") {
          return <Award className="h-5 w-5" />
        } else if (node.data.actionType === "give_reward") {
          return <Gift className="h-5 w-5" />
        } else if (node.data.actionType === "upgrade_level") {
          return <ArrowUp className="h-5 w-5" />
        }
        return <Check className="h-5 w-5" />
      case "delay":
        return <Clock className="h-5 w-5" />
      case "end":
        return <X className="h-5 w-5" />
      default:
        return null
    }
  }

  const getNodeColor = () => {
    switch (node.type) {
      case "trigger":
        return "bg-blue-100 border-blue-300 text-blue-700"
      case "condition":
        return "bg-amber-100 border-amber-300 text-amber-700"
      case "action":
        return "bg-green-100 border-green-300 text-green-700"
      case "delay":
        return "bg-purple-100 border-purple-300 text-purple-700"
      case "end":
        return "bg-red-100 border-red-300 text-red-700"
      default:
        return "bg-gray-100 border-gray-300 text-gray-700"
    }
  }

  return (
    <div
      className={`absolute w-48 p-3 rounded-md border-2 cursor-move ${getNodeColor()} ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
      }}
      onClick={onClick}
      onMouseDown={onDragStart}
    >
      <div className="flex items-center gap-2">
        <div className="p-1 rounded-full bg-white">{getNodeIcon()}</div>
        <div className="font-medium text-sm">{node.data.label}</div>
      </div>
    </div>
  )
}
