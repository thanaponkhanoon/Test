package entity

import (
	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)
type Status struct {
	gorm.Model

	Name	string
	Todolist []Todolist `gorm:"foreignKey:StatusID"`
}

type Todolist struct {
	gorm.Model

	List	string
	Detail	string
	StatusID	*uint
	Status	Status `gorm:"references:id"`
}