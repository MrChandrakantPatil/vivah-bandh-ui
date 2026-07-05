import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function ProfileViewsChart() {
    const profileViewsData = [
        { day: "Mon", views: 50 },
        { day: "Tue", views: 95 },
        { day: "Wed", views: 70 },
        { day: "Thu", views: 120 },
        { day: "Fri", views: 100 },
        { day: "Sat", views: 140 },
        { day: "Sun", views: 190 },
    ];

  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart 
      data={profileViewsData}
      margin={{
        top: 10,
        left: -20,
        right: 5
      }}
      >
        <defs>
          <linearGradient
            id="profileViewsGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#ec4899"
              stopOpacity={0.25}
            />
            <stop
              offset="100%"
              stopColor="#ec4899"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ 
            fontSize: 12, 
            fill: "#6B7280"
          }}
        />

        <YAxis
          tickMargin={10}
          axisLine={false}
          tickLine={false}
          tick={{ 
            fontSize: 12, 
            fill: "#6B7280"
          }}
        />

        <Tooltip 
          contentStyle={{
            fontSize: "12px",
            borderRadius: "8px",
          }}
        />

        <Area
          type="monotone"
          dataKey="views"
          stroke="#ec4899"
          strokeWidth={2}
          fill="url(#profileViewsGradient)"
          dot={{
            fill: "#ec4899",
            r: 3,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}