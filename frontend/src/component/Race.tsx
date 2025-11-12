import React, { useRef, useState } from "react";
import { Box } from "@mui/material";

const RaceTrack: React.FC = () => {
  const [laps, setLaps] = useState<number>(1);
  const animateRef = useRef<SVGAnimateMotionElement | null>(null);

  const handleStart = () => {
    // เริ่มอนิเมชัน
    if (animateRef.current) {
      animateRef.current.beginElement();
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h2 style={{ marginBottom: 10, color: "white" }}>🏍️ Motorcycle Racetrack 🏁</h2>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* SVG สนาม */}
        <svg
          width="500"
          height="300"
          viewBox="0 0 500 300"
          style={{
            marginTop: 30,
            background: "#e8f7e8",
            borderRadius: 12,
            border: "1px solid #ccc",
          }}
        >
          {/* เส้นทางลู่วิ่ง */}
          <path
            id="trackPath"
            d="M 400 150 A 150 80 0 1 0 100 150 A 150 80 0 1 0 400 150 Z"
            fill="none"
            stroke="#444"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 🏁 เส้นชัยตรงจุดเริ่มต้น */}
          <g transform="translate(400,150)">
            {/* ธงหมากรุกเล็ก ๆ */}
            {Array.from({ length: 4 }).map((_, row) =>
              Array.from({ length: 2 }).map((_, col) => {
                const size = 6;
                const x = col * size;
                const y = row * size - 12; // ย้ายให้ตั้งฉากกับเส้นทาง
                const fill = (row + col) % 2 === 0 ? "#000" : "#fff";
                return <rect key={`${row}-${col}`} x={x} y={y} width={size} height={size} fill={fill} />;
              })
            )}
          </g>

          <g>
            {/* ตัวรถ */}
            <circle r={10} fill="#ff4d4f" stroke="#800" strokeWidth="1.5" />
            <rect
              x={-8}
              y={-18}
              width={16}
              height={6}
              rx={2}
              fill="#333"
              opacity={0.8}
            />

            {/* animation เริ่มเมื่อกดปุ่ม */}
            <animateMotion
              ref={animateRef}
              dur="4s"
              repeatCount={laps.toString()}
              rotate="auto"
              begin="indefinite"
              fill="freeze"
            >
              <mpath href="#trackPath" />
            </animateMotion>
          </g>
        </svg>

        {/* ช่องกรอกจำนวนรอบ */}
        <label style={{ fontSize: 16, color: "white", margin: "10px" }}>
          Enter Laps:&nbsp;
          <input
            type="number"
            min={1}
            value={laps}
            onChange={(e) => setLaps(Number(e.target.value))}
            style={{
              width: 80,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #aaa",
              marginRight: 10,
            }}
          />
        </label>

        {/* ปุ่มเริ่มวิ่ง */}
        <button
          onClick={handleStart}
          style={{
            padding: "6px 16px",
            borderRadius: 6,
            border: "none",
            background: "#2b6cb0",
            color: "#fff",
            cursor: "pointer",
            fontSize: 15,
          }}
        >
          Start Race
        </button>
      </Box>

      <p style={{ color: "#898989ff", marginTop: 10 }}>
        Motorcycle will run <strong>{laps}</strong> lap{laps > 1 ? "s" : ""} when you press Start.
      </p>
    </div>
  );
};

export default RaceTrack;
