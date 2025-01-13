"use client";
import React from "react";
import {
  Building2,
  ShoppingCart,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  PieChart,
  Users,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { subscribeEmail } from "@/api/subscribe";
import SimpleTooltip from "@/components/shared/SimpleTooltip";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Профессиональная платформа для Instagram-бизнеса
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Linker.kz помогает владельцам бизнеса автоматизировать прием
              заказов через Instagram, экономя время и увеличивая продажи
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                asChild
              >
                <Link href="#cta">
                  Подключить Linker
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <SimpleTooltip tooltip="В разработке" asChild>
                <Button size="lg" variant="outline">
                  Демо-версия
                </Button>
              </SimpleTooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Знакомые проблемы владельцев бизнеса в Instagram?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <Clock className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Потеря времени</h3>
              <p className="text-gray-600">
                4-6 часов ежедневно тратится на ручную обработку заявок через
                личные сообщения
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Упущенные клиенты</h3>
              <p className="text-gray-600">
                30-40% потенциальных клиентов уходят к конкурентам из-за долгого
                ответа
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <MessageSquare className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ошибки в заказах</h3>
              <p className="text-gray-600">
                Неполная информация и человеческий фактор приводят к ошибкам в
                заказах
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Решение от Linker.kz
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Создайте профессиональный сайт для приема заказов за 15 минут
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Каталог товаров и услуг
                  </h3>
                  <p className="text-gray-600">
                    Удобный конструктор для создания и управления вашим
                    ассортиментом
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Форма заказа</h3>
                  <p className="text-gray-600">
                    Настраиваемые поля для сбора всей необходимой информации от
                    клиентов
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <PieChart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Аналитика продаж</h3>
                  <p className="text-gray-600">
                    Детальная статистика по заказам и клиентам
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="font-semibold mb-4">Преимущества платформы:</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Быстрый запуск без технических знаний</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Встроенная система онлайн-оплаты</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Уведомления о заказах в WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Автоматический сбор контактов клиентов</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Интеграция с популярными способами оплаты</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                60%+
              </div>
              <p className="text-gray-600">
                малых бизнесов в Казахстане ведут продажи через Instagram
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                4-6ч
              </div>
              <p className="text-gray-600">
                экономия времени ежедневно на обработке заказов
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">40%</div>
              <p className="text-gray-600">
                рост продаж после внедрения автоматизации
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-16" id="cta">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Готовы автоматизировать свой бизнес?
            </h2>
            <p className="mb-8 text-purple-100 text-center">
              Узнайте первыми о запуске Linker.kz и получите специальные условия
              для первых клиентов
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const email = formData.get("email") as string;

                try {
                  await subscribeEmail(formData);
                } catch (error) {
                  toast.error("Непредвиденная ошибка", {
                    description:
                      "Пожалуйста свяжитесь с нами по адресу lukivan888@gmail.com",
                  });
                  return;
                }

                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  toast.error("Ошибка", {
                    description: "Пожалуйста, введите корректный email",
                  });
                  return;
                }

                toast.custom(
                  () => (
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-4 text-white">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-full p-2">
                          <Send className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">
                            Спасибо за подписку! ✨
                          </p>
                          <p className="text-purple-100 text-sm">
                            Мы сообщим когда запустим Linker.kz
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  { duration: 5000 }
                );

                (e.target as HTMLFormElement).reset();
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="flex-1 bg-white text-gray-900"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <Send className="w-4 h-4 mr-2" />
                Подписаться
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold text-white">Linker.kz</div>
              <p className="text-sm">
                Профессиональная платформа для Instagram-бизнеса
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">
                О нас
              </a>
              <a href="#" className="hover:text-white">
                Блог
              </a>
              <a href="#" className="hover:text-white">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
