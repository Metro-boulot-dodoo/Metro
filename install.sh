#!/bin/bash

cd backend
npm install
cp .env.example .env
npm run dev &
cd ../frontend
npm install
npm run dev