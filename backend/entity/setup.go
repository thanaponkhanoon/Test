package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("ระบบ to do list.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Todolist{},
	)

	db = database

	// Todolist
	todolist1 := Todolist{
		List:		"Task1",
		Des:		"Lorem",
		Date:		time.Now(),
	}
	db.Model(&Todolist{}).Create(&todolist1)
	
}