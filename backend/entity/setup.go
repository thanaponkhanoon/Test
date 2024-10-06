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
		&Status{},
	)

	db = database

	// Status
	status1 := Status{
		Name: 	"ยังไม่ดำเนินการ",
	}
	db.Model(&Status{}).Create(&status1)

	status2 := Status{
		Name: 	"ดำเนินการเสร็จสิ้น",
	}
	db.Model(&Status{}).Create(&status2)

	// Todolist
	todolist1 := Todolist{
		List:		"Task1",
		Des:		"Lorem",
		Date:		time.Now(),
		Status: 	status1,
	}
	db.Model(&Todolist{}).Create(&todolist1)
	
}