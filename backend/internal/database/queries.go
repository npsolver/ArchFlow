package database

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func GetProjects(c *gin.Context) {

	email := c.Query("email")

	var user_id string

	err := DB.QueryRow(
		c,
		`SELECT id
		 FROM users
		 WHERE email=$1`,
		email,
	).Scan(&user_id)

	if err != nil {
		c.JSON(401, gin.H{"error": "invalid credentials"})
		return
	}

	rows, _ := DB.Query(
		c,
		`SELECT title
		 FROM projects
		 WHERE user_id=$1`,
		user_id,
	)

	titles, err := pgx.CollectRows(rows, pgx.RowTo[string])

	if err != nil {
		c.JSON(401, gin.H{"error": "invalid credentials"})
		return
	}

	c.JSON(200, gin.H{
		"projects": titles,
	})
	return
}

type AddProjectRequest struct {
	Email string `json:"email"`
	Title string `json:"title"`
}

func AddProject(c *gin.Context) {

	var req AddProjectRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid input"})
		return
	}

	var user_id string

	err := DB.QueryRow(
		c,
		`SELECT id
		 FROM users
		 WHERE email=$1`,
		req.Email,
	).Scan(&user_id)

	if err != nil {
		c.JSON(401, gin.H{"error": "invalid credentials"})
		return
	}

	id := uuid.New()

	_, err = DB.Exec(
		c,
		`INSERT INTO projects (id,user_id,title)
		 VALUES ($1,$2,$3)`,
		id,
		user_id,
		req.Title,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "projects creation failed"})
		return
	}

	c.JSON(200, gin.H{
		"success": true,
	})

}
