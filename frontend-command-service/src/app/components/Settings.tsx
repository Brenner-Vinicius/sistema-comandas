import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Bell,
  Globe,
  Clock,
  DollarSign,
  LogOut,
  ChevronRight,
  Store,
  Shield,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface SettingItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  value?: string;
  badge?: string;
}

const settingsData: SettingItem[] = [
  {
    id: "profile",
    icon: User,
    title: "Perfil do Gerente",
    description: "Nome, email e informações da conta",
    value: localStorage.getItem("userEmail") || "gerente@restaurante.com",
  },
  {
    id: "restaurant",
    icon: Store,
    title: "Informações do Restaurante",
    description: "Nome, endereço e horário de funcionamento",
    value: "Restaurante Sabor & Arte",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notificações",
    description: "Alertas de pedidos e estoque baixo",
    badge: "Ativo",
  },
  {
    id: "language",
    icon: Globe,
    title: "Idioma e Região",
    description: "Português (Brasil)",
    value: "PT-BR",
  },
  {
    id: "timezone",
    icon: Clock,
    title: "Fuso Horário",
    description: "Configurar fuso horário do restaurante",
    value: "GMT-3 (Brasília)",
  },
  {
    id: "currency",
    icon: DollarSign,
    title: "Moeda",
    description: "Configuração de preços e pagamentos",
    value: "Real (R$)",
  },
  {
    id: "security",
    icon: Shield,
    title: "Segurança",
    description: "Senha e autenticação",
  },
];

export function Settings() {
  const navigate = useNavigate();
  const [userEmail] = useState(localStorage.getItem("userEmail") || "gerente@restaurante.com");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="pb-20">
      {/* Header com informações do usuário */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Configurações</h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="font-semibold">Gerente</p>
              <p className="text-sm text-orange-100">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Configurações */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Seção: Conta */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
            Conta
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
            {settingsData.slice(0, 2).map((item) => (
              <button
                key={item.id}
                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                onClick={() => {}}
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.value || item.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Seção: Preferências */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
            Preferências
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
            {settingsData.slice(2, 6).map((item) => (
              <button
                key={item.id}
                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                onClick={() => {}}
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    {item.badge && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {item.value || item.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Seção: Segurança */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
            Segurança
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {settingsData.slice(6).map((item) => (
              <button
                key={item.id}
                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                onClick={() => {}}
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Botão de Logout */}
        <div className="pt-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair da Conta
          </Button>
        </div>

        {/* Versão */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">Versão 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
