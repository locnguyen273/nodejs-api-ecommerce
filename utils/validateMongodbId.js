const mongoose = require("mongoose");

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Id không có giá trị hoặc không tìm thấy");
};
module.exports = validateMongoDbId;
