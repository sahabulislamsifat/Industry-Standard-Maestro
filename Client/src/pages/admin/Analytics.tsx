import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, MapPin, BarChart3, DollarSign } from "lucide-react";
import {
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
  useGetTourStatsQuery,
  useGetUserStatsQuery,
} from "@/redux/features/stats/stats.api";
// Colors
const barColors = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc"];
const pieColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

// Months array
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface RevenueItem {
  month: string;
  revenue: number;
}

interface BookingItem {
  month: string;
  bookings: number;
}

interface TourType {
  name: string;
  value: number;
  [key: string]: string | number;
}

const Analytics = () => {
  const { data: usersData, isLoading: usersLoading } = useGetUserStatsQuery();
  const { data: toursData, isLoading: toursLoading } = useGetTourStatsQuery();
  const { data: bookingsDataRaw, isLoading: bookingsLoading } =
    useGetBookingStatsQuery();
  const { data: revenueDataRaw, isLoading: revenueLoading } =
    useGetPaymentStatsQuery();

  const isAnyLoading =
    usersLoading || toursLoading || bookingsLoading || revenueLoading;

  if (isAnyLoading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading analytics data...
      </p>
    );

  // Totals
  const totalUsers = usersData?.totalUsers ?? 0;
  const totalTours = toursData?.totalTour ?? 0;
  const totalBookings = bookingsDataRaw?.totalBooking ?? 0;
  const totalRevenue = revenueDataRaw?.totalRevenue ?? 0;

  // Month-wise bookings chart
  const bookingsData: BookingItem[] = (
    bookingsDataRaw?.bookingsData || Array(12).fill({ count: 0 })
  ).map((b: any, i: number) => ({
    month: months[i] ?? `Month ${i + 1}`,
    bookings: b.count ?? 0,
  }));

  // Month-wise revenue chart
  const revenueArray: RevenueItem[] = revenueDataRaw?.revenueData?.map(
    (r: any, i: number) => ({
      month: months[i] ?? `Month ${i + 1}`,
      revenue: r.total ?? 0,
    })
  ) ?? [{ month: "Total", revenue: totalRevenue }];

  // Tours by type
  const toursTypes: TourType[] = Array.isArray(toursData?.totalTourByTourType)
    ? toursData.totalTourByTourType.map((t: any) => ({
        name: t._id ?? "Unknown",
        value: t.count ?? 0,
      }))
    : [
        { name: "Adventure", value: 0 },
        { name: "City", value: 0 },
        { name: "Beach", value: 0 },
      ];

  // Dark/light mode
  const isDark = document.documentElement.classList.contains("dark");
  const axisColor = isDark ? "#9ca3af" : "#374151";
  const tooltipBg = isDark ? "#1f2937" : "#f9fafb";
  const tooltipColor = isDark ? "#f9fafb" : "#111827";
  const cardBg = isDark ? "bg-[#111]" : "bg-white";
  const cardBorder = isDark ? "border-gray-700" : "border-gray-200";
  const textPrimary = isDark ? "text-gray-100" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div className="px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Admin Analytics</h1>
        <p className={`text-sm ${textSecondary}`}>
          Overview of users, tours, bookings, and revenue
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Users size={28} />,
            bg: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
            title: "Total Users",
            value: totalUsers,
          },
          {
            icon: <MapPin size={28} />,
            bg: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
            title: "Total Tours",
            value: totalTours,
          },
          {
            icon: <BarChart3 size={28} />,
            bg: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
            title: "Total Bookings",
            value: totalBookings,
          },
          {
            icon: <DollarSign size={28} />,
            bg: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
            title: "Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`p-6 ${cardBg} border ${cardBorder} flex items-center gap-4 rounded shadow`}
          >
            <div className={`p-3 rounded-full ${card.bg}`}>{card.icon}</div>
            <div>
              <h3 className={`text-sm ${textSecondary}`}>{card.title}</h3>
              <p className={`text-2xl font-bold ${textPrimary}`}>
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Line Chart */}
        <div className={`p-6 ${cardBg} border ${cardBorder} rounded shadow`}>
          <h2 className={`text-xl font-semibold mb-4 ${textPrimary}`}>
            Bookings Trend
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={bookingsData}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#e5e7eb"}
                />
                <XAxis dataKey="month" stroke={axisColor} />
                <YAxis stroke={axisColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    color: tooltipColor,
                    borderRadius: 4,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tours Pie Chart */}
        <div className={`p-6 ${cardBg} border ${cardBorder} rounded shadow`}>
          <h2 className={`text-xl font-semibold mb-4 ${textPrimary}`}>
            Tours Distribution
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={toursTypes}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={4}
                  label={{ fill: axisColor }}
                >
                  {toursTypes.map((_, idx) => (
                    <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    color: tooltipColor,
                    borderRadius: 4,
                  }}
                  formatter={(val) => val}
                />
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ color: axisColor }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Bar Chart */}
      <div className={`p-6 ${cardBg} border ${cardBorder} rounded shadow`}>
        <h2 className={`text-xl font-semibold mb-4 ${textPrimary}`}>
          Revenue Growth
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueArray}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              barGap={12}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis dataKey="month" stroke={axisColor} />
              <YAxis
                stroke={axisColor}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  color: tooltipColor,
                  borderRadius: 4,
                }}
                formatter={(v: number) => `$${v.toLocaleString()}`}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]} barSize={30}>
                {revenueArray.map((_, idx) => (
                  <Cell key={idx} fill={barColors[idx % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
