# План миграции проекта Web-Viasta на стек Django + React

Данный документ описывает план и стратегию миграции текущего проекта на стек Django + React, включая структуру проекта, модели данных и процесс миграции.

## Содержание
1. [Преимущества перехода на Django + React](#преимущества-перехода-на-django--react)
2. [Архитектура проекта](#архитектура-проекта)
3. [Модели Django](#модели-django)
4. [API эндпоинты](#api-эндпоинты)
5. [Интеграция с React](#интеграция-с-react)
6. [Административная панель](#административная-панель)
7. [План миграции](#план-миграции)
8. [Рекомендуемые пакеты и зависимости](#рекомендуемые-пакеты-и-зависимости)
9. [Деплой и запуск](#деплой-и-запуск)

## Преимущества перехода на Django + React

1. **Надежная база данных** - PostgreSQL вместо хранения в памяти
2. **Административная панель** - Django Admin для управления контентом без разработки отдельного интерфейса
3. **Система аутентификации** - Встроенная система пользователей и разрешений
4. **ORM Django** - Мощная и гибкая система для работы с базой данных
5. **REST Framework** - Готовое решение для создания API
6. **Масштабируемость** - Легкое масштабирование проекта при росте
7. **Повышенная безопасность** - Встроенные механизмы защиты от CSRF, XSS и других атак
8. **SEO-оптимизация** - Серверный рендеринг для лучшей индексации

## Архитектура проекта

Будущая архитектура проекта:

```
web-viasta/
├── backend/                       # Django проект
│   ├── viasta/                    # Основной модуль проекта
│   │   ├── settings.py            # Настройки Django
│   │   ├── urls.py                # Основные URL маршруты
│   │   ├── wsgi.py                # WSGI конфигурация
│   ├── products/                  # Приложение для работы с кондиционерами
│   │   ├── models.py              # Модели продуктов
│   │   ├── views.py               # Представления/API
│   │   ├── serializers.py         # Сериализаторы для DRF
│   │   ├── admin.py               # Настройки админки для продуктов
│   ├── services/                  # Приложение для работы с услугами
│   ├── testimonials/              # Приложение для работы с отзывами
│   ├── faqs/                      # Приложение для FAQ
│   ├── contacts/                  # Приложение для обработки форм
│   ├── benefits/                  # Приложение для преимуществ
│   ├── manage.py                  # Скрипт управления Django
│   ├── requirements.txt           # Зависимости Python
├── frontend/                      # React приложение
│   ├── public/                    # Статические файлы
│   ├── src/
│   │   ├── components/            # React компоненты
│   │   ├── pages/                 # Страницы приложения
│   │   ├── hooks/                 # Пользовательские хуки
│   │   ├── api/                   # API клиент
│   │   ├── context/               # Контексты React
│   │   ├── utils/                 # Вспомогательные функции
│   ├── package.json               # Зависимости JavaScript
│   ├── vite.config.js             # Конфигурация Vite
├── .gitignore                     # Исключения Git
├── README.md                      # Документация проекта
```

## Модели Django

### Product (app: products)

```python
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    images = models.JSONField(default=list)  # Массив URL-ов изображений
    # Альтернативный вариант с ImageField:
    # image1 = models.ImageField(upload_to='products/', null=True, blank=True)
    # image2 = models.ImageField(upload_to='products/', null=True, blank=True)
    # ...
    area = models.CharField(max_length=100)  # Например, "до 20 м²"
    type = models.CharField(max_length=100)  # Например, "Сплит-система"
    brand = models.CharField(max_length=100)
    energy_efficiency = models.CharField(max_length=50)
    noise_level = models.CharField(max_length=50)
    features = models.JSONField(default=list)  # Массив особенностей
    dimensions = models.CharField(max_length=255)
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    warranty = models.CharField(max_length=255)
    installation_cost = models.DecimalField(max_digits=10, decimal_places=2)
    available_for_installation = models.BooleanField(default=True)
    in_stock = models.BooleanField(default=True)
    popularity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-popularity']
        verbose_name = 'Кондиционер'
        verbose_name_plural = 'Кондиционеры'
```

### Service (app: services)

```python
class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=100)  # Например, "2-3 часа"
    image = models.URLField(null=True, blank=True)
    # Альтернативный вариант:
    # image = models.ImageField(upload_to='services/', null=True, blank=True)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
```

### Testimonial (app: testimonials)

```python
class Testimonial(models.Model):
    client_name = models.CharField(max_length=255)
    photo = models.URLField(null=True, blank=True)
    # Альтернативный вариант:
    # photo = models.ImageField(upload_to='testimonials/', null=True, blank=True)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.TextField()
    date = models.DateField()
    service = models.CharField(max_length=255)
    verified = models.BooleanField(default=False)  # Проверен ли отзыв администратором

    def __str__(self):
        return f"Отзыв от {self.client_name}"

    class Meta:
        ordering = ['-date']
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
```

### FAQ (app: faqs)

```python
class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    category = models.CharField(max_length=100)
    order = models.IntegerField(default=0)  # Для сортировки

    def __str__(self):
        return self.question

    class Meta:
        ordering = ['order']
        verbose_name = 'Часто задаваемый вопрос'
        verbose_name_plural = 'Часто задаваемые вопросы'
```

### ContactForm (app: contacts)

```python
class ContactForm(models.Model):
    STATUS_CHOICES = (
        ('new', 'Новая'),
        ('processing', 'В обработке'),
        ('completed', 'Обработана'),
        ('canceled', 'Отменена'),
    )
    
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    message = models.TextField()
    contact_method = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(blank=True, null=True)  # Для администратора

    def __str__(self):
        return f"Заявка от {self.name} ({self.created_at.strftime('%d.%m.%Y')})"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Форма обратной связи'
        verbose_name_plural = 'Формы обратной связи'
```

### Benefit (app: benefits)

```python
class Benefit(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=100)
    order = models.IntegerField(default=0)  # Для сортировки

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']
        verbose_name = 'Преимущество'
        verbose_name_plural = 'Преимущества'
```

## API эндпоинты

Используя Django REST Framework, будут созданы следующие API эндпоинты:

### products app
- `GET /api/products/` - Список всех продуктов
- `GET /api/products/{id}/` - Детали конкретного продукта
- `GET /api/products/filter/` - Фильтрация продуктов по параметрам
- `POST /api/products/` - Создание нового продукта (только для администраторов)
- `PUT /api/products/{id}/` - Обновление продукта (только для администраторов)
- `DELETE /api/products/{id}/` - Удаление продукта (только для администраторов)

### services app
- `GET /api/services/` - Список всех услуг
- `GET /api/services/{id}/` - Детали конкретной услуги

### testimonials app
- `GET /api/testimonials/` - Список всех отзывов
- `POST /api/testimonials/` - Создание нового отзыва (для клиентов)

### faqs app
- `GET /api/faqs/` - Список всех FAQ
- `GET /api/faqs/category/{category}/` - FAQ по категории

### contacts app
- `POST /api/contact/` - Отправка формы обратной связи

### benefits app
- `GET /api/benefits/` - Список всех преимуществ

## Интеграция с React

### Структура React приложения

```
src/
├── components/
│   ├── ui/               # Переиспользуемые UI компоненты (кнопки, карточки и т.д.)
│   ├── layout/           # Компоненты макета (Header, Footer, Sidebar и т.д.)
│   ├── ProductCard.jsx   # Карточка продукта
│   ├── ProductFilter.jsx # Компонент фильтрации продуктов
│   ├── ...
├── pages/
│   ├── Home.jsx          # Главная страница
│   ├── ProductDetails.jsx # Страница детального просмотра продукта
│   ├── Catalog.jsx       # Каталог продуктов
│   ├── ...
├── api/
│   ├── client.js         # Базовый API клиент (axios или fetch)
│   ├── products.js       # API методы для работы с продуктами
│   ├── services.js       # API методы для работы с услугами
│   ├── ...
├── context/
│   ├── AuthContext.jsx   # Контекст аутентификации
│   ├── CartContext.jsx   # Контекст корзины
│   ├── ...
├── hooks/
│   ├── useProducts.js    # Хук для получения продуктов
│   ├── useProductFilter.js # Хук для фильтрации продуктов
│   ├── ...
├── utils/
│   ├── formatPrice.js    # Форматирование цены
│   ├── formatPhoneNumber.js # Форматирование телефона
│   ├── ...
├── App.jsx               # Основной компонент приложения
├── main.jsx              # Точка входа
```

### Примеры интеграции с API

```jsx
// api/client.js
import axios from 'axios';

const API_URL = '/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

// api/products.js
import apiClient from './client';

export const getProducts = async () => {
  const response = await apiClient.get('/products/');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}/`);
  return response.data;
};

export const filterProducts = async (filters) => {
  const response = await apiClient.get('/products/filter/', { params: filters });
  return response.data;
};

// hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductById, filterProducts } from '../api/products';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id
  });
};

export const useFilteredProducts = (filters) => {
  return useQuery({
    queryKey: ['products', 'filtered', filters],
    queryFn: () => filterProducts(filters),
    enabled: !!filters
  });
};
```

## Административная панель

Django Admin будет настроен для управления всеми сущностями. Пример настройки Django Admin для продуктов:

```python
# products/admin.py
from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'area', 'price', 'discount_price', 'in_stock')
    list_filter = ('brand', 'type', 'in_stock', 'available_for_installation')
    search_fields = ('name', 'description')
    ordering = ('-popularity', 'name')
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'description', 'price', 'discount_price')
        }),
        ('Характеристики', {
            'fields': ('area', 'type', 'brand', 'energy_efficiency', 
                       'noise_level', 'features', 'dimensions', 'weight')
        }),
        ('Доступность', {
            'fields': ('in_stock', 'available_for_installation', 'installation_cost')
        }),
        ('Дополнительно', {
            'fields': ('warranty', 'popularity', 'images')
        }),
    )
