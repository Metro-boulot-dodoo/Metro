@echo OFF

start cmd.exe /k "cd backend && npm install && copy .env.example .env && npm run dev"

start cmd.exe /k "cd frontend && npm install && npm run dev"
