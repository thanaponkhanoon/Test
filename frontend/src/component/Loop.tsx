import { Button, Card, Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Loop() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        padding: 4,
        mt: -3,
      }}
    >
      <Card
        sx={{
          px: 5,
          bgcolor: "rgba(255, 255, 255, 0.1)",
          boxShadow: 3,
          borderRadius: 3,
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: "bold",
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "white",
          }}
        >
          Loop
        </Typography>
      </Card>

      <Card
        sx={{
          mt: 2,
          width: "70%",
          bgcolor: "rgba(255, 255, 255, 0.15)",
          color: "#fff",
          borderRadius: 3,
          boxShadow: 5,
          p: 4,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          sx={{ fontSize: 28, fontWeight: 600, mb: 2, textAlign: "center" }}
        >
          นิยาม
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: 1.6 }}>
          <strong>Loop</strong> คือ โครงสร้างควบคุม (control structure)
          ที่ใช้สำหรับทำงานซ้ำ (repeat) คำสั่งหรือชุดคำสั่ง
          จนกว่าเงื่อนไขที่กำหนดจะสิ้นสุดลง
        </Typography>
        <Typography sx={{ fontSize: 18, mt: 2, lineHeight: 1.6 }}>
          พูดง่าย ๆ คือ “ลูป” คือการสั่งให้คอมพิวเตอร์ทำสิ่งเดิม ๆ ซ้ำ ๆ
          โดยอาจมีการเปลี่ยนค่าบางอย่างในแต่ละรอบ เช่น ตัวนับ ตัวเลข
          หรือข้อมูลในอาร์เรย์
        </Typography>
      </Card>

      <Card
        sx={{
          mt: 2,
          width: "70%",
          bgcolor: "rgba(255, 255, 255, 0.15)",
          color: "#fff",
          borderRadius: 3,
          boxShadow: 5,
          p: 4,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          sx={{ fontSize: 26, fontWeight: 600, mb: 2, textAlign: "center" }}
        >
          ตัวอย่าง
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: 1.6, textAlign: "center" }}>
          วิ่งรอบสนาม 5 รอบ → ทำซ้ำ 5 ครั้ง <br />
          ล้างจานจนกว่าจะหมด → ทำซ้ำ “จนกว่า” จานจะหมด
        </Typography>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          component={RouterLink}
          to="/showrace"
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #00bfa5, #1de9b6)",
            fontSize: 15,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 4,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #1de9b6, #00bfa5)",
              boxShadow: 6,
            },
          }}
        >
          🏍️ Motorcycle Racetrack 🏁
        </Button>
      </Box>
    </Box>
  );
}
