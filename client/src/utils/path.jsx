const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS__CATEGORY: ":category",
  BLOGS: "blogs",
  DETAIL_BLOG: "/detailblog/:category/:bid/:title",
  OUR_SERVICES: "services",
  FAQs: "faqs",
  DETAIL_PRODUCT_CATEGORY_PID_TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",
  DETAIL_CART: "my-cart",
  CHECK_OUT: "checkoutcart",
  PRODUCTS: "products",
  CART_CHECKOUT: "cart-checkout",

  //Admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_ORDER: "manage-order",
  MANAGE_BLOG: "manage-blog",
  MANAGE_SERVICES: "manage-services",
  CREATE_PRODUCTS: "create-product",
  CREATE_BLOG: "create-blog",

  //Member
  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  HISTORY: "buy-history",
  WISH_LIST: "wish-list",
};

export default path;
