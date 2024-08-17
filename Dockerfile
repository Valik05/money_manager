# Используйте базовый образ с Node.js
FROM node

# Устанавливаем переменные окружения на этапе сборки
ARG VITE_APP_BASE_API_URL
ARG VITE_APP_BASE_DISCORD_URL=https://discord.gg/example
ARG VITE_APP_BASE_GITHUB_URL=https://github.com/example

ENV VITE_APP_BASE_API_URL=https://back-cash-planner.sitera.tech/api/v1
ENV VITE_APP_BASE_DISCORD_URL=https://discord.gg/JugjTnH6
ENV VITE_APP_BASE_GITHUB_URL=https://github.com/Valik05

# Установите рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем все файлы из текущей директории в рабочую директорию контейнера
COPY . .

# Собираем проект, чтобы создать директорию dist
RUN npm run build

# Устанавливаем сервер для раздачи статических файлов
RUN npm install -g serve

# Открываем порт 8000 (или другой, если требуется)
EXPOSE 8000

# Команда для запуска сервера, который будет отдавать файлы из dist
CMD ["serve", "-s", "dist", "-l", "8000"]
