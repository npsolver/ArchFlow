package database

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

func Connect() error {

	var conn *pgx.Conn
	var err error

	databaseURL := os.Getenv("DATABASE_URL")

	for i := 0; i < 10; i++ {

		log.Println("Attempting database connection")

		conn, err = pgx.Connect(context.Background(), databaseURL)

		if err == nil {
			DB = conn
			log.Println("Database connection successful")
			return nil
		}

		log.Println("Database not ready, retrying in 2 seconds...")
		time.Sleep(2 * time.Second)
	}

	return err
}
