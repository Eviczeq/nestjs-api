RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
$(eval $(RUN_ARGS):;@:)


# ----- コンテナ管理 -----
up:
	docker compose up -d $(RUN_ARGS)
up-a:
	docker compose up app db
up-build:
	docker compose up -d --build app db mailpit
stop:
	docker compose stop
down:
	docker compose kill $(RUN_ARGS)
	docker compose rm -f $(RUN_ARGS)
restart:
	@make down $(RUN_ARGS)
	@make up $(RUN_ARGS)
down-rmi:
	docker compose down --remove-orphans --rmi local
down-volume:
	docker compose down --remove-orphans --volumes
ps:
	docker compose ps
ps-a:
	docker compose ps -a

# ----- コンテナ接続 -----
.PHONY: app
app:
	docker compose exec app /bin/sh
db:
	docker compose exec db /bin/sh

# ----- その他スクリプトなど -----
copy-env:
	cp .env.example .env

# ----- マイグレーション -----
migrate:
	docker compose exec app npm run migrate
rollback:
	docker compose exec app npm run rollback
rollback-a:
	docker compose exec app npm run rollback:all
migrate-check:
	docker compose exec app npm run migrate:status

# ----- シーダー -----
seed:
	docker compose exec app npm run seed
seed-s:
	docker compose exec app npm run seed-s --file="${file}"

# ----- リント -----
lint:
	docker compose exec app npm run lint
lint-fix:
	docker compose exec app npm run lint:fix

# ----- パッケージインストール -----
npm-install:
	docker compose exec app npm ci
copy-node_modules:
	docker compose cp app:/usr/src/app/node_modules ./
install:
	@make npm-install
	@make copy-node_modules

# ----- フォーマット -----
format:
	docker compose exec app npm run format
format-check:
	docker compose exec app npm run format:check

# ----- 初回環境構築用 -----
init:
	@make up
	@sleep 20 # モデルファイルとDBの同期のため、20秒間待機（必要に応じて秒数を変更）
	@make seed
	@mkdir -p node_modules
	@chmod 777 ./node_modules
	@make copy-node_modules

# ----- dev環境用コマンド -----
# ------ ログ -----
logs-app-dev:
	docker compose logs -f app-dev

logs-db:
	docker compose logs -f db

# ------ 起動 -----
up-dev:
	docker compose up -d app-dev db

no-cache-build:
	docker compose build --no-cache app-dev

dev:
	@make down
	@make no-cache-build
	@make up-dev
