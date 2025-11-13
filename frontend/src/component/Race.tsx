import React, { useRef, useState } from "react";
import { Box, Button } from "@mui/material";

const RaceTrack: React.FC = () => {
  const [laps, setLaps] = useState<number>(1);
  const [currentLap, setCurrentLap] = useState<number>(0);
  const animateRef = useRef<SVGAnimateMotionElement | null>(null);

  const DURATION = 4000; // 4 วินาทีต่อรอบ

  const handleStart = () => {
    setCurrentLap(0);
    if (animateRef.current) {
      animateRef.current.beginElement();
    }

    // เริ่มนับรอบหลังผ่านเส้นชัยรอบแรก
    setTimeout(() => {
      let lap = 1;
      console.log(`🚗 รถกำลังวิ่งในรอบที่ ${lap}`);
      setCurrentLap(lap);

      const interval = setInterval(() => {
        lap++;
        if (lap <= laps) {
          console.log(`🚗 รถกำลังวิ่งในรอบที่ ${lap}`);
          setCurrentLap(lap);
        }
        if (lap >= laps) {
          clearInterval(interval);
          console.log("🏁 จบการแข่งขัน!");
        }
      }, DURATION);

      return () => clearInterval(interval);
    }, DURATION);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 10,
        background: "radial-gradient(circle at center, #1a1a1a 20%, #000 100%)",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          marginBottom: 8,
          color: "#fff",
          fontFamily: "Orbitron, sans-serif",
          letterSpacing: 1,
          textShadow: "0 0 8px #1de9b6",
        }}
      >
        🏍️ Motorcycle Racetrack 🏁
      </h2>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            "linear-gradient(145deg, rgba(20,20,20,0.95), rgba(60,60,60,0.95))",
          borderRadius: 4,
          p: 2,
          boxShadow: "0 0 25px rgba(255,255,255,0.15)",
        }}
      >
        <svg
          width="500"
          height="250"
          viewBox="0 0 500 300"
          style={{
            marginTop: 5,
            background: "radial-gradient(circle at center, #2e7d32, #1b5e20)",
            borderRadius: 12,
            boxShadow: "0 0 20px rgba(0,0,0,0.4) inset",
          }}
        >
          {/* ขอบลู่วิ่งด้านนอก */}
          <path
            d="M 400 150 A 150 80 0 1 0 100 150 A 150 80 0 1 0 400 150 Z"
            fill="none"
            stroke="#222"
            strokeWidth="30"
          />

          {/* ลู่วิ่งหลัก */}
          <path
            id="trackPath"
            d="M 400 150 A 150 80 0 1 0 100 150 A 150 80 0 1 0 400 150 Z"
            fill="none"
            stroke="#555"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* เส้นกลางสนาม */}
          <path
            d="M 400 150 A 150 80 0 1 0 100 150 A 150 80 0 1 0 400 150 Z"
            fill="none"
            strokeDasharray="10 8"
            stroke="#fff"
            strokeWidth="2"
          />

          {/* 🏁 เส้นชัยตรงจุดเริ่มต้น */}
          <g transform="translate(400,150)">
            {Array.from({ length: 4 }).map((_, row) =>
              Array.from({ length: 2 }).map((_, col) => {
                const size = 6;
                const x = col * size;
                const y = row * size - 12;
                const fill = (row + col) % 2 === 0 ? "#000" : "#fff";
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={x}
                    y={y}
                    width={size}
                    height={size}
                    fill={fill}
                  />
                );
              })
            )}
          </g>

          {/* รถแข่ง */}
          <g filter="drop-shadow(0px 0px 3px #ff4d4f)">
            {/* ตัวรถ */}
            <circle r={10} fill="#ff4d4f" stroke="#800" strokeWidth="1.5" />
            <rect
              x={-8}
              y={-18}
              width={16}
              height={6}
              rx={2}
              fill="#222"
              opacity={0.9}
            />

            {/* ไฟท้าย */}
            <circle cx="0" cy="-16" r="2" fill="#ff0000" />

            {/* แอนิเมชัน */}
            <animateMotion
              ref={animateRef}
              dur={`${DURATION / 1000}s`}
              repeatCount={laps.toString()}
              rotate="auto"
              begin="indefinite"
              fill="freeze"
            >
              <mpath href="#trackPath" />
            </animateMotion>

            {/* ghost motion สำหรับตั้งตำแหน่งเริ่มต้น */}
            <animateMotion dur="0s" begin="0s" fill="freeze">
              <mpath href="#trackPath" />
            </animateMotion>
          </g>
        </svg>

        {/* ช่องกรอกจำนวนรอบ */}
        <label
          style={{
            fontSize: 16,
            color: "white",
            margin: "15px 0 8px 0",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          Enter Laps:&nbsp;
          <input
            type="number"
            min={1}
            value={laps}
            onChange={(e) => setLaps(Number(e.target.value))}
            style={{
              width: 80,
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #999",
              fontSize: 16,
              backgroundColor: "#222",
              color: "white",
              outline: "none",
            }}
          />
        </label>

        {/* ปุ่มเริ่มวิ่ง */}
        <Button
          onClick={handleStart}
          sx={{
            padding: "8px 22px",
            borderRadius: "20px",
            background: "linear-gradient(90deg, #ff6f00, #ff4081)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
            fontFamily: "Orbitron, sans-serif",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              background: "linear-gradient(90deg, #ff4081, #00e5ff)",
              boxShadow: "0 0 20px rgba(255,255,255,0.4)",
            },
          }}
        >
          Start Race
        </Button>
      </Box>

      {/* สถานะ */}
      <p
        style={{
          color: "#ccc",
          // marginTop: 16,
          fontFamily: "Orbitron, sans-serif",
        }}
      >
        Motorcycle will run <strong>{laps}</strong> lap
        {laps > 1 ? "s" : ""} when you press Start.
      </p>

      {currentLap > 0 && currentLap < laps && (
        <p
          style={{
            color: "#00e5ff",
            fontWeight: "bold",
            // marginTop: 8,
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          🏎️ Now running lap {currentLap}/{laps}
        </p>
      )}

      {currentLap >= laps && (
        <p
          style={{
            color: "#ffea00",
            fontWeight: "bold",
            // marginTop: 8,
            textShadow: "0 0 8px #ffeb3b",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          🏁 Race Finished!
        </p>
      )}
    </div>
  );
};

export default RaceTrack;
