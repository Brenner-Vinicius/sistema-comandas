import { useState } from "react";
import { AlertCircle, Plus, Minus, Package2, Edit, PackagePlus } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { InventoryFormDialog } from "./InventoryFormDialog";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Queijo Mussarela",
    category: "Laticínios",
    quantity: 15,
    unit: "kg",
    lowStockThreshold: 10,
    lastUpdated: "há 2 horas",
  },
  {
    id: "2",
    name: "Molho de Tomate",
    category: "Molhos",
    quantity: 8,
    unit: "L",
    lowStockThreshold: 12,
    lastUpdated: "há 3 horas",
  },
  {
    id: "3",
    name: "Carne Moída",
    category: "Carnes",
    quantity: 25,
    unit: "kg",
    lowStockThreshold: 20,
    lastUpdated: "há 1 hora",
  },
  {
    id: "4",
    name: "Alface",
    category: "Hortifruti",
    quantity: 12,
    unit: "unidades",
    lowStockThreshold: 15,
    lastUpdated: "há 4 horas",
  },
  {
    id: "5",
    name: "Massa de Pizza",
    category: "Padaria",
    quantity: 30,
    unit: "porções",
    lowStockThreshold: 25,
    lastUpdated: "há 30 min",
  },
  {
    id: "6",
    name: "Peito de Frango",
    category: "Carnes",
    quantity: 18,
    unit: "kg",
    lowStockThreshold: 15,
    lastUpdated: "há 2 horas",
  },
  {
    id: "7",
    name: "Azeite de Oliva",
    category: "Óleos",
    quantity: 4,
    unit: "garrafas",
    lowStockThreshold: 6,
    lastUpdated: "há 5 horas",
  },
  {
    id: "8",
    name: "Alho",
    category: "Hortifruti",
    quantity: 3,
    unit: "kg",
    lowStockThreshold: 5,
    lastUpdated: "há 6 horas",
  },
];

export function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const isLowStock = (item: InventoryItem) => item.quantity <= item.lowStockThreshold;

  const lowStockCount = inventory.filter(isLowStock).length;

  const updateQuantity = (itemId: string, delta: number) => {
    setInventory(inventory.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(0, item.quantity + delta), lastUpdated: "Agora mesmo" }
        : item
    ));
  };

  const startEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValue(item.quantity.toString());
  };

  const saveEdit = (itemId: string) => {
    const newQuantity = parseInt(editValue);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setInventory(inventory.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, lastUpdated: "Agora mesmo" }
          : item
      ));
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleCreateItem = () => {
    setDialogMode("create");
    setEditingItem(undefined);
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setDialogMode("edit");
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSaveItem = (itemData: Partial<InventoryItem>) => {
    if (dialogMode === "create") {
      // Criar novo item
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        name: itemData.name!,
        category: itemData.category!,
        quantity: itemData.quantity!,
        unit: itemData.unit!,
        lowStockThreshold: itemData.lowStockThreshold!,
        lastUpdated: "Agora mesmo",
      };
      setInventory([...inventory, newItem]);
    } else {
      // Editar item existente
      setInventory(
        inventory.map((item) =>
          item.id === itemData.id
            ? { ...item, ...itemData }
            : item
        )
      );
    }
  };

  const handleDeleteItem = (itemId: string) => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;

    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o item "${item.name}" do estoque?`
    );

    if (confirmDelete) {
      setInventory(inventory.filter((i) => i.id !== itemId));
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="p-4 pb-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Controle de Estoque</h2>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">{inventory.length} itens</p>
          {lowStockCount > 0 && (
            <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {lowStockCount} estoque baixo
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {inventory.map((item) => {
          const lowStock = isLowStock(item);
          const isEditing = editingId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-sm border overflow-hidden ${
                lowStock ? "border-red-300" : "border-gray-200"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      {lowStock && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.lastUpdated}</span>
                    </div>
                  </div>
                  <Package2 className={`w-5 h-5 ${lowStock ? "text-red-600" : "text-gray-400"}`} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-24 h-9"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(item.id);
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <span className="text-sm text-gray-600">{item.unit}</span>
                        <div className="flex gap-1 ml-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => saveEdit(item.id)}
                            className="h-7 px-2"
                          >
                            Salvar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={cancelEdit}
                            className="h-7 px-2"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity === 0}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <button
                          onClick={() => startEdit(item)}
                          className="min-w-[80px] text-center py-1 px-3 rounded border border-gray-300 hover:border-gray-400 transition-colors"
                        >
                          <span className={`font-semibold ${lowStock ? "text-red-600" : "text-gray-900"}`}>
                            {item.quantity}
                          </span>
                          <span className="text-sm text-gray-600 ml-1">{item.unit}</span>
                        </button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {lowStock && (
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <p className="text-xs text-red-600">
                      Estoque baixo! Reabastecer quando abaixo de {item.lowStockThreshold} {item.unit}
                    </p>
                  </div>
                )}

                {/* Botão de Editar Item */}
                <div className={`mt-3 pt-3 ${lowStock ? 'border-t border-red-200' : 'border-t border-gray-200'}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                    onClick={() => handleEditItem(item)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Item
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCreateItem}
        className="mt-4"
      >
        <PackagePlus className="w-4 h-4 mr-1" />
        Adicionar Item
      </Button>

      <InventoryFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mode={dialogMode}
        editingItem={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}