const { User } = require("../models");

module.exports = {
  async register(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email, password } });
      if (user) {
        res.status(200).json({ message: "Berhasil Login" });
      } else {
        res.status(401).json({ error: "Email atau password salah" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
