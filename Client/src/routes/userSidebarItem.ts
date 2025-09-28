import MyBookings from "@/pages/user/MyBookings";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "My Bookings",
        url: "/user/bookings",
        component: MyBookings,
      },
    ],
  },
];
