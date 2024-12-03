@echo off

:: Run the backend command in the backend folder in a new window
start cmd /k "cd /d %~dp0backend && node index.js"

:: Run the frontend command in the frontend folder in a new window
start cmd /k "cd /d %~dp0frontend && npm run dev"
