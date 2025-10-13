// src/data/sidebarData.js
const sidebarData = [
  {
    title: "Tổng quan",
    items: [
      {
        label: "Trang chủ",
        href: "/home",
        icon: "/assets/admin-icons/home.png",
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
      },
      {
        label: "Cửa hàng hoạt động",
        href: "/store/management/active",
        icon: "/assets/admin-icons/restaurant.png",
      },
      {
        label: "Cửa hàng bị khóa",
        href: "/store/management/block",
        icon: "/assets/admin-icons/homeless.png",
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
      },
      {
        label: "Shippers",
        href: "/shipper/management",
        icon: "/assets/admin-icons/fast-delivery.png",
      },
    ],
  },
  {
    title: "Quản lý Khách hàng",
    items: [
      {
        label: "Khách hàng",
        href: "/customer/management",
        icon: "/assets/admin-icons/review.png",
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
      },
    ],
  },
  {
    title: "Thống kê",
    items: [
      {
        label: "Thống kê khách hàng",
        href: "/food-type",
        icon: "/assets/admin-icons/chart.png",
      },
      {
        label: "Thống kê Cửa hàng",
        href: "/food-type",
        icon: "/assets/admin-icons/pie-chart.png",
      },
      {
        label: "Thống kế shipper",
        href: "/food-type",
        icon: "/assets/admin-icons/monitor.png",
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
      },
      {
        label: "Quản lý Tags",
        href: "/system-category",
        icon: "/assets/admin-icons/tag.png",
      },
      {
        label: "Phí vận chuyển",
        href: "/shipping-fee",
        icon: "/assets/admin-icons/shipping-fee.png",
      },
    ],
  },
];

export default sidebarData;
