package main

import (
	"github.com/gin-gonic/gin"

	"github.com/npsolver/archflow/backend/internal/auth"
	"github.com/npsolver/archflow/backend/internal/database"
)

func main() {

	database.Connect()

	r := gin.Default()

	api := r.Group("/api")

	authRoutes := api.Group("/auth")
	{
		authRoutes.POST("/signup", auth.Signup)
		authRoutes.POST("/login", auth.Login)
	}

	protected := api.Group("/projects")
	protected.Use(auth.AuthMiddleware())
	{
		protected.GET("/", GetProjects)
	}

	r.Run(":8080")
}

func GetProjects(c *gin.Context) {

	c.JSON(200, gin.H{
		"message": "authenticated user",
	})
}
