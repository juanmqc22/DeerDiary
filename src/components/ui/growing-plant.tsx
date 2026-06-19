interface PlantProps {
  progress: number // 0-100
  color: string
  size?: number
}

export function GrowingPlant({ progress, color, size = 80 }: PlantProps) {
  const stage = progress < 15 ? "seed" : progress < 35 ? "sprout" : progress < 60 ? "young" : progress < 85 ? "grown" : "bloom"

  const stemHeight = Math.max(8, (progress / 100) * 52)
  const leafScale = Math.max(0, (progress - 20) / 80)
  const flowerScale = Math.max(0, (progress - 70) / 30)

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Solo */}
      <ellipse cx="40" cy="72" rx="22" ry="5" fill={color} opacity="0.15" />
      <ellipse cx="40" cy="72" rx="16" ry="3.5" fill={color} opacity="0.25" />

      {/* Semente / bolinha inicial */}
      {stage === "seed" && (
        <ellipse cx="40" cy="68" rx="5" ry="4" fill={color} opacity="0.6" />
      )}

      {/* Caule */}
      {progress >= 15 && (
        <path
          d={`M40 70 Q40 ${70 - stemHeight * 0.5} 40 ${70 - stemHeight}`}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      )}

      {/* Folhas pequenas (sprout) */}
      {progress >= 25 && (
        <>
          <ellipse
            cx={40 - 8 * leafScale}
            cy={70 - stemHeight * 0.5}
            rx={7 * leafScale}
            ry={3.5 * leafScale}
            fill={color}
            opacity="0.6"
            transform={`rotate(-30 ${40 - 8 * leafScale} ${70 - stemHeight * 0.5})`}
          />
          <ellipse
            cx={40 + 8 * leafScale}
            cy={70 - stemHeight * 0.55}
            rx={7 * leafScale}
            ry={3.5 * leafScale}
            fill={color}
            opacity="0.6"
            transform={`rotate(30 ${40 + 8 * leafScale} ${70 - stemHeight * 0.55})`}
          />
        </>
      )}

      {/* Folhas médias */}
      {progress >= 50 && (
        <>
          <ellipse
            cx={40 - 10 * leafScale}
            cy={70 - stemHeight * 0.75}
            rx={9 * leafScale}
            ry={4 * leafScale}
            fill={color}
            opacity="0.7"
            transform={`rotate(-35 ${40 - 10 * leafScale} ${70 - stemHeight * 0.75})`}
          />
          <ellipse
            cx={40 + 10 * leafScale}
            cy={70 - stemHeight * 0.8}
            rx={9 * leafScale}
            ry={4 * leafScale}
            fill={color}
            opacity="0.7"
            transform={`rotate(35 ${40 + 10 * leafScale} ${70 - stemHeight * 0.8})`}
          />
        </>
      )}

      {/* Copa / flor no topo */}
      {progress >= 70 && (
        <>
          {/* Copa redonda */}
          <circle
            cx="40"
            cy={70 - stemHeight}
            r={12 * flowerScale}
            fill={color}
            opacity="0.25"
          />
          <circle
            cx="40"
            cy={70 - stemHeight}
            r={7 * flowerScale}
            fill={color}
            opacity="0.5"
          />
          {/* Pétalas quando completo */}
          {progress >= 90 && (
            <>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <circle
                  key={i}
                  cx={40 + Math.cos((angle * Math.PI) / 180) * 8 * flowerScale}
                  cy={(70 - stemHeight) + Math.sin((angle * Math.PI) / 180) * 8 * flowerScale}
                  r={4 * flowerScale}
                  fill={color}
                  opacity="0.4"
                />
              ))}
              <circle cx="40" cy={70 - stemHeight} r={5 * flowerScale} fill={color} opacity="0.9" />
            </>
          )}
        </>
      )}
    </svg>
  )
}
