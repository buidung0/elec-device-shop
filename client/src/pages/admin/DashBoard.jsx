import React, { useState, useEffect, useRef } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  Cell,
  Pie,
  ResponsiveContainer,
  PieChart,
} from "recharts";
import {
  apiGetBlog,
  apiGetOrder,
  apiGetProduct,
  apiGetService,
  apiGetUsers,
} from "../../apis";
import { formatMoney } from "../../utils/helper";
import { IoCashOutline } from "react-icons/io5";
import { IoMdReorder } from "react-icons/io";
import { HiEye } from "react-icons/hi";
import { MdMessage } from "react-icons/md";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const Dashboard = () => {
  const [orders, setOrders] = useState();
  const [users, setUsers] = useState();
  const [blogs, setBlogs] = useState();
  const [services, setServices] = useState();
  const [products, setProducts] = useState();

  const fetchData = async () => {
    const order = await apiGetOrder();
    if (order.success) setOrders(order.orders);
    const user = await apiGetUsers();
    if (user.success) setUsers(user.users);
    const blog = await apiGetBlog();
    if (blog.success) setBlogs(blog.Blog);
    const service = await apiGetService();
    if (service.success) setServices(service.rs);
    const product = await apiGetProduct({ limit: 40, sort: "createdAt" });
    if (product.success) setProducts(product.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPrices = orders?.map((order) => {
    const orderTotal = order?.products?.reduce((total, product) => {
      return total + Number(product.price) * Number(product.quantity);
    }, 0);
    return orderTotal;
  });

  const grandTotal = totalPrices?.reduce(
    (sum, totalPrice) => sum + totalPrice,
    0
  );
  const totalNumberViews = blogs?.reduce(
    (total, article) => total + article.numberView,
    0
  );

  const data = orders?.map((order) => {
    const name = `${order.orderBy.lastname}`;
    const countProduct = order.products.length;
    const totalPrice = order.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    return { name, countProduct, totalPrice };
  });

  const topProducts = products
    ?.sort((a, b) => b.productView - a.productView)
    .slice(0, 10);
  const dataView = topProducts?.map((product) => ({
    name: product.title,
    value: product.productView,
  }));
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    x,
    y,
    cx,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x1 = cx + radius * Math.cos(-midAngle * RADIAN);
    // const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="red"
        textAnchor={x1 > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {name} {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const size = {
    width: 400,
    height: 200,
  };
  // console.log(orders)

  return (
    <div className="p-4">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b ">
        <span>DashBoard</span>
      </h1>
      <div className="h-[20px]"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-teal-100 rounded-xl shadow-md">
        <div className="bg-white rounded-lg flex items-center justify-around shadow-md ">
          <div className="flex items-center gap-4">
            <IoCashOutline size={30} className="text-green-500 mr-2" />
            <div>
              <p className="text-lg font-semibold">Total Revenue</p>
              <p className="text-gray-600 font-bold">
                {formatMoney(grandTotal)} VND
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 flex items-center justify-around shadow-md ">
          <div className="flex items-center gap-4">
            <IoMdReorder size={30} className="text-blue-500 mr-2" />
            <div>
              <p className="text-lg font-semibold">Orders</p>
              <p className="text-gray-600 font-bold">{orders?.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 flex items-center justify-around shadow-md">
          <div className="flex items-center gap-4">
            <HiEye size={30} className="text-purple-500 mr-2" />
            <div>
              <p className="text-lg font-semibold">Views BLog</p>
              <p className="text-gray-600 font-bold">{totalNumberViews}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 flex items-center justify-around shadow-md">
          <div className="flex items-center gap-4">
            <MdMessage size={30} className="text-yellow-500 mr-2" />
            <div>
              <p className="text-lg font-semibold">New Services</p>
              <p className="text-gray-600 font-bold">{services?.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[20px]"></div>
      <div className="grid grid-cols-10 gap-8 py-4 ">
        <div className="shadow-md flex items-center justify-center col-span-5 rounded-lg bg-teal-50">
          <BarChart width={700} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              className="flex items-center justify-center"
            />
            <YAxis width={100} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="name"
              fill="#8884d8"
              className="flec items-center justify-center"
            />
            <Bar
              dataKey="totalPrice"
              fill="#82ca9d"
              className="flex items-center justify-center"
            />
          </BarChart>
        </div>
        <div className="flex col-span-5 items-center justify-center shadow-lg bg-teal-50">
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie
                data={dataView}
                fill="#8884d8"
                label={renderCustomizedLabel}
                nameKey="name"
              >
                {dataView?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
