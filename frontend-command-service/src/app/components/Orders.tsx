import { useState } from "react";
import { useNavigate } from "react-router";
import { Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, MessageCircle, Plus, Edit } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { OrderFormDialog } from "./OrderFormDialog";

type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  time: string;
  tableNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#1247",
    customerName: "Brenner",
    tableNumber: "12",
    items: [
      { id: "1", name: "Pizza Margherita", quantity: 2, price: 14.99 },
      { id: "2", name: "Salada Caesar", quantity: 1, price: 8.99 },
      { id: "3", name: "Chá Gelado", quantity: 2, price: 3.99 },
    ],
    status: "pending",
    total: 46.95,
    time: "2:30 PM",
  },
  {
    id: "2",
    orderNumber: "#1246",
    customerName: "Matheus",
    tableNumber: "8",
    items: [
      { id: "1", name: "Hambúrguer de Carne", quantity: 1, price: 12.99 },
      { id: "2", name: "Batata Frita", quantity: 1, price: 4.99 },
      { id: "3", name: "Coca-Cola", quantity: 1, price: 2.99 },
    ],
    status: "preparing",
    total: 20.97,
    time: "2:15 PM",
  },
  {
    id: "3",
    orderNumber: "#1245",
    customerName: "Lucas",
    tableNumber: "5",
    items: [
      { id: "1", name: "Macarrão com Frango", quantity: 1, price: 16.99 },
      { id: "2", name: "Pão de Alho", quantity: 1, price: 5.99 },
      { id: "3", name: "Vinho Tinto", quantity: 1, price: 8.99 },
    ],
    status: "ready",
    total: 31.97,
    time: "2:00 PM",
  },
  {
    id: "4",
    orderNumber: "#1244",
    customerName: "João",
    tableNumber: "3",
    items: [
      { id: "1", name: "Salmão Grelhado", quantity: 1, price: 22.99 },
      { id: "2", name: "Legumes no Vapor", quantity: 1, price: 6.99 },
    ],
    status: "completed",
    total: 29.98,
    time: "1:45 PM",
  },
];

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  preparing: { label: "Preparando", color: "bg-blue-100 text-blue-800", icon: Clock },
  ready: { label: "Pronto", color: "bg-green-100 text-green-800", icon: CheckCircle },
  completed: { label: "Concluído", color: "bg-gray-100 text-gray-800", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
};

export function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleCreateOrder = () => {
    setDialogMode("create");
    setEditingOrder(undefined);
    setIsDialogOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setDialogMode("edit");
    setEditingOrder(order);
    setIsDialogOpen(true);
  };

  const handleSaveOrder = (orderData: Partial<Order>) => {
    if (dialogMode === "create") {
      // Criar novo pedido
      const newOrder: Order = {
        id: Date.now().toString(),
        orderNumber: `#${1248 + orders.length}`,
        customerName: orderData.customerName!,
        tableNumber: orderData.tableNumber,
        items: orderData.items!,
        status: "pending",
        total: orderData.total!,
        time: orderData.time!,
      };
      setOrders([newOrder, ...orders]);
    } else {
      // Editar pedido existente
      setOrders(
        orders.map((order) =>
          order.id === orderData.id
            ? { ...order, ...orderData }
            : order
        )
      );
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o pedido ${order.orderNumber} de ${order.customerName}?`
    );

    if (confirmDelete) {
      setOrders(orders.filter((o) => o.id !== orderId));
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="p-4 pb-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Pedidos dos Clientes</h2>
        <p className="text-sm text-gray-600">{orders.length} pedidos ativos</p>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          const isExpanded = expandedOrder === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Order Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => toggleOrderExpand(order.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{order.orderNumber}</span>
                      {order.tableNumber && (
                        <span className="text-sm text-gray-600">• Mesa {order.tableNumber}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${config.color} flex items-center gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </Badge>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{order.time}</span>
                  <span className="font-semibold text-gray-900">R$ {order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order Details (Expandable) */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Itens do Pedido</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <div className="flex-1">
                            <span className="text-gray-900">
                              {item.quantity}x {item.name}
                            </span>
                            {item.notes && (
                              <p className="text-xs text-gray-600 mt-0.5">{item.notes}</p>
                            )}
                          </div>
                          <span className="text-gray-600 ml-2">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 min-w-[80px]">Atualizar Status:</span>
                    <Select
                      value={order.status}
                      onValueChange={(value: OrderStatus) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="flex-1 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="preparing">Preparando</SelectItem>
                        <SelectItem value="ready">Pronto</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Botão de Chat */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/chat/${order.id}`);
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Conversar com {order.customerName}
                    </Button>
                  </div>

                  {/* Botão de Editar */}
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditOrder(order);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Pedido
                    </Button>
                  </div>

                  {/* Botão de Excluir */}
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOrder(order.id);
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Excluir Pedido
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botão para Adicionar Novo Pedido */}
      <div className="mt-4">
        <OrderFormDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveOrder}
          onDelete={handleDeleteOrder}
          editingOrder={editingOrder}
          mode={dialogMode}
        />
        <Button
          variant="outline"
          className="w-full"
          onClick={handleCreateOrder}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Novo Pedido
        </Button>
      </div>
    </div>
  );
}