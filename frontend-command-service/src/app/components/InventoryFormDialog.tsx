import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  lastUpdated: string;
}

interface InventoryFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<InventoryItem>) => void;
  onDelete?: (itemId: string) => void;
  editingItem?: InventoryItem;
  mode: "create" | "edit";
}

// Categorias disponíveis
const categories = [
  "Laticínios",
  "Carnes",
  "Hortifruti",
  "Molhos",
  "Óleos",
  "Padaria",
  "Bebidas",
  "Temperos",
  "Massas",
  "Congelados",
  "Outros",
];

// Unidades de medida disponíveis
const units = [
  "kg",
  "g",
  "L",
  "mL",
  "unidades",
  "porções",
  "pacotes",
  "caixas",
  "garrafas",
  "latas",
];

export function InventoryFormDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingItem,
  mode,
}: InventoryFormDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [lowStockThreshold, setLowStockThreshold] = useState("");

  useEffect(() => {
    if (mode === "edit" && editingItem) {
      setName(editingItem.name);
      setCategory(editingItem.category);
      setQuantity(editingItem.quantity.toString());
      setUnit(editingItem.unit);
      setLowStockThreshold(editingItem.lowStockThreshold.toString());
    } else {
      // Resetar formulário para novo item
      setName("");
      setCategory("");
      setQuantity("");
      setUnit("kg");
      setLowStockThreshold("");
    }
  }, [mode, editingItem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quantityNum = parseFloat(quantity);
    const thresholdNum = parseFloat(lowStockThreshold);

    if (!name.trim() || !category.trim() || isNaN(quantityNum) || isNaN(thresholdNum)) {
      alert("Por favor, preencha todos os campos obrigatórios com valores válidos.");
      return;
    }

    if (quantityNum < 0 || thresholdNum < 0) {
      alert("Quantidade e limite de estoque baixo devem ser valores positivos.");
      return;
    }

    const itemData: Partial<InventoryItem> = {
      name: name.trim(),
      category: category.trim(),
      quantity: quantityNum,
      unit: unit,
      lowStockThreshold: thresholdNum,
      lastUpdated: "Agora mesmo",
    };

    if (mode === "edit" && editingItem) {
      itemData.id = editingItem.id;
    }

    onSave(itemData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Novo Item de Estoque" : "Editar Item de Estoque"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Nome do Item */}
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Item *
            </label>
            <Input
              id="itemName"
              type="text"
              placeholder="Ex: Queijo Mussarela"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
            <select
              id="category"
              className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Selecione uma categoria...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Quantidade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade *
              </label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                Unidade *
              </label>
              <select
                id="unit"
                className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Limite de Estoque Baixo */}
          <div>
            <label htmlFor="threshold" className="block text-sm font-medium text-gray-700 mb-1">
              Limite de Estoque Baixo *
            </label>
            <Input
              id="threshold"
              type="number"
              step="0.01"
              min="0"
              placeholder="0"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Você será alertado quando o estoque estiver abaixo deste valor
            </p>
          </div>

          {/* Informação de Exemplo */}
          {quantity && lowStockThreshold && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Pré-visualização:</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {name || "Item"} • {quantity} {unit}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Alerta de estoque baixo: {lowStockThreshold} {unit}
              </p>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {mode === "edit" && editingItem && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => onDelete(editingItem.id)}
            >
              Excluir Item
            </Button>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-orange-600 hover:bg-orange-700"
            disabled={!name.trim() || !category.trim() || !quantity || !lowStockThreshold}
          >
            {mode === "create" ? "Adicionar Item" : "Salvar Alterações"}
          </Button>
        </div>
      </div>
    </div>
  );
}