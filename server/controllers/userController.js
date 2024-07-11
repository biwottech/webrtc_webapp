const express = require("express");
const { User } = require("../models/index");
const { webTokens } = require("../utils/webtoken");
const { where } = require("sequelize");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "Users  ", users: users });
  } catch (error) {
    res.status(500).json({ message: "Error occured", error: error });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(parseInt(req.params.id));
    res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured", error: error });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    res.status(200).json({ message: "User created successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured", error: error });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { id } = req.params;
    const user = await User.update(
      {
        username: username,
        email: email,
        password: password,
      },
      {
        where: {
          id: parseInt(id, 10),
        },
      }
    );
    res.status(200).json({ message: "Update", user: user, id: id });
  } catch (error) {
    res.status(500).json({ message: "Error occured", error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(parseInt(req.params.id));
    if (user) {
      await user.destroy();
      res.status(204).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User could not be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occured", error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.scope("withPassword").findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User could not be found" });
    }

    const isValidPassword = await user.validPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      data: user,
      token: webTokens(user),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occured", error: error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
