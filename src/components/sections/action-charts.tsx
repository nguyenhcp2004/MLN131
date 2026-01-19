"use client";

import { memo, useState, useEffect } from "react";
import { TrendingUp, DollarSign, Scale, Users, ArrowRight, GraduationCap, Heart } from "lucide-react";

interface ChartData {
  label: string;
  value: number;
  color: string;
}

export const ActionChartsSection = memo(function ActionChartsSection() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const corruptionData: ChartData[] = [
    { label: "2021", value: 65, color: "bg-red-500" },
    { label: "2022", value: 78, color: "bg-orange-500" },
    { label: "2023", value: 92, color: "bg-amber-500" },
    { label: "2024", value: 108, color: "bg-yellow-500" },
  ];

  const recoveredAssets: ChartData[] = [
    { label: "Tiền mặt", value: 45, color: "bg-blue-500" },
    { label: "Bất động sản", value: 30, color: "bg-teal-500" },
    { label: "Vàng bạc", value: 15, color: "bg-purple-500" },
    { label: "Khác", value: 10, color: "bg-gray-500" },
  ];

  const maxValue = Math.max(...corruptionData.map((d) => d.value));

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4">
            <Scale className="h-4 w-4" />
            Cuộc chiến nội xâm
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mb-4">
            Thực tế chống tham nhũng
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Số liệu về xử lý tham nhũng và tài sản thu hồi. Mỗi đồng được thu hồi là một phần ngân
            sách cho giáo dục và y tế của bạn được đảm bảo.
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Scale className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-4xl font-bold text-red-500 mb-2">2,456</div>
            <div className="text-sm text-muted-foreground mb-1">Vụ việc xử lý</div>
            <div className="text-xs text-green-600 font-semibold">↑ 23% so với 2023</div>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-4xl font-bold text-green-500 mb-2">15.8 Tỷ</div>
            <div className="text-sm text-muted-foreground mb-1">Đồng thu hồi (VNĐ)</div>
            <div className="text-xs text-green-600 font-semibold">↑ 45% so với 2023</div>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-4xl font-bold text-blue-500 mb-2">5,234</div>
            <div className="text-sm text-muted-foreground mb-1">Cán bộ xử lý</div>
            <div className="text-xs text-green-600 font-semibold">↑ 18% so với 2023</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Cases Bar Chart */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              Số vụ xử lý qua các năm
            </h3>
            <div className="space-y-4">
              {corruptionData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="font-bold text-primary">{item.value} vụ</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: animated ? `${(item.value / maxValue) * 100}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assets Donut Chart */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Cơ cấu tài sản thu hồi
            </h3>

            {/* Simple Donut Chart Representation */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {recoveredAssets.map((item, index) => {
                  const previousValues = recoveredAssets.slice(0, index).reduce((sum, d) => sum + d.value, 0);
                  const circumference = 2 * Math.PI * 40;
                  const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((previousValues / 100) * circumference);

                  return (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="20"
                      className={`${item.color} transition-all duration-1000 ease-out`}
                      style={{
                        strokeDasharray,
                        strokeDashoffset: animated ? strokeDashoffset : -circumference,
                      }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-muted-foreground">Tài sản</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2">
              {recoveredAssets.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm">
                    {item.label}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Explanation */}
        <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <h3 className="text-xl font-heading font-bold mb-4 text-center">
            💡 Tiền thu hồi được dùng để làm gì?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Giáo dục</h4>
                <p className="text-sm text-muted-foreground">
                  Xây dựng ~150 trường học mới. Cung cấp sách giáo khoa miễn phí cho 50,000 học sinh
                  nghèo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Y tế</h4>
                <p className="text-sm text-muted-foreground">
                  Mua sắm trang thiết bị y tế cho 200 trạm y tế xã. Bảo hiểm y tế cho 5,000 người nghèo.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
            <p className="text-sm text-center font-medium">
              <ArrowRight className="h-4 w-4 inline-block mr-2" />
              Mỗi đồng tham nhũng bị thu hồi = Một phần ngân sách cho giáo dục và y tế của bạn được
              đảm bảo!
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border-2 border-primary hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Phản ánh tham nhũng</h4>
                <p className="text-xs text-muted-foreground">Đường dây nóng: 1111</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
              Báo cáo ngay <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="glass-card p-6 rounded-2xl border-2 border-accent hover:border-accent/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Giám sát công trình</h4>
                <p className="text-xs text-muted-foreground">Ủng quyền người dân</p>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
              Hướng dẫn <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
