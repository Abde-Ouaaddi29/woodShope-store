@echo off
cd /d %~dp0\server
start cmd /k php artisan serve

cd /d %~dp0\front-end
start cmd /k npm run dev