```

## План миграции

### Этап 1: Подготовка

1. Создать новый репозиторий для проекта Django + React
2. Настроить базовую структуру Django проекта
3. Настроить Django REST Framework
4. Создать необходимые Django приложения

### Этап 2: Модели и база данных

1. Определить модели Django на основе существующих моделей
2. Настроить миграции и создать базу данных
3. Создать начальные данные (fixtures) на основе текущих данных

### Этап 3: API

1. Создать сериализаторы для моделей
2. Реализовать API views и маршруты
3. Настроить аутентификацию и разрешения

### Этап 4: Административная панель

1. Настроить Django Admin для всех моделей
2. Создать пользовательские действия в админке
3. Настроить фильтры и поиск

### Этап 5: Перенос фронтенда

1. Создать базовую структуру React приложения
2. Перенести компоненты из текущего проекта
3. Адаптировать компоненты под новые API
4. Настроить роутинг

### Этап 6: Интеграция и тестирование

1. Настроить CORS и CSRF защиту
2. Интегрировать фронтенд и бэкенд
3. Провести тестирование

### Этап 7: Деплой

1. Настроить production-окружение
2. Настроить статические файлы
3. Настроить базу данных в production
4. Деплой приложения

## Рекомендуемые пакеты и зависимости

### Backend (requirements.txt)
```
Django==4.2.x
djangorestframework==3.14.x
django-cors-headers==4.0.x
Pillow==10.0.x
psycopg2-binary==2.9.x
dj-database-url==2.0.x
django-storages==1.13.x
python-dotenv==1.0.x
gunicorn==21.2.x
```

### Frontend (package.json)
```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.4.0",
    "class-variance-authority": "^0.6.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "framer-motion": "^10.12.18",
    "lucide-react": "^0.258.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.45.1",
    "react-icons": "^4.10.1",
    "react-router-dom": "^6.14.1",
    "recharts": "^2.7.2",
    "tailwind-merge": "^1.13.2",
    "tailwindcss": "^3.3.2",
    "zod": "^3.21.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.1",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "vite": "^4.4.0"
  }
}
```

## Деплой и запуск

### Локальный запуск

```bash
# Клонировать репозиторий
git clone <repository-url>
cd web-viasta

# Бэкенд
cd backend
python -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Создать администратора
python manage.py runserver

# Фронтенд (в отдельном терминале)
cd frontend
npm install
npm run dev
```

### Деплой на production

Рекомендуемые варианты деплоя:

1. **Heroku**
   - Простая настройка с помощью Procfile
   - Автоматический деплой из Git
   - Поддержка PostgreSQL

2. **DigitalOcean App Platform**
   - Простой интерфейс для деплоя
   - Встроенные базы данных

3. **AWS Elastic Beanstalk**
   - Масштабируемое решение
   - Высокая надежность

4. **Vercel + Django на отдельном хостинге**
   - Деплой фронтенда на Vercel
   - Деплой бэкенда на PythonAnywhere или аналогичный сервис