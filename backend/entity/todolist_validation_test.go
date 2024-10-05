package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestTodolistCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Todolist", func(t *testing.T) {
		todolist := Todolist{
			List:   "Make Your Day",
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(todolist)

		// เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		// เช็คว่ามันว่างไหม
		g.Expect(err).To(BeNil())

		fmt.Println(err)
	})
}

func TestListNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	todolist := Todolist{
		List: 	"", //ผิด
		
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(todolist)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("List cannot be blank"))
}