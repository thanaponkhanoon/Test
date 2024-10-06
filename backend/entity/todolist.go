package entity

import (
	"time"
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)
type Status struct {
	gorm.Model

	Name	string
	Todolist []Todolist `gorm:"foreignKey:StatusID"`
}

type Todolist struct {
	gorm.Model

	List	string 	`valid:"required~List cannot be blank"`
	Des		string	`valid:"required~Des cannot be blank"`
	Date	time.Time	`valid:"Past~วันที่ต้องไม่เป็นวันในอดีต"`
	StatusID	*uint
	Status	Status `gorm:"references:id"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("Past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute*-48))
		//return t.Before(time.Now())
	})
}