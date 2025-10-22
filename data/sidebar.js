// src/data/sidebarData.js
const sidebarData = [
  {
    title: "Tổng quan",
    items: [
      {
        label: "Trang chủ",
        href: "/home",
        icon: "/assets/admin-icons/home.png",
        roles: [
          "SUPER_ADMIN",
          "HR_MANAGER",
          "CUSTOMER_MANAGER",
          "STORE_MANAGER",
          "SYSTEM_MANAGER",
          "SHIPPER_MANAGER",
          "CHIEF_MANAGER",
        ],
      },
    ],
  },
  {
    title: "Quản lý của hàng",
    items: [
      {
        label: "Duyệt yêu cầu",
        href: "/store/request",
        icon: "/assets/admin-icons/store.png",
        roles: ["SUPER_ADMIN", "STORE_MANAGER", "CHIEF_MANAGER"],
      },
      {
        label: "Cửa hàng hoạt động",
        href: "/store/management/active",
        icon: "/assets/admin-icons/restaurant.png",
        roles: ["SUPER_ADMIN", "STORE_MANAGER", "CHIEF_MANAGER"],
      },
      {
        label: "Cửa hàng bị khóa",
        href: "/store/management/block",
        icon: "/assets/admin-icons/homeless.png",
        roles: ["SUPER_ADMIN", "STORE_MANAGER", "CHIEF_MANAGER"],
      },
    ],
  },
  {
    title: "Quản lý Shippers",
    items: [
      {
        label: "Duyệt yêu cầu",
        href: "/shipper/request",
        icon: "/assets/admin-icons/interview.png",
        roles: ["SUPER_ADMIN", "SHIPPER_MANAGER", "CHIEF_MANAGER"],
      },
      {
        label: "Shippers",
        href: "/shipper/management",
        icon: "/assets/admin-icons/fast-delivery.png",
        roles: ["SUPER_ADMIN", "SHIPPER_MANAGER", "CHIEF_MANAGER"],
      },
    ],
  },
  {
    title: "Quản lý Khách hàng",
    items: [
      {
        label: "Khách hàng",
        href: "/customer",
        icon: "/assets/admin-icons/review.png",
        roles: ["SUPER_ADMIN", "CUSTOMER_MANAGER"],
      },
    ],
  },
  {
    title: "Quản lý Nhân viên",
    items: [
      {
        label: "Nhân viên quản trị",
        href: "/admin",
        icon: "/assets/admin-icons/admin.png",
        roles: ["SUPER_ADMIN", "HR_MANAGER"],
      },
    ],
  },
  {
    title: "Thống kê",
    items: [
      {
        label: "Thống kê khách hàng",
        href: "/statistic/user",
        icon: "/assets/admin-icons/chart.png",
        roles: ["SUPER_ADMIN", "CHIEF_MANAGER"],
      },
      {
        label: "Thống kê Cửa hàng",
        href: "/statistic/store",
        icon: "/assets/admin-icons/pie-chart.png",
        roles: ["SUPER_ADMIN", "CHIEF_MANAGER"],
      },
      {
        label: "Thống kế shipper",
        href: "/statistic/shipper",
        icon: "/assets/admin-icons/monitor.png",
        roles: ["SUPER_ADMIN", "CHIEF_MANAGER"],
      },
    ],
  },
  {
    title: "Quản lý hệ thống",
    items: [
      {
        label: "Danh mục quán ăn",
        href: "/system-category",
        icon: "/assets/admin-icons/category.png",
        roles: ["SUPER_ADMIN", "SYSTEM_MANAGER"],
      },
      {
        label: "Phí vận chuyển",
        href: "/shipping-fee",
        icon: "/assets/admin-icons/shipping-fee.png",
        roles: ["SUPER_ADMIN", "SYSTEM_MANAGER"],
      },
    ],
  },
];

export default sidebarData;
