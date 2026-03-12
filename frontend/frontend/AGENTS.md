# AGENTS.md

## Общая информация

## frontend 
### Структура проекта
    frontend/
    │── src/
    │   ├── main.tsx                                            # Точка входа приложения
    │   ├── App.tsx                                             # Корневой компонент
    │   ├── routes/                                             # Маршрутизация
    │   ├── pages/                                              # Страницы
    │   │    ├── {pageName}/                                    # Папка страницы
    │   │    │      ├── components/                             # Компоненты страницы
    │   │    │      ├── {pageName}.tsx                          # Страница
    │   │    │      ├── {pageName}.module.css                   # Стили страницы
    │   ├── components/                                         # Переиспользуемые компоненты
    │   ├── layouts/                                            # Layout компоненты
    │   ├── hooks/                                              # Custom React hooks
    │   ├── services/                                           # API сервисы и бизнес-логика
    │   ├── types/                                              # TypeScript типы
    │   ├── assets/                                             # Статические ресурсы
    │   ├── theme.css                                           # CSS переменные (тема)
    │   ├── globalStyles.css                                    # Глобальные стили
    │── package.json                                            # Зависимости
    │── vite.config.ts                                          # Конфигурация Vite
    │── tsconfig.json                                           # Конфигурация TypeScript


## Основные принципы

1. **Следуй структуре проекта**
   - Все компоненты в `src/components/`
   - Все страницы в `src/pages/`
   - Все стили страниц в `src/pages/{pageName}/{pageName}.module.css`
   - Все компоненты страницы в `src/pages/{pageName}/components/`
   - Глобальные стили в `src/globalStyles.css`
   - Темы и переменные стилей в `src/theme.css`
   - Все типы в `src/types/`
   - Все сервисы и бизнес логика в `src/services/`
   - Все хуки в `src/hooks/`
   - Все макеты в `src/layouts/`
   - Все ассеты в `src/assets/`
   - Роутинг (React-router, react-router-dom)


2. **Следуй код-стайлу**
   - Используй TypeScript
   - Следуй правилам ESLint
   - Используй Prettier для форматирования

3. **Следуй архитектуре**
   - Используй React Hooks
   - Следуй принципам SOLID
   - Используй паттерн MVC

4. **Следуй безопасности**
   - Не храните API-ключи в коде
   - Используйте HTTPS
   - Валидируйте все входные данные

5. **Следуй производительности**
   - Используй React.memo для компонентов
   - Используй useMemo и useCallback
   - Оптимизируйте рендеринг

6. **Следуй тестированию**
   - Пиши тесты для всех компонентов
   - Используй Jest для unit-тестов
   - Используй React Testing Library

7. **Следуй документации**
   - Документируй все функции
   - Документируй все компоненты
   - Документируй все API-запросы
