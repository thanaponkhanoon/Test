package main

import (
	"github.com/gin-gonic/gin"
	"github.com/thanaponkhanoon/Test/controller"
	"github.com/thanaponkhanoon/Test/entity"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	//Todolist
	r.GET("/todolist", controller.GetAllTodolist)
	r.GET("/todolist/:id", controller.GetTodolistByID)
	r.POST("/todolist", controller.CreateTodolist)
	r.PATCH("/todolist", controller.UpdateTodolist)
	r.DELETE("/todolist/:id", controller.DeleteTodolistByID)

	// Run the server
	r.Run("localhost: " + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,DELETE,PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}