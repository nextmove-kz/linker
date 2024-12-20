"use client";
import React, { useState, useEffect } from "react";
import { MessageSquare, Clock, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { subscribeEmail } from "@/api/subscribe";

interface Business {
  type: string;
  item: string;
}

const businesses: Business[] = [
  { type: "кондитер", item: "торт" },
  { type: "флорист", item: "букет" },
  { type: "фотограф", item: "фотосессию" },
  { type: "визажист", item: "макияж" },
  { type: "клининг", item: "уборку" },
  { type: "тату-мастер", item: "эскиз" },
  { type: "репетитор", item: "занятие" },
  { type: "художник", item: "портрет" },
];

const errorMessages: string[] = [
  "Долгий ответ на заказ",
  "Неправильно обработанный заказ",
  "Клиент ушел к конкуренту с Linker",
  "Упущенная продажа из-за переписки",
];

const TIME_PER_MESSAGE = 3;

const ComingSoonPage: React.FC = () => {
  const [messageCount, setMessageCount] = useState<number>(0);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [currentBusinessIndex, setCurrentBusinessIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const interval = setInterval(() => {
      if (messageCount < 15) {
        if (messageCount >= 12 && messageCount <= 14 && Math.random() < 0.2) {
          const errorMessage =
            errorMessages[Math.floor(Math.random() * errorMessages.length)];
          toast({
            title: `❌ Ошибка ${businesses[currentBusinessIndex].type}а`,
            description: errorMessage,
          });
        }

        setMessageCount((prev) => prev + 1);
        setTotalMessages((prev) => prev + 1);
      } else {
        setShowMessage(false);
        clearInterval(interval);

        timeoutId = setTimeout(() => {
          setMessageCount(0);
          setShowMessage(true);
          setCurrentBusinessIndex((prev) => (prev + 1) % businesses.length);
        }, 2000);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [messageCount, currentBusinessIndex, toast]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const result = await subscribeEmail(formData);

    toast({
      title: result.success ? "✨ Спасибо!" : "❌ Ошибка",
      description: result.success
        ? "Мы сообщим вам о запуске Linker.kz"
        : result.error,
    });

    if (result.success) {
      setEmail("");
    }
  };

  const formatTimeWasted = (totalMessages: number): string => {
    const totalMinutes = totalMessages * TIME_PER_MESSAGE;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    }
    return `${minutes}м`;
  };

  const currentBusiness = businesses[currentBusinessIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-4xl font-bold text-center text-blue-600">
          Linker.kz
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
          <div className="flex items-center space-x-4 text-gray-600">
            <Clock className="w-6 h-6" />
            <div className="text-lg">
              Сейчас {currentBusiness.type} получает заказ на{" "}
              {currentBusiness.item}...
            </div>
          </div>

          {showMessage && messageCount > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: messageCount }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg p-2 text-sm animate-fade-in"
                >
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-1 text-muted-foreground">
              Нет сообщений! Занимается улучшением продукта!
            </div>
          )}

          <div className="text-center space-y-2">
            <div className="text-sm text-emerald-700">
              Было бы сохранено с Linker: {formatTimeWasted(totalMessages)}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="text-xl font-semibold text-center text-gray-800">
              Скоро с нами будет проще ❤️
            </div>
            <div className="mt-2 text-center text-gray-600">
              Мы создаем платформу, где клиенты сразу заполнят все детали заказа
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="font-medium">Быстрее</div>
            <div className="text-sm text-gray-600">
              Приступайте сразу к заказу
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="font-medium">Выгоднее</div>
            <div className="text-sm text-gray-600">
              Не платите за переписку и потерянных клиентов
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="font-medium">Точнее</div>
            <div className="text-sm text-gray-600">
              Все детали сразу без ошибок
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="text-center text-lg font-medium mb-4">
              Узнайте первыми о запуске Linker.kz
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                name="email"
              />
              <Button type="submit" className="w-full sm:w-auto" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Подписаться
              </Button>
            </div>
          </form>
        </div>

        {/* Можно будет добавить просто какой нибудь документ или презентацию о проекте */}
        {/* <div className="text-center">
          <Button
            variant="outline"
            onClick={() => window.open("https://docs.google.com", "_blank")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Подробнее о проекте
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ComingSoonPage;
