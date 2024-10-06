package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestTodolistCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Todolist", func(t *testing.T) {
		todolist := Todolist{
			List: "Task1",
			Des:  "Lorem",
			Date: time.Now(),
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
		List: "",
		Des:  "Lorem",
		Date: time.Now(),
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

func TestDesNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	todolist := Todolist{
		List: "task1",
		Des:  "",
		Date: time.Now(),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(todolist)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Des cannot be blank"))
}

func TestDateNotBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	todolist := Todolist{
		List: "task1",
		Des:  "Lorem",
		Date: time.Now().Add(-48 * time.Hour),
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(todolist)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ต้องไม่เป็นวันในอดีต"))
}
