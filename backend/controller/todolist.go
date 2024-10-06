package controller

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/thanaponkhanoon/Test/entity"
	"github.com/asaskevich/govalidator"
)

func CreateTodolist(c *gin.Context){
	var status		entity.Status
	var todolist	entity.Todolist

	if err := c.ShouldBindJSON(&todolist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", todolist.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	TL := entity.Todolist{
		List: 		todolist.List,
		Des:		todolist.Des,
		Date:		todolist.Date.Local(),
		Status: 	status,
	}

	if _, err := govalidator.ValidateStruct(todolist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&TL).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"data": TL})
}

func GetAllTodolist(c *gin.Context){
	var todolist	[]entity.Todolist
	if err := entity.DB().Model(&entity.Todolist{}).Preload("Status").Find(&todolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": todolist})
}

func GetTodolistByID(c *gin.Context) {
	var todolist	[]entity.Todolist
	Id := c.Param("id")
	if err := entity.DB().Model(&entity.Todolist{}).Where("ID = ?", Id).Preload("Status").Find(&todolist); err.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("TodolistID :  Id%s not found.", Id)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": todolist})
}

func UpdateTodolist(c *gin.Context){
	var status		entity.Status
	var todolist	entity.Todolist

	if err := c.ShouldBindJSON(&todolist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", todolist.ID).First(&entity.Todolist{}); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "detail not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", todolist.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(todolist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todolist.Date = todolist.Date.Local()

	if err := entity.DB().Save(&todolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": todolist})
}

func DeleteTodolistByID(c *gin.Context) {
	Id := c.Param("id")
	if tx := entity.DB().Delete(&entity.Todolist{}, Id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "todolist ID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": fmt.Sprintf("TodolistID :  Id%s deleted.", Id)})
}