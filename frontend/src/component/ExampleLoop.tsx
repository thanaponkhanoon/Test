import { Button, Card, Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ExampleLoop() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
                padding: 4,
            }}
        >
            {/* หัวข้อใหญ่ */}
            <Card
                sx={{
                    px: 5,
                    py: 2,
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                    boxShadow: 3,
                    borderRadius: 3,
                    backdropFilter: "blur(6px)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 36,
                        fontWeight: "bold",
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        color: "white",
                    }}
                >
                    Example Loop in Python
                </Typography>
            </Card>

            {/* ------------------ For Loop ------------------ */}
            <Card
                sx={{
                    mt: 5,
                    width: "80%",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    boxShadow: 5,
                    p: 4,
                    backdropFilter: "blur(10px)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 28,
                        fontWeight: 600,
                        mb: 3,
                        textAlign: "center",
                        color: "#00e676",
                    }}
                >
                    🔁 For Loop
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: 2,
                    }}
                >
                    {[
                        {
                            code: `for i in range(10):
    print(i)
# ผลลัพธ์: 0 ถึง 9`,
                        },
                        {
                            code: `for i in range(1, 11):
    print(i)
# ผลลัพธ์: 1 ถึง 10`,
                        },
                        {
                            code: `for i in range(1, 11, 2):
    print(i)
# ผลลัพธ์: 1, 3, 5, 7, 9`,
                        },
                        {
                            code: `numbers = [1, 2, 3, 4, 5, 6]
for number in numbers:
    print(number)
# ผลลัพธ์: 1, 2, 3, 4, 5, 6`,
                        },
                    ].map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                bgcolor: "#1e293b",
                                borderRadius: 2,
                                p: 2,
                                fontFamily: "monospace",
                                fontSize: 16,
                                color: "#e0e0e0",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {item.code}
                        </Card>
                    ))}
                </Box>
            </Card>

            {/* ------------------ While Loop ------------------ */}
            <Card
                sx={{
                    mt: 5,
                    width: "80%",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    boxShadow: 5,
                    p: 4,
                    backdropFilter: "blur(10px)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 28,
                        fontWeight: 600,
                        mb: 3,
                        textAlign: "center",
                        color: "#29b6f6",
                    }}
                >
                    🔄 While Loop
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 2,
                    }}
                >
                    {[
                        {
                            code: `i = 0
while i < 10:
    print(i)
    i = i + 1`,
                        },
                        {
                            code: `num = 1
while num <= 10:
    if (num % 2) == 0:
        num += 1
        continue
    print(num)
    num += 1`,
                        },
                    ].map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                bgcolor: "#1e293b",
                                borderRadius: 2,
                                p: 2,
                                fontFamily: "monospace",
                                fontSize: 16,
                                color: "#e0e0e0",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {item.code}
                        </Card>
                    ))}
                </Box>
            </Card>

            {/* ------------------ ปุ่มนำทาง ------------------ */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 6,
                    width: "100%",
                }}
            >
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

                <Button
                    component={RouterLink}
                    to="/loop"
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
                    Definition of Loop →
                </Button>
            </Box>
        </Box>
    );
}
