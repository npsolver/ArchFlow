package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/npsolver/ArchFlow/backend/internal/database"
)

type SignupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Signup(c *gin.Context) {

	var req SignupRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid input"})
		return
	}

	hash, err := HashPassword(req.Password)

	if err != nil {
		c.JSON(500, gin.H{"error": "hash error"})
		return
	}

	id := uuid.New()

	_, err = database.DB.Exec(
		c,
		`INSERT INTO users (id,email,password_hash)
		 VALUES ($1,$2,$3)`,
		id,
		req.Email,
		hash,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "user creation failed"})
		return
	}

	token, _ := GenerateToken(id.String())

	c.JSON(200, gin.H{
		"token": token,
	})
}
