"use client";

import { memo, useState, useCallback } from "react";
import { MapPin, TrendingUp, Users, Heart } from "lucide-react";

interface RegionData {
  id: string;
  name: string;
  highlights: {
    label: string;
    value: string;
    trend?: string;
  }[];
}

interface VietnamMapProps {
  regions: RegionData[];
}

export const VietnamMap = memo(function VietnamMap({ regions }: VietnamMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = useCallback((regionId: string) => {
    setSelectedRegion(selectedRegion === regionId ? null : regionId);
  }, [selectedRegion]);

  const activeRegion = regions.find((r) => r.id === (hoveredRegion || selectedRegion));

  return (
    <div className="w-full space-y-6">
      {/* Map Title */}
      <div className="text-center">
        <h3 className="text-2xl font-heading font-bold mb-2">
          Bản đồ Thực tiễn Nhân quyền
        </h3>
        <p className="text-sm text-muted-foreground">
          Chọn vùng để xem số liệu thực tế về quyền con người tại Việt Nam
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map SVG */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 rounded-2xl">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background */}
              <rect width="800" height="600" fill="transparent" />

              {/* Simplified Vietnam Regions - Interactive */}
              <g id="vietnam-regions">
                {/* Northern Mountains */}
                <path
                  d="M 150 50 L 350 50 L 400 150 L 300 200 L 100 150 Z"
                  fill={hoveredRegion === "north" || selectedRegion === "north" ? "rgba(13, 148, 136, 0.3)" : "rgba(13, 148, 136, 0.1)"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:fill-[rgba(13,148,136,0.25)]"
                  onClick={() => handleRegionClick("north")}
                  onMouseEnter={() => setHoveredRegion("north")}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {/* Red River Delta */}
                <path
                  d="M 300 200 L 450 180 L 500 250 L 400 300 L 250 280 Z"
                  fill={hoveredRegion === "redriver" || selectedRegion === "redriver" ? "rgba(45, 212, 191, 0.3)" : "rgba(45, 212, 191, 0.1)"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:fill-[rgba(45,212,191,0.25)]"
                  onClick={() => handleRegionClick("redriver")}
                  onMouseEnter={() => setHoveredRegion("redriver")}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {/* Central Coast */}
                <path
                  d="M 400 300 L 500 250 L 550 350 L 450 450 L 350 400 Z"
                  fill={hoveredRegion === "central" || selectedRegion === "central" ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.1)"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:fill-[rgba(59,130,246,0.25)]"
                  onClick={() => handleRegionClick("central")}
                  onMouseEnter={() => setHoveredRegion("central")}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {/* Central Highlands */}
                <path
                  d="M 450 450 L 550 350 L 600 450 L 500 550 L 400 500 Z"
                  fill={hoveredRegion === "highlands" || selectedRegion === "highlands" ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.1)"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:fill-[rgba(139,92,246,0.25)]"
                  onClick={() => handleRegionClick("highlands")}
                  onMouseEnter={() => setHoveredRegion("highlands")}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {/* Southeast */}
                <path
                  d="M 500 250 L 650 280 L 700 400 L 550 450 Z"
                  fill={hoveredRegion === "southeast" || selectedRegion === "southeast" ? "rgba(236, 72, 153, 0.3)" : "rgba(236, 72, 153, 0.1)"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:fill-[rgba(236,72,153,0.25)]"
                  onClick={() => handleRegionClick("southeast")}
                  onMouseEnter={() => setHoveredRegion("southeast")}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {/* Mekong Delta */}
                <path
                  d="M 400 500 L 500 550 L 600 550 L 650 450 L 450 450 Z"
                  fill={hoveredRegion === "mekong" || selectedRegion === "mekong" ? "rgba(34, 197, 94, 0.3)" : "rgba(34, 197, 94, 0.1)"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:fill-[rgba(34,197,94,0.25)]"
                  onClick={() => handleRegionClick("mekong")}
                  onMouseEnter={() => setHoveredRegion("mekong")}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {/* Region Labels */}
                <text x="250" y="120" className="fill-current text-xs font-semibold text-center pointer-events-none">Miền Bắc</text>
                <text x="375" y="240" className="fill-current text-xs font-semibold text-center pointer-events-none">Đồng bằng</text>
                <text x="450" y="380" className="fill-current text-xs font-semibold text-center pointer-events-none">Bắc Trung Bộ</text>
                <text x="500" y="480" className="fill-current text-xs font-semibold text-center pointer-events-none">Tây Nguyên</text>
                <text x="600" y="360" className="fill-current text-xs font-semibold text-center pointer-events-none">Đông Nam Bộ</text>
                <text x="520" y="530" className="fill-current text-xs font-semibold text-center pointer-events-none">Đồng bằng sông Cửu Long</text>
              </g>

              {/* Legend */}
              <g transform="translate(650, 50)">
                <rect width="140" height="120" fill="rgba(255,255,255,0.9)" rx="8" className="dark:fill-slate-800/90" />
                <text x="70" y="20" className="fill-current text-xs font-bold text-center">Chỉ số</text>
                <circle cx="20" cy="40" r="6" fill="rgba(13, 148, 136, 0.5)" />
                <text x="35" y="44" className="fill-current text-xs">Y tế</text>
                <circle cx="20" cy="60" r="6" fill="rgba(45, 212, 191, 0.5)" />
                <text x="35" y="64" className="fill-current text-xs">Giáo dục</text>
                <circle cx="20" cy="80" r="6" fill="rgba(59, 130, 246, 0.5)" />
                <text x="35" y="84" className="fill-current text-xs">An sinh</text>
                <circle cx="20" cy="100" r="6" fill="rgba(34, 197, 94, 0.5)" />
                <text x="35" y="104" className="fill-current text-xs">Việc làm</text>
              </g>
            </svg>

            <p className="text-center text-xs text-muted-foreground mt-4">
              <MapPin className="h-3 w-3 inline-block mr-1" />
              Click vào từng vùng để xem chi tiết
            </p>
          </div>
        </div>

        {/* Region Details Panel */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 rounded-2xl h-full">
            {activeRegion ? (
              <div className="space-y-4 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h4 className="font-heading font-bold text-lg">{activeRegion.name}</h4>
                </div>

                {activeRegion.highlights.map((highlight, index) => (
                  <div key={index} className="bg-secondary/50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{highlight.label}</span>
                      {highlight.trend && (
                        <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {highlight.trend}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-primary">{highlight.value}</div>
                  </div>
                ))}

                <button
                  onClick={() => setSelectedRegion(null)}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold mb-2">Chọn vùng</h4>
                  <p className="text-sm text-muted-foreground">
                    Click vào một vùng trên bản đồ để xem số liệu thực tế
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* National Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Bảo hiểm y tế</div>
            <div className="text-xl font-bold">92%</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Tỷ lệ biết chữ</div>
            <div className="text-xl font-bold">97%</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Giảm nghèo</div>
            <div className="text-xl font-bold">2.23%</div>
          </div>
        </div>
      </div>
    </div>
  );
});
