package entity

import (
	"gorm.io/gorm"
)
type Status struct {
	gorm.Model

	Name	string
	Todolist []Todolist `gorm:"foreignKey:StatusID"`
}

type Todolist struct {
	gorm.Model

	List	string `valid:"required~List cannot be blank"`
	StatusID	*uint
	Status	Status `gorm:"references:id"`
}