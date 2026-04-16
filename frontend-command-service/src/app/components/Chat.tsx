import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Send, Phone, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Message {
  id: string;
  sender: "manager" | "customer";
  text: string;
  time: string;
}

interface ChatData {
  orderId: string;
  orderNumber: string;
  customerName: string;
  tableNumber: string;
  messages: Message[];
}

const mockChats: Record<string, ChatData> = {
  "1": {
    orderId: "1",
    orderNumber: "#1247",
    customerName: "Brenner",
    tableNumber: "12",
    messages: [
      {
        id: "1",
        sender: "customer",
        text: "Olá, meu pedido já está pronto?",
        time: "14:25",
      },
      {
        id: "2",
        sender: "manager",
        text: "Olá Brenner! Seu pedido está sendo preparado, faltam cerca de 10 minutos.",
        time: "14:26",
      },
      {
        id: "3",
        sender: "customer",
        text: "Perfeito, obrigado!",
        time: "14:27",
      },
    ],
  },
  "2": {
    orderId: "2",
    orderNumber: "#1246",
    customerName: "Matheus",
    tableNumber: "8",
    messages: [
      {
        id: "1",
        sender: "customer",
        text: "Pode adicionar maionese extra no hambúrguer?",
        time: "14:10",
      },
      {
        id: "2",
        sender: "manager",
        text: "Claro! Já adicionamos maionese extra no seu pedido.",
        time: "14:11",
      },
    ],
  },
  "3": {
    orderId: "3",
    orderNumber: "#1245",
    customerName: "Lucas",
    tableNumber: "5",
    messages: [
      {
        id: "1",
        sender: "customer",
        text: "Seu pedido está pronto! Pode retirar no balcão.",
        time: "13:58",
      },
    ],
  },
};

export function Chat() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [newMessage, setNewMessage] = useState("");

  const chatData = orderId ? mockChats[orderId] : null;
  const [messages, setMessages] = useState<Message[]>(chatData?.messages || []);

  if (!chatData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
        <MessageCircle className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-600">Conversa não encontrada</p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Voltar aos Pedidos
        </Button>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

    const message: Message = {
      id: Date.now().toString(),
      sender: "manager",
      text: newMessage,
      time: timeStr,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="h-9 w-9"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">{chatData.customerName}</h1>
            <p className="text-sm text-gray-600">
              {chatData.orderNumber} • Mesa {chatData.tableNumber}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Phone className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "manager" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                message.sender === "manager"
                  ? "bg-orange-600 text-white"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "manager" ? "text-orange-100" : "text-gray-500"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Digite uma mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 h-10 w-10 p-0"
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
