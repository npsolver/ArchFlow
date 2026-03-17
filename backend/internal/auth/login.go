package auth

import (
	"github.com/gin-gonic/gin"

	"github.com/npsolver/archflow/backend/internal/database"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *gin.Context) {

	var req LoginRequest

	c.ShouldBindJSON(&req)

	var id string
	var hash string

	err := database.DB.QueryRow(
		c,
		`SELECT id,password_hash
		 FROM users
		 WHERE email=$1`,
		req.Email,
	).Scan(&id, &hash)

	if err != nil {
		c.JSON(401, gin.H{"error": "invalid credentials"})
		return
	}

	if !CheckPassword(req.Password, hash) {
		c.JSON(401, gin.H{"error": "invalid credentials"})
		return
	}

	token, _ := GenerateToken(id)

	c.JSON(200, gin.H{
		"token": token,
	})
}
