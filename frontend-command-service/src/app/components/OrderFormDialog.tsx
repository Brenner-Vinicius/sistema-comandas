import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

interface OrderFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Partial<Order>) => void;
  onDelete?: (orderId: string) => void;
  editingOrder?: Order;
  mode: "create" | "edit";
}

// Menu de itens disponíveis
const menuItems = [
  { name: "Pizza Margherita", price: 14.99 },
  { name: "Pizza Calabresa", price: 16.99 },
  { name: "Hambúrguer de Carne", price: 12.99 },
  { name: "Hambúrguer de Frango", price: 11.99 },
  { name: "Salada Caesar", price: 8.99 },
  { name: "Salada Grega", price: 9.99 },
  { name: "Macarrão com Frango", price: 16.99 },
  { name: "Macarrão Carbonara", price: 18.99 },
  { name: "Salmão Grelhado", price: 22.99 },
  { name: "Filé Mignon", price: 28.99 },
  { name: "Batata Frita", price: 4.99 },
  { name: "Pão de Alho", price: 5.99 },
  { name: "Legumes no Vapor", price: 6.99 },
  { name: "Coca-Cola", price: 2.99 },
  { name: "Chá Gelado", price: 3.99 },
  { name: "Vinho Tinto", price: 8.99 },
  { name: "Suco Natural", price: 4.99 },
];

export function OrderFormDialog({ isOpen, onClose, onSave, onDelete, editingOrder, mode }: OrderFormDialogProps) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState("");

  useEffect(() => {
    if (mode === "edit" && editingOrder) {
      setCustomerName(editingOrder.customerName);
      setTableNumber(editingOrder.tableNumber || "");
      setItems(editingOrder.items);
    } else {
      // Resetar formulário para novo pedido
      setCustomerName("");
      setTableNumber("");
      setItems([]);
    }
  }, [mode, editingOrder, isOpen]);

  const handleAddItem = () => {
    if (!selectedMenuItem) return;

    const menuItem = menuItems.find((item) => item.name === selectedMenuItem);
    if (!menuItem) return;

    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: menuItem.name,
      quantity: itemQuantity,
      price: menuItem.price,
      notes: itemNotes || undefined,
    };

    setItems([...items, newItem]);
    setSelectedMenuItem("");
    setItemQuantity(1);
    setItemNotes("");
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || items.length === 0) {
      alert("Por favor, preencha o nome do cliente e adicione pelo menos um item.");
      return;
    }

    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

    const orderData: Partial<Order> = {
      customerName: customerName.trim(),
      tableNumber: tableNumber.trim() || undefined,
      items,
      total: calculateTotal(),
      time: timeStr,
      status: mode === "create" ? "pending" : editingOrder?.status,
    };

    if (mode === "edit" && editingOrder) {
      orderData.id = editingOrder.id;
      orderData.orderNumber = editingOrder.orderNumber;
    }

    onSave(orderData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Novo Pedido" : "Editar Pedido"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Informações do Cliente */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Informações do Cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Cliente *
                </label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Ex: João Silva"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Número da Mesa
                </label>
                <Input
                  id="tableNumber"
                  type="text"
                  placeholder="Ex: 12"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Adicionar Itens */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Adicionar Itens</h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label htmlFor="menuItem" className="block text-sm font-medium text-gray-700 mb-1">
                  Selecione o Item
                </label>
                <select
                  id="menuItem"
                  className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={selectedMenuItem}
                  onChange={(e) => setSelectedMenuItem(e.target.value)}
                >
                  <option value="">Escolha um item...</option>
                  {menuItems.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} - R$ {item.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Observações (opcional)
                  </label>
                  <Input
                    id="notes"
                    type="text"
                    placeholder="Ex: Sem cebola"
                    value={itemNotes}
                    onChange={(e) => setItemNotes(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={handleAddItem}
                disabled={!selectedMenuItem}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Item
              </Button>
            </div>
          </div>

          {/* Lista de Itens Adicionados */}
          {items.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Itens do Pedido</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.quantity}x {item.name}
                      </p>
                      {item.notes && (
                        <p className="text-sm text-gray-600 mt-1">Obs: {item.notes}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        R$ {item.price.toFixed(2)} cada
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-semibold text-gray-900">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-orange-600">
                  R$ {calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {mode === "edit" && editingOrder && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete(editingOrder.id)}
            >
              Excluir Pedido
            </Button>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-orange-600 hover:bg-orange-700"
            disabled={!customerName.trim() || items.length === 0}
          >
            {mode === "create" ? "Criar Pedido" : "Salvar Alterações"}
          </Button>
        </div>
      </div>
    </div>
  );
}