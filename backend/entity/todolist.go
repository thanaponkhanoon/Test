package entity

import (
	"time"
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Todolist struct {
	gorm.Model

	List	string 	`valid:"required~List cannot be blank"`
	Des		string	`valid:"required~Des cannot be blank"`
	Date	time.Time	`valid:"required~Date is required, Past~วันที่ต้องไม่เป็นวันในอดีต"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("Past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		// ตรวจสอบว่าผู้ใช้เลือกวันที่หรือยัง (ไม่ใช่ค่าเริ่มต้น)
		if t.IsZero() {
			return false
		}
		// ตรวจสอบว่าต้องเป็นวันที่ปัจจุบันหรืออนาคตเท่านั้น
		current := time.Now()
		return t.Format("2006-01-02") >= current.Format("2006-01-02")
	})
}