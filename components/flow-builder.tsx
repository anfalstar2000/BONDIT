"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpDown,
  Clock,
  Mail,
  MessageSquare,
  Save,
  UserPlus,
  Activity,
  Trash2,
  Play,
  ZoomIn,
  ZoomOut,
  Move,
  Settings,
  Bell,
  Gift,
  Filter,
  Layers,
  Copy,
  Search,
  ShoppingBag,
} from "lucide-react"

type NodeType = "trigger" | "condition" | "action" | "delay" | "endpoint"
type NodePosition = { x: number; y: number }

interface FlowNode {
  id: string
  type: NodeType
  label: string
  position: NodePosition
  icon: React.ReactNode
  connections: string[]
  data?: {
    actionType?: string
    messageType?: string
    delay?: number
    condition?: string
  }
}

interface Connection {
  id: string
  source: string
  target: string
  label?: string
}

export function FlowBuilder() {
  // State for nodes and connections
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: "start",
      type: "trigger",
      label: "تسجيل عميل جديد",
      position: { x: 400, y: 100 },
      icon: <UserPlus size={20} />,
      connections: ["condition1"],
    },
    {
      id: "condition1",
      type: "condition",
      label: "هل اكمل الملف الشخصي؟",
      position: { x: 400, y: 250 },
      icon: <ArrowUpDown size={20} />,
      connections: ["action1", "delay1"],
      data: {
        condition: "customer.profile_completed == true",
      },
    },
    {
      id: "action1",
      type: "action",
      label: "إرسال بريد ترحيبي",
      position: { x: 250, y: 400 },
      icon: <Mail size={20} />,
      connections: ["endpoint1"],
      data: {
        actionType: "send_message",
        messageType: "email",
      },
    },
    {
      id: "delay1",
      type: "delay",
      label: "انتظار 3 أيام",
      position: { x: 550, y: 400 },
      icon: <Clock size={20} />,
      connections: ["action2"],
      data: {
        delay: 3,
      },
    },
    {
      id: "action2",
      type: "action",
      label: "إرسال تذكير",
      position: { x: 550, y: 550 },
      icon: <MessageSquare size={20} />,
      connections: ["endpoint1"],
      data: {
        actionType: "send_message",
        messageType: "sms",
      },
    },
    {
      id: "endpoint1",
      type: "endpoint",
      label: "نهاية المسار",
      position: { x: 400, y: 700 },
      icon: <Activity size={20} />,
      connections: [],
    },
  ])

  // State for UI
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState<NodePosition>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(100)
  const [showProperties, setShowProperties] = useState<boolean>(true)
  const [showLibrary, setShowLibrary] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>("elements")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreatingConnection, setIsCreatingConnection] = useState<boolean>(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)
  const [flowName, setFlowName] = useState<string>("مسار ترحيب العملاء الجدد")
  const [savedFlows, setSavedFlows] = useState<{ id: string; name: string }[]>([
    { id: "flow1", name: "مسار ترحيب العملاء الجدد" },
    { id: "flow2", name: "مسار استعادة العملاء الخاملين" },
    { id: "flow3", name: "مسار تذكير السلة المتروكة" },
  ])

  const canvasRef = useRef<HTMLDivElement>(null)

  // Handle node selection
  const handleNodeClick = (e: React.MouseEvent<HTMLDivElement>, nodeId: string) => {
    e.stopPropagation()
    setSelectedNode(nodeId)
  }

  // Handle node dragging
  const handleNodeMouseDown = (e: React.MouseEvent<HTMLDivElement>, nodeId: string) => {
    e.stopPropagation()
    setSelectedNode(nodeId)

    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    setDragging(nodeId)

    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return

    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (!canvasRect) return

    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === dragging) {
          return {
            ...node,
            position: {
              x: (e.clientX - canvasRect.left - dragOffset.x) / (zoom / 100),
              y: (e.clientY - canvasRect.top - dragOffset.y) / (zoom / 100),
            },
          }
        }
        return node
      }),
    )
  }

  const handleMouseUp = () => {
    setDragging(null)
  }

  // Handle canvas click
  const handleCanvasClick = () => {
    setSelectedNode(null)
  }

  // Get node color based on type
  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case "trigger":
        return "bg-blue-100 border-blue-300 text-blue-700"
      case "condition":
        return "bg-purple-100 border-purple-300 text-purple-700"
      case "action":
        return "bg-green-100 border-green-300 text-green-700"
      case "delay":
        return "bg-orange-100 border-orange-300 text-orange-700"
      case "endpoint":
        return "bg-red-100 border-red-300 text-red-700"
      default:
        return "bg-gray-100 border-gray-300 text-gray-700"
    }
  }

  // Add new node
  const addNode = (type: NodeType) => {
    const id = `${type}${Date.now()}`
    let icon
    let label
    let data = {}

    switch (type) {
      case "trigger":
        icon = <UserPlus size={20} />
        label = "حدث بداية جديد"
        break
      case "condition":
        icon = <ArrowUpDown size={20} />
        label = "شرط جديد"
        data = { condition: "" }
        break
      case "action":
        icon = <Mail size={20} />
        label = "إجراء جديد"
        data = { actionType: "send_message", messageType: "email" }
        break
      case "delay":
        icon = <Clock size={20} />
        label = "تأخير جديد"
        data = { delay: 1 }
        break
      case "endpoint":
        icon = <Activity size={20} />
        label = "نهاية جديدة"
        break
    }

    const newNode: FlowNode = {
      id,
      type,
      label,
      position: { x: 400, y: 400 },
      icon,
      connections: [],
      data,
    }

    setNodes((prev) => [...prev, newNode])
    setSelectedNode(id)
  }

  // Delete selected node
  const deleteSelectedNode = () => {
    if (!selectedNode) return

    setNodes((prev) => {
      // Remove the node
      const filteredNodes = prev.filter((node) => node.id !== selectedNode)

      // Remove any connections to this node
      return filteredNodes.map((node) => ({
        ...node,
        connections: node.connections.filter((id) => id !== selectedNode),
      }))
    })

    setSelectedNode(null)
  }

  // Update node label
  const updateNodeLabel = (id: string, newLabel: string) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, label: newLabel } : node)))
  }

  // Start creating a connection
  const startConnection = (nodeId: string) => {
    setIsCreatingConnection(true)
    setConnectionStart(nodeId)
  }

  // Complete connection
  const completeConnection = (targetId: string) => {
    if (!connectionStart || connectionStart === targetId) {
      setIsCreatingConnection(false)
      setConnectionStart(null)
      return
    }

    setNodes((prev) =>
      prev.map((node) =>
        node.id === connectionStart ? { ...node, connections: [...node.connections, targetId] } : node,
      ),
    )

    setIsCreatingConnection(false)
    setConnectionStart(null)
  }

  // Save flow
  const saveFlow = () => {
    // Here you would typically save to backend
    alert(`تم حفظ المسار "${flowName}" بنجاح`)
  }

  // Simulate flow
  const simulateFlow = () => {
    alert("جاري محاكاة المسار...")
  }

  // Handle zoom
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50))
  }

  // Reset zoom
  const resetZoom = () => {
    setZoom(100)
  }

  // Filter library items
  const filteredLibraryItems = [
    { type: "trigger", label: "تسجيل عميل جديد", icon: <UserPlus size={16} /> },
    { type: "trigger", label: "إتمام طلب", icon: <Activity size={16} /> },
    { type: "condition", label: "التحقق من قيمة الطلب", icon: <Filter size={16} /> },
    { type: "action", label: "إرسال بريد إلكتروني", icon: <Mail size={16} /> },
    { type: "action", label: "إرسال رسالة نصية", icon: <MessageSquare size={16} /> },
    { type: "action", label: "إرسال إشعار", icon: <Bell size={16} /> },
    { type: "action", label: "منح نقاط", icon: <Gift size={16} /> },
    { type: "delay", label: "انتظار يوم", icon: <Clock size={16} /> },
    { type: "delay", label: "انتظار أسبوع", icon: <Clock size={16} /> },
  ].filter((item) => item.label.includes(searchTerm) || item.type.includes(searchTerm))

  // Get selected node
  const selectedNodeData = selectedNode ? nodes.find((node) => node.id === selectedNode) : null

  return (
    <div className="flex flex-col h-[700px] rtl" dir="rtl">
      {/* Top Toolbar */}
      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Input value={flowName} onChange={(e) => setFlowName(e.target.value)} className="w-64 text-lg font-medium" />
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            نشط
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>تصغير</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm">{zoom}%</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>تكبير</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={resetZoom}>
                  <Move size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>إعادة ضبط</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          <Button variant="outline" size="sm" onClick={() => setShowLibrary(!showLibrary)}>
            <Layers size={16} className="ml-2" />
            {showLibrary ? "إخفاء المكتبة" : "عرض المكتبة"}
          </Button>

          <Button variant="outline" size="sm" onClick={() => setShowProperties(!showProperties)}>
            <Settings size={16} className="ml-2" />
            {showProperties ? "إخفاء الخصائص" : "عرض الخصائص"}
          </Button>

          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          <Button variant="default" size="sm" onClick={simulateFlow}>
            <Play size={16} className="ml-2" />
            محاكاة
          </Button>

          <Button variant="default" size="sm" onClick={saveFlow}>
            <Save size={16} className="ml-2" />
            حفظ
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Left Sidebar - Library */}
        {showLibrary && (
          <div className="w-64 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="elements">العناصر</TabsTrigger>
                <TabsTrigger value="flows">المسارات</TabsTrigger>
                <TabsTrigger value="templates">القوالب</TabsTrigger>
              </TabsList>

              <div className="p-3">
                <Input
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-3"
                  prefix={<Search size={16} className="text-gray-400" />}
                />

                {activeTab === "elements" && (
                  <div className="space-y-2 overflow-y-auto max-h-[500px]">
                    <div className="text-sm font-medium text-gray-500 mb-1">أحداث البداية</div>
                    {filteredLibraryItems
                      .filter((item) => item.type === "trigger")
                      .map((item, index) => (
                        <div
                          key={`trigger-${index}`}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() => addNode("trigger" as NodeType)}
                        >
                          <div className="p-1 rounded-full bg-blue-100 text-blue-700">{item.icon}</div>
                          <span className="text-sm">{item.label}</span>
                        </div>
                      ))}

                    <div className="text-sm font-medium text-gray-500 mb-1 mt-3">الشروط</div>
                    {filteredLibraryItems
                      .filter((item) => item.type === "condition")
                      .map((item, index) => (
                        <div
                          key={`condition-${index}`}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() => addNode("condition" as NodeType)}
                        >
                          <div className="p-1 rounded-full bg-purple-100 text-purple-700">{item.icon}</div>
                          <span className="text-sm">{item.label}</span>
                        </div>
                      ))}

                    <div className="text-sm font-medium text-gray-500 mb-1 mt-3">الإجراءات</div>
                    {filteredLibraryItems
                      .filter((item) => item.type === "action")
                      .map((item, index) => (
                        <div
                          key={`action-${index}`}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() => addNode("action" as NodeType)}
                        >
                          <div className="p-1 rounded-full bg-green-100 text-green-700">{item.icon}</div>
                          <span className="text-sm">{item.label}</span>
                        </div>
                      ))}

                    <div className="text-sm font-medium text-gray-500 mb-1 mt-3">التأخير</div>
                    {filteredLibraryItems
                      .filter((item) => item.type === "delay")
                      .map((item, index) => (
                        <div
                          key={`delay-${index}`}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() => addNode("delay" as NodeType)}
                        >
                          <div className="p-1 rounded-full bg-orange-100 text-orange-700">{item.icon}</div>
                          <span className="text-sm">{item.label}</span>
                        </div>
                      ))}

                    <div className="text-sm font-medium text-gray-500 mb-1 mt-3">النهايات</div>
                    <div
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => addNode("endpoint" as NodeType)}
                    >
                      <div className="p-1 rounded-full bg-red-100 text-red-700">
                        <Activity size={16} />
                      </div>
                      <span className="text-sm">نهاية المسار</span>
                    </div>
                  </div>
                )}

                {activeTab === "flows" && (
                  <div className="space-y-2 overflow-y-auto max-h-[500px]">
                    {savedFlows.map((flow) => (
                      <div
                        key={flow.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <span className="text-sm">{flow.name}</span>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Copy size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "templates" && (
                  <div className="space-y-2 overflow-y-auto max-h-[500px]">
                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-full bg-blue-100 text-blue-700">
                          <UserPlus size={16} />
                        </div>
                        <span className="text-sm">ترحيب العملاء الجدد</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Copy size={14} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-full bg-green-100 text-green-700">
                          <ShoppingBag size={16} />
                        </div>
                        <span className="text-sm">استعادة السلة المتروكة</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Copy size={14} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-full bg-purple-100 text-purple-700">
                          <Gift size={16} />
                        </div>
                        <span className="text-sm">تهنئة عيد الميلاد</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Copy size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        )}

        {/* Main Canvas */}
        <Card className="flex-1 relative overflow-hidden border-2 border-dashed">
          <div
            ref={canvasRef}
            className="absolute inset-0 bg-gray-50"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top right",
            }}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Grid Background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 0)",
                backgroundSize: "20px 20px",
                backgroundPosition: "-10px -10px",
              }}
            ></div>

            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
              </defs>

              {nodes.map((node) =>
                node.connections.map((targetId) => {
                  const target = nodes.find((n) => n.id === targetId)
                  if (!target) return null

                  // Calculate path
                  const startX = node.position.x + 75
                  const startY = node.position.y + 40
                  const endX = target.position.x + 75
                  const endY = target.position.y

                  // Control points for curve
                  const midY = (startY + endY) / 2

                  // Create path
                  const path = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`

                  return (
                    <g key={`${node.id}-${targetId}`}>
                      <path
                        d={path}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray={connectionStart === node.id ? "5,5" : "none"}
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />

                      {/* Connection label if needed */}
                      {node.type === "condition" && (
                        <text
                          x={(startX + endX) / 2}
                          y={(startY + endY) / 2 - 10}
                          textAnchor="middle"
                          fill="#64748b"
                          fontSize="12"
                        >
                          {target.id === node.connections[0] ? "نعم" : "لا"}
                        </text>
                      )}
                    </g>
                  )
                }),
              )}

              {/* Drawing connection line */}
              {isCreatingConnection && connectionStart && (
                <line
                  x1={nodes.find((n) => n.id === connectionStart)?.position.x + 75 || 0}
                  y1={nodes.find((n) => n.id === connectionStart)?.position.y + 40 || 0}
                  x2={dragging ? 0 : 0}
                  y2={dragging ? 0 : 0}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute cursor-move p-3 rounded-md border-2 w-[150px] ${getNodeColor(
                  node.type,
                )} ${selectedNode === node.id ? "ring-2 ring-blue-500" : ""}`}
                style={{
                  left: node.position.x,
                  top: node.position.y,
                }}
                onClick={(e) => handleNodeClick(e, node.id)}
                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              >
                <div className="flex items-center mb-2">
                  <span className="ml-2">{node.icon}</span>
                  <span className="font-medium text-sm">{node.label}</span>
                </div>
                <div className="text-xs opacity-75">
                  {node.type === "trigger" && "بداية المسار"}
                  {node.type === "condition" && "تفريع المسار"}
                  {node.type === "action" &&
                    node.data?.actionType === "send_message" &&
                    `إرسال ${
                      node.data.messageType === "email"
                        ? "بريد"
                        : node.data.messageType === "sms"
                          ? "رسالة نصية"
                          : node.data.messageType === "push"
                            ? "إشعار"
                            : "رسالة"
                    }`}
                  {node.type === "delay" && `انتظار ${node.data?.delay || 1} أيام`}
                  {node.type === "endpoint" && "نهاية المسار"}
                </div>

                {/* Connection point */}
                {node.type !== "endpoint" && (
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-300 cursor-pointer hover:bg-gray-100"
                    onClick={() => startConnection(node.id)}
                  ></div>
                )}

                {/* Connection target point */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-300 cursor-pointer hover:bg-gray-100"
                  onClick={() => (isCreatingConnection ? completeConnection(node.id) : null)}
                ></div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Sidebar - Properties */}
        {showProperties && selectedNodeData && (
          <div className="w-72 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="p-3 border-b">
              <h3 className="font-medium">خصائص العنصر</h3>
            </div>

            <div className="p-3 space-y-4 overflow-y-auto">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">العنوان</label>
                <Input
                  value={selectedNodeData.label}
                  onChange={(e) => updateNodeLabel(selectedNodeData.id, e.target.value)}
                />
              </div>

              {selectedNodeData.type === "condition" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">الشرط</label>
                  <Input
                    value={selectedNodeData.data?.condition || ""}
                    placeholder="customer.profile_completed == true"
                  />
                  <p className="text-xs text-gray-500 mt-1">يمكنك استخدام متغيرات العميل والطلب في الشرط</p>
                </div>
              )}

              {selectedNodeData.type === "action" && selectedNodeData.data?.actionType === "send_message" && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">نوع الرسالة</label>
                    <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                      <option value="email" selected={selectedNodeData.data?.messageType === "email"}>
                        بريد إلكتروني
                      </option>
                      <option value="sms" selected={selectedNodeData.data?.messageType === "sms"}>
                        رسالة نصية
                      </option>
                      <option value="push" selected={selectedNodeData.data?.messageType === "push"}>
                        إشعار
                      </option>
                      <option value="imessage" selected={selectedNodeData.data?.messageType === "imessage"}>
                        iMessage
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">قالب الرسالة</label>
                    <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                      <option value="welcome">رسالة ترحيب</option>
                      <option value="reminder">رسالة تذكير</option>
                      <option value="thank_you">رسالة شكر</option>
                    </select>
                  </div>
                </>
              )}

              {selectedNodeData.type === "delay" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">مدة الانتظار (أيام)</label>
                  <div className="flex items-center gap-2">
                    <Slider
                      defaultValue={[selectedNodeData.data?.delay || 1]}
                      max={30}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-8 text-center">{selectedNodeData.data?.delay || 1}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Button variant="destructive" size="sm" className="w-full" onClick={deleteSelectedNode}>
                  <Trash2 size={16} className="ml-2" />
                  حذف العنصر
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
