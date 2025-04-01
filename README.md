# Web-Viasta: Сайт по продаже кондиционеров

Современный сайт по продаже кондиционеров с акцентом на доступные решения и отличное соотношение цена-качество. Проект представляет собой полностью переработанную версию существующего сайта viastaklimat.ru с улучшенным дизайном и пользовательским опытом.

![Viasta Air Conditioning](generated-icon.png)

## Описание проекта

Web-Viasta — это интернет-магазин кондиционеров, предлагающий:

- Каталог кондиционеров с детальными карточками товаров
- Расширенные фильтры для поиска по площади помещения, типу, бренду и ценовому диапазону
- Сравнение характеристик различных моделей
- Раздел услуг по установке и обслуживанию
- Страницу с отзывами клиентов
- Часто задаваемые вопросы (FAQ)
- Форму для консультации и заказа обратного звонка

Сайт разработан с фокусом на бюджетные решения и помогает клиентам найти подходящий кондиционер по оптимальной цене.

## Стек технологий

### Frontend
- **React** — основная библиотека для построения пользовательского интерфейса
- **TypeScript** — типизированный JavaScript для более надежного кода
- **Tailwind CSS** — утилитарный CSS-фреймворк для стилизации
- **Shadcn/ui** — библиотека UI-компонентов на основе Radix UI
- **React Query (TanStack Query)** — инструмент для управления серверным состоянием
- **React Hook Form** — управление формами с валидацией
- **Zod** — библиотека для валидации данных
- **Wouter** — легковесная библиотека для маршрутизации
- **Recharts** — библиотека для создания диаграмм и графиков
- **Lucide React** — библиотека иконок

### Backend
- **Node.js** — серверная среда выполнения JavaScript
- **Express** — веб-фреймворк для создания API
- **Drizzle ORM** — ORM для работы с базой данных
- **In-Memory Storage** — для хранения данных в памяти (без необходимости настройки базы данных)

### Инструменты разработки
- **Vite** — быстрый инструмент сборки для современных веб-приложений
- **ESBuild** — сверхбыстрый JavaScript/TypeScript бандлер
- **PostCSS** — инструмент для преобразования CSS с помощью JavaScript
- **TSX** — интерпретатор TypeScript

## Как запустить проект локально

### Предварительные требования
- Node.js 18.x или выше
- npm или yarn

### Шаги для запуска

1. **Клонировать репозиторий**
   ```bash
   git clone https://github.com/RaevArtem/web-viasta.git
   cd web-viasta
   ```

2. **Установить зависимости**
   ```bash
   npm install
   ```

3. **Запустить проект в режиме разработки**
   ```bash
   npm run dev
   ```

4. **Открыть в браузере**
   
   Приложение будет доступно по адресу: `http://localhost:5000`

## Структура проекта

```
web-viasta/
├── client/               # Frontend часть приложения
│   ├── src/
│   │   ├── components/   # UI-компоненты
│   │   ├── hooks/        # Пользовательские хуки
│   │   ├── lib/          # Вспомогательные функции
│   │   ├── pages/        # Страницы приложения
│   │   ├── App.tsx       # Главный компонент приложения
│   │   ├── main.tsx      # Точка входа React приложения
├── server/               # Backend часть приложения
│   ├── index.ts          # Входная точка сервера
│   ├── routes.ts         # API маршруты
│   ├── storage.ts        # Логика хранения данных
├── shared/               # Общий код для frontend и backend
│   ├── schema.ts         # Схемы данных
```

## Функциональные возможности

- **Просмотр каталога кондиционеров**: Фильтрация по площади, типу, бренду и цене
- **Детальная информация о товаре**: Технические характеристики, фотографии, цены
- **Сравнение моделей**: Сравнение нескольких кондиционеров в удобной таблице
- **Заявка на консультацию**: Форма обратной связи для получения консультации специалиста
- **Информация об услугах**: Описание услуг по установке и обслуживанию кондиционеров
- **Отзывы клиентов**: Реальные отзывы о работе компании
- **FAQ**: Ответы на часто задаваемые вопросы