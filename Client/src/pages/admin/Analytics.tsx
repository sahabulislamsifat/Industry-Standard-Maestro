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
import { useEffect } from "react";

// Colors
const barColors = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc"];
const pieColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

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

  // Debugging: useEffect for updated data
  // useEffect(() => {
  //   if (usersData) console.log("Users data updated:", usersData.totalUsers);
  //   if (toursData) console.log("Tours data updated:", toursData);
  //   if (bookingsDataRaw) console.log("Bookings data updated:", bookingsDataRaw);
  //   if (revenueDataRaw) console.log("Revenue data updated:", revenueDataRaw);
  // }, [usersData, toursData, bookingsDataRaw, revenueDataRaw]);

  const isAnyLoading =
    usersLoading || toursLoading || bookingsLoading || revenueLoading;

  if (isAnyLoading)
    return <p className="text-center mt-10">Loading analytics data...</p>;

  // Safe fallback for bookings
  const bookingsData: BookingItem[] =
    Array.isArray(bookingsDataRaw) && bookingsDataRaw.length > 0
      ? bookingsDataRaw
      : [
          { month: "Jan", bookings: 0 },
          { month: "Feb", bookings: 0 },
          { month: "Mar", bookings: 0 },
          { month: "Apr", bookings: 0 },
          { month: "May", bookings: 0 },
          { month: "Jun", bookings: 0 },
          { month: "Jly", bookings: 0 },
          { month: "Aug", bookings: 0 },
          { month: "Sep", bookings: 0 },
          { month: "Oct", bookings: 0 },
          { month: "Nov", bookings: 0 },
          { month: "Dec", bookings: 0 },
        ];

  // Safe fallback for revenue
  const revenueArray: RevenueItem[] =
    Array.isArray(revenueDataRaw) && revenueDataRaw.length > 0
      ? revenueDataRaw
      : [
          { month: "Jan", revenue: 0 },
          { month: "Feb", revenue: 0 },
          { month: "Mar", revenue: 0 },
          { month: "Apr", revenue: 0 },
          { month: "May", revenue: 0 },
          { month: "Jun", revenue: 0 },
          { month: "Jly", revenue: 0 },
          { month: "Aug", revenue: 0 },
          { month: "Sep", revenue: 0 },
          { month: "Oct", revenue: 0 },
          { month: "Nov", revenue: 0 },
          { month: "Dec", revenue: 0 },
        ];

  // Safe fallback for tour types
  const toursTypes: TourType[] =
    toursData?.types && toursData.types.length > 0
      ? toursData.types
      : [
          { name: "Adventure", value: 0 },
          { name: "City", value: 0 },
          { name: "Beach", value: 0 },
        ];

  // Totals calculation
  const totalRevenue = revenueArray.reduce(
    (sum, r) => sum + (r.revenue || 0),
    0
  );
  const totalBookings = bookingsData.reduce(
    (sum, b) => sum + (b.bookings || 0),
    0
  );
  const totalUsers = usersData?.totalUsers ?? 0;
  const totalTours = toursData?.totalTours ?? 0;

  // Dark/light mode for charts
  const isDark = document.documentElement.classList.contains("dark");
  const axisColor = isDark ? "#9ca3af" : "#374151";
  const tooltipBg = isDark ? "#1f2937" : "#f9fafb";
  const tooltipColor = isDark ? "#f9fafb" : "#111827";
  const cardBg = isDark ? "#09090B" : "bg-white";
  const cardBorder = isDark ? "border-gray-700" : "border-gray-100";
  const textPrimary = isDark ? "text-gray-100" : "text-gray-800";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div className="px-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Admin Analytics</h1>
        <p className={`${textSecondary}`}>
          Overview of tours, bookings, and revenue
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className={`p-6 ${cardBg} ${cardBorder} flex items-center gap-4`}>
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            <Users size={28} />
          </div>
          <div>
            <h3 className={`text-sm ${textSecondary}`}>Total Users</h3>
            <p className={`text-2xl font-bold ${textPrimary}`}>{totalUsers}</p>
          </div>
        </div>

        {/* Total Tours */}
        <div className={`p-6 ${cardBg} ${cardBorder} flex items-center gap-4`}>
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
            <MapPin size={28} />
          </div>
          <div>
            <h3 className={`text-sm ${textSecondary}`}>Total Tours</h3>
            <p className={`text-2xl font-bold ${textPrimary}`}>{totalTours}</p>
          </div>
        </div>

        {/* Total Bookings */}
        <div className={`p-6 ${cardBg} ${cardBorder} flex items-center gap-4`}>
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
            <BarChart3 size={28} />
          </div>
          <div>
            <h3 className={`text-sm ${textSecondary}`}>Total Bookings</h3>
            <p className={`text-2xl font-bold ${textPrimary}`}>
              {totalBookings}
            </p>
          </div>
        </div>

        {/* Revenue */}
        <div className={`p-6 ${cardBg} ${cardBorder} flex items-center gap-4`}>
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
            <DollarSign size={28} />
          </div>
          <div>
            <h3 className={`text-sm ${textSecondary}`}>Revenue</h3>
            <p className={`text-2xl font-bold ${textPrimary}`}>
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Line Chart */}
        <div className={`p-6 ${cardBg} ${cardBorder}`}>
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
                    borderRadius: 2,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tours Pie Chart */}
        <div className={`p-6 ${cardBg} ${cardBorder}`}>
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
                  {toursTypes.map((entry: TourType, index: number) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    color: tooltipColor,
                    borderRadius: 2,
                  }}
                  formatter={(value: number) => value}
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
      <div className={`p-6 ${cardBg} ${cardBorder}`}>
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
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  color: tooltipColor,
                  borderRadius: 2,
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]} barSize={30}>
                {revenueArray.map((entry: RevenueItem, index: number) => (
                  <Cell
                    key={index}
                    fill={barColors[index % barColors.length]}
                  />
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
