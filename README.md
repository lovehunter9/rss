# RSS


## Manual Installation Server
1. Install Postgresql
2. Create database named miniflux
3. cd server;go build
4. Run the SQL migrations: DATABASE_URL=postgres://[db_username]:[db_password]@[db_host]:[db_port]/miniflux?sslmode=disable  ./miniflux.app -migrate
5. Create an admin user: DATABASE_URL=postgres://[db_username]:[db_password]@[db_host]:[db_port]/miniflux?sslmode=disable  ./miniflux.app -create-admin
6. Start the application: DATABASE_URL=postgres://[db_username]:[db_password]@[db_host]:[db_port]/miniflux?sslmode=disable  ./miniflux.app
