.PHONY: help install dev build clean docker-up

help:
	@echo "MediMitra AI Makefile Commands:"
	@echo "  make install    - Install frontend & backend dependencies"
	@echo "  make dev        - Run Next.js frontend dev server"
	@echo "  make build      - Build Next.js production bundle"
	@echo "  make docker-up  - Run full application via Docker Compose"
	@echo "  make clean      - Clean build artifacts (.next, cache)"

install:
	cd frontend && npm install
	cd backend && pip install -r requirements.txt

dev:
	cd frontend && npm run dev

build:
	cd frontend && npm run build

docker-up:
	docker-compose up --build

clean:
	rm -rf frontend/.next
