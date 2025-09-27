const Todo = require("../models/todo.model");

// Lấy danh sách Todo
exports.getTodos = async (req, res) => {
  try {
    const { page = 1, limit = 5, status, from, to } = req.query;
    const filter = {};

    // Lọc theo trạng thái (status)
    if (status) filter.status = status === "true";

    // Lọc theo khoảng thời gian tạo (createdAt)
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const todos = await Todo.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 }); // Mới nhất lên đầu

    const total = await Todo.countDocuments(filter);

    res.status(200).json({
      data: todos,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Tạo mới Todo
exports.createTodo = async (req, res) => {
  try {
    const { title, dueAt } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newTodo = new Todo({ title, dueAt });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật Todo
exports.updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xoá Todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Chúng ta thêm một endpoint mới /stats để đếm số công việc hoàn thành và chưa hoàn thành.
exports.getStats = async (req, res) => {
  try {
    const stats = await Todo.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Định dạng dữ liệu trả về
    const result = {
      completed: stats.find(s => s._id === true)?.count || 0,
      pending: stats.find(s => s._id === false)?.count || 0,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

