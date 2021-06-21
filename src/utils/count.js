const MenuItem = require("../models/Menu-item");
const Customer = require("../models/Customer");
const Order = require("../models/Order");

const infoCount = async () => {
  const customerC = await Customer.countDocuments({});
  const menuC = await MenuItem.countDocuments({});
  const orderC = await Order.countDocuments({});
  return { customerC, menuC, orderC };
};

module.exports = infoCount;
