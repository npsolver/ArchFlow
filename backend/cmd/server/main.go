package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/npsolver/archflow/backend/internal/auth"
	"github.com/npsolver/archflow/backend/internal/database"
)

func main() {

	err := database.Connect()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

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
