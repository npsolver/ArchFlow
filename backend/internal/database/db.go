package database

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func Connect() error {

	var err error

	databaseURL := os.Getenv("DATABASE_URL")

	for i := 0; i < 10; i++ {

		log.Println("Attempting database pool creation")

		DB, err = pgxpool.New(context.Background(), databaseURL)

		if err == nil {
			log.Println("Database pool creation successful")
			return nil
		}

		log.Println("Database not ready, retrying in 2 seconds...")
		time.Sleep(2 * time.Second)
	}

	log.Fatal("unable to create pool: ", err)
	return err
}
