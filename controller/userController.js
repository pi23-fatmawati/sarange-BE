const { User } = require("../models");
const { generateToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const multer = require("multer");
const path = require("path");

const saltRounds = 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images"); // Specify the folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Specify the file name
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload ");
  },
}).single("image");

async function getUserProfile(userId) {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user profile");
  }
}

module.exports = {
  async register(req, res) {
    try {
      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Data sudah ada di database" });
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      const token = generateToken({
        userId: newUser.id_user,
        email: newUser.email,
      });
      res.status(201).json({ token, user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken({
          userId: user.id_user,
          email: user.email,
        });
        res.status(200).json({ message: "Berhasil Login", token, user });
      } else {
        res.status(401).json({ error: "Email atau password salah" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async homepage(req, res) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = req.user.userId;
      const userProfile = await getUserProfile(userId);

      if (!userProfile) {
        return res.status(404).json({ error: "User not found" });
      }

      const filteredProfile = {
        user_name: userProfile.user_name,
        coin_user: userProfile.coin_user,
      };

      res.status(200).json({ user: filteredProfile });
    } catch (error) {
      console.error("Error in profile route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async profile(req, res) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = req.user.userId;
      const userProfile = await getUserProfile(userId);

      if (!userProfile) {
        return res.status(404).json({ error: "User not found" });
      }
      // Constructing full URL for profile picture
      let profilePicUrl = null;
      if (userProfile.profile_pic) {
        profilePicUrl = `https://final-sarange-eff62c954ab5.herokuapp.com/Images/${userProfile.profile_pic}`;
      }

      const filteredProfile = {
        user_name: userProfile.user_name,
        email: userProfile.email,
        phone_number: userProfile.phone_number,
        address: userProfile.address,
        profile_pic: profilePicUrl,
      };

      res.status(200).json({ user: filteredProfile });
    } catch (error) {
      console.error("Error in profile route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateProfileWithImage(req, res) {
    try {
      const { user } = req;
      if (!user || !user.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { userId } = user;
      const userProfile = await getUserProfile(userId);

      if (!userProfile) {
        return res.status(404).json({ error: "User not found" });
      }

      // Use the 'upload' middleware to handle the image upload
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err });
        }

        if (req.file) {
          userProfile.profile_pic = req.file.filename;
        }

        ["user_name", "phone_number", "address"].forEach((attr) => {
          if (req.body[attr]) {
            userProfile[attr] = req.body[attr];
          }
        });

        await userProfile.save();
        const filteredProfile = {
          user_name: userProfile.user_name,
          email: userProfile.email,
          phone_number: userProfile.phone_number,
          address: userProfile.address,
          profile_pic: userProfile.profile_pic,
        };

        res.status(200).json({
          message: "Profile updated successfully",
          user: filteredProfile,
        });
      });
    } catch (error) {
      console.error("Error in updateProfileWithImage route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
