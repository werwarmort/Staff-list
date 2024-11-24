install:
	@echo "установка зависимостей для клиента"
	bun install --cwd ./src
	@echo "установка зависимостей для серверной части"
	cd ./src/server && yarn install

start:
	bun run dev