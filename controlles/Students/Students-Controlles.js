const path = require("path");
const fs = require("fs");
const Lec = require("../../models/lectures");
const Student = require("../../models/students");

exports.addNewStudent = async (req, res, next) => {
  try {
    const { name, age, city, fatherNumber, phone, addres } = req.body;

    const student = new Student({
      name,
      age,
      signupDate: new Date(),
      city,
      fatherNumber,
      phone,
      addres,
    });
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.activeStudent = async (req, res, next) => {
  try {
    // 1- set single user unactive
    const studentId = req.body.studentId;
    if (studentId) {
      const user = await Student.findOne({ _id: studentId });
      user.active = !user.active;
      await user.save();
      res
        .status(200)
        .json({ user, msg: `you have made the user ${user.active}` });
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.activeAllStudent = async (req, res, next) => {
  try {
    // 1- set single user unactive
    const students = req.body.students;
    if (students) {
      const users = await Student.updateMany(
        { _id: { $in: students } },
        { $set: { active: false } }
      );
      res.status(200).json({ users, msg: `you have made the users unactive` });
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.deleteUnactiveStudent = async (req, res, next) => {
  try {
    // 1- set single user unactive
    const students = req.body.students;
    if (students) {
      const users = await Student.deleteMany({
        _id: { $in: students },
        active: false,
      });
      res
        .status(200)
        .json({ users, msg: `you havedeleted the users unactive` });
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.updateProfile = async (req, res, next) => {
  const { _id, name, email, city, phone, fatherNumber, addres } = req.body;
  try {
    const user = await Student.findOneAndUpdate(
      { _id },
      { name, email, city, phone, fatherNumber, addres },
      { new: true }
    );
    return res.status(200).json({ user, msg: "you have edited your profile" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.deleteStudent = async (req, res, next) => {
  try {
    // 1- set single user unactive
    const studentId = req.body.id;
    if (students) {
      const user = await Student.findOneAndRemove({ _id: studentId });
      res.status(200).json({ user, msg: `you have deleted the user` });
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.getStudentData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await Student.findOne({ _id: "60480ff0d16ae939082dae76" })
      .populate({
        path: "exams.exameModel.questions.QuestionId",
        select: "question  answers groupAnswer rightAnswer",
        model: "Questions",
      })
      .exec();
    res.status(200).json({ student });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
exports.fetchStudent = async (req, res, next) => {
  try {
    const students = await Student.find({}).lean();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getAbsentStudent = async (req, res, next) => {
  // 1- get the last 3 lectures
  try {
    const count = await Lec.find({}).lean().count();
    const lastThree = await Lec.find({}, { _id: 1 }).skip(count - 3);
    let edit = lastThree.map((i) => {
      return i._id;
    });
    // const lastThree = await Lec.find({})
    const student = await Student.find({
      "lectures.lectureId": { $nin: edit },
    });
    res.status(200).json({ student });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
