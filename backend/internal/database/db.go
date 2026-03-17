package database

import (
	"context"

	"github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

func Connect() error {

	conn, err := pgx.Connect(
		context.Background(),
		"postgres://archflow:password@localhost:5432/archflow?sslmode=disable",
	)

	if err != nil {
		return err
	}

	DB = conn
	return nil
}
