import { useState, useEffect } from "react";
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
import { api } from "../../services/api";

type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

const statusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  preparing: { label: "Preparando", color: "bg-blue-100 text-blue-800", icon: Clock },
  ready: { label: "Pronto", color: "bg-green-100 text-green-800", icon: CheckCircle },
  completed: { label: "Concluído", color: "bg-gray-100 text-gray-800", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
};

export function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any>(undefined);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const fetchOrders = async () => {
    try {
      const response = await api.get("/pedidos");
      setOrders(response.data);
    } catch (err) {
      console.error("Erro ao carregar pedidos");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await api.put(`/pedidos/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      alert("Erro ao atualizar status.");
    }
  };

  const handleSaveOrder = async (orderData: any) => {
    try {
      if (dialogMode === "create") {
        const payload = {
          customerName: orderData.customerName,
          tableNumber: orderData.tableNumber,
          status: "pending",
          total: orderData.total,
          time: orderData.time,
          itens: orderData.items?.map((item: any) => ({
            nome: item.name,
            quantidade: item.quantity,
            precoUnitario: item.price
          }))
        };
        await api.post("/pedidos", payload);
      } else {
        await api.put(`/pedidos/${orderData.id}`, orderData);
      }
      fetchOrders();
      setIsDialogOpen(false);
    } catch (err: any) {
      alert("Erro ao salvar no MongoDB. Verifique o console.");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm("Deseja excluir este pedido?")) {
      try {
        await api.delete(`/pedidos/${orderId}`);
        fetchOrders();
      } catch (err) {
        alert("Erro ao excluir.");
      }
    }
  };

  return (
    <div className="p-4 pb-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Painel de Comandas</h2>
        <p className="text-sm text-gray-600">{orders.length} pedidos ativos</p>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const orderId = order._id || order.id;
          const config = statusConfig[(order.status as OrderStatus) || "pending"];
          const StatusIcon = config.icon;
          const isExpanded = expandedOrder === orderId;

          return (
            <div key={orderId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 cursor-pointer" onClick={() => setExpandedOrder(isExpanded ? null : orderId)}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{order.customerName || "Sem Nome"}</p>
                    <p className="text-sm text-gray-500">Mesa: {order.tableNumber || "N/A"}</p>
                  </div>
                  <Badge className={config.color}><StatusIcon className="w-3 h-3 mr-1" /> {config.label}</Badge>
                </div>
                <div className="mt-2 flex justify-between text-sm font-medium">
                  <span>{order.time}</span>
                  <span className="text-orange-600">R$ {order.total?.toFixed(2)}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">Ações</p>
                      <Select value={order.status} onValueChange={(val: OrderStatus) => handleStatusChange(orderId, val)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="preparing">Preparando</SelectItem>
                          <SelectItem value="ready">Pronto</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => navigate(`/chat/${orderId}`)}>Chat</Button>
                      <Button variant="outline" className="flex-1 text-red-600 border-red-200" onClick={() => handleDeleteOrder(orderId)}>Excluir</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <OrderFormDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={handleSaveOrder} mode={dialogMode} />
        <Button className="w-full bg-orange-600 h-12 text-white font-bold" onClick={() => { setDialogMode("create"); setIsDialogOpen(true); }}>
          <Plus className="w-5 h-5 mr-2" /> Novo Pedido
        </Button>
      </div>
    </div>
  );
}