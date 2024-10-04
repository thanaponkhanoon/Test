package controller

import (
	"fmt"
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/thanaponkhanoon/Test/entity"
)

func CreateStatus(c *gin.Context){
	var status	entity.Status

	if err := c.ShouldBindJSON(&status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ST := entity.Status{
		Name: 	status.Name,
	}

	if _, err := govalidator.ValidateStruct(status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&ST).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"data": ST})
}

func GetAllStatus(c *gin.Context){
	var status []entity.Status

	if err := entity.DB().Model(&entity.Status{}).Find(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}

func GetStatusByID(c *gin.Context) {
	var status entity.Status
	Id := c.Param("id")
	if err := entity.DB().Model(&entity.Status{}).Where("ID = ?", Id).Find(&status); err.RowsAffected == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("StatusID :  Id%s not found.", Id)})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}

func UpdateStatus(c *gin.Context) {
	var status entity.Status

	if err := c.ShouldBindJSON(&status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", status.ID).First(&entity.Status{}); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}
	if err := entity.DB().Save(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": status})
}

func DeleteStatusByID(c *gin.Context) {
	Id := c.Param("id")
	if tx := entity.DB().Delete(&entity.Status{}, Id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status ID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": fmt.Sprintf("StatusID :  Id%s deleted.", Id)})
}