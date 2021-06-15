const path = require("path");
const fs = require("fs");
const Questions = require("../../models/questions");

const crypto = require("crypto");
const Exams = require("../../models/exams");
const Ser = require("../../models/serials");
const Lec = require("../../models/lectures");
const Student = require("../../models/students");
const clody = require("../cloud");
const io = require("../../socket");
const PDFDocument = require("pdfkit");
const algoliasearch = require("algoliasearch");
const client = algoliasearch("5AX3QTWUTZ", "51ba31f56313488518c91d7571cddcde");
const index = client.initIndex("facebook");
const Moment = require("moment");
// ______________________________________
// FUNCTION FOR EDIT THE TIEME
function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
// _________________________________________________________

// create new exams and the results also
exports.createQuestions = async (req, res, next) => {
  let s = JSON.parse(req.body.data);
  const { question, duration, chapter, fullMarks, lesson } = s;
  const answers = s.answers;
  const files = req.files;
  console.log(files);
  try {
    if (files) {
      const uploader = async (path) => await clody.uploadImg(path);
      let questionImg, imga, imgb, imgc, imgd;

      if (files.question) {
        let path = files.question[0].path;
        const newpath = await uploader(path);
        questionImg = newpath.url;
      }

      if (files.answera) {
        let path = files.answera[0].path;
        const newpath = await uploader(path);
        imga = newpath.url;
      }
      if (files.answerb) {
        let path = files.answerb[0].path;
        const newpath = await uploader(path);
        imgb = newpath.url;
      }
      if (files.answerc) {
        let path = files.answerc[0].path;
        const newpath = await uploader(path);
        imgc = newpath.url;
      }
      if (files.answerd) {
        let path = files.answerd[0].path;
        const newpath = await uploader(path);
        imgd = newpath.url;
      }
      console.log(questionImg, imga, imgb, imgc, imgd);
      const newExame = new Questions({
        question,
        lesson,
        image: questionImg || null,
        answers: [
          { a: answers.a.a, correct: answers.a.correct, img: imga || null },
          { a: answers.b.a, correct: answers.b.correct, img: imgb || null },
          { a: answers.c.a, correct: answers.c.correct, img: imgc || null },
          { a: answers.d.a, correct: answers.d.correct, img: imgd || null },
        ],
        duration,
        chapter,
        fullMarks,
        time: Date.now(),
      });
      let findCorrectOne = newExame.answers.filter((i) => {
        return i.correct == true;
      });
      newExame.rightAnswer = findCorrectOne[0]._id;
      await newExame.save();
      res.status(200).json(newExame);
    } else {
      const newExame = new Questions({
        question,
        lesson,
        answers: [
          { a: answers.a.a, correct: answers.a.correct },
          { a: answers.b.a, correct: answers.b.correct },
          { a: answers.c.a, correct: answers.c.correct },
          { a: answers.d.a, correct: answers.d.correct },
        ],
        duration,
        chapter,
        fullMarks,
        time: Date.now(),
      });
      let findCorrectOne = newExame.answers.filter((i) => {
        return i.correct == true;
      });
      newExame.rightAnswer = findCorrectOne[0]._id;
      await newExame.save();
      res.status(200).json(newExame);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
exports.updateLectures = async (req, res, next) => {
  try {
    const lectures = await Lec.updateMany({
      img: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
    });
    res.status(200).json({ lectures });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
exports.notificationSeen = async (req, res, next) => {
  console.log(req.body);
  const userId = req.body.userId;
  const notificationId = req.body.item._id;

  try {
    let user = await Student.updateOne(
      { _id: userId, "notifications._id": notificationId },
      { $set: { "notifications.$.seen": true } },
      { new: true }
    );
    // console.log(user);
    if (user.nModified === 1) {
      res.status(200).json({ user, msg: "updated" });
    } else {
      console.log("not modified");
      res.status(201).json({ user, msg: "not updated" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
exports.updateQuestions = async (req, res, next) => {
  try {
    let s = JSON.parse(req.body.data);
    let { question, duration, chapter, _id, fullMarks, lesson } = s;
    let answers = s.answers;
    let files = req.files;
    console.log(s);
    console.log("//////////////");
    console.log(answers);
    if (files) {
      const uploader = async (path) => await clody.uploadImg(path);
      let questionImg, imga, imgb, imgc, imgd;

      if (files.question) {
        let path = files.question[0].path;
        const newpath = await uploader(path);
        questionImg = newpath.url;
      }

      if (files.answera) {
        let path = files.answera[0].path;
        const newpath = await uploader(path);
        imga = newpath.url;
      }
      if (files.answerb) {
        let path = files.answerb[0].path;
        const newpath = await uploader(path);
        imgb = newpath.url;
      }
      if (files.answerc) {
        let path = files.answerc[0].path;
        const newpath = await uploader(path);
        imgc = newpath.url;
      }
      if (files.answerd) {
        let path = files.answerd[0].path;
        const newpath = await uploader(path);
        imgd = newpath.url;
      }
      let questionedited = await Questions.findOneAndUpdate(
        { _id },
        {
          lesson,
          question,
          duration,
          image: questionImg || s.image,
          chapter,
          fullMarks,
          updatedTime: new Date(),
          answers: [
            {
              a: answers.a.a,
              correct: answers.a.correct,
              img: imga || answers.a.img,
            },
            {
              a: answers.b.a,
              correct: answers.b.correct,
              img: imgb || answers.b.img,
            },
            {
              a: answers.c.a,
              correct: answers.c.correct,
              img: imgc || answers.c.img,
            },
            {
              a: answers.d.a,
              correct: answers.d.correct,
              img: imgd || answers.d.img,
            },
          ],
        },
        { new: true, rawResult: true }
      );
      let findCorrectOne = questionedited.value.answers.filter((i) => {
        return i.correct == true;
      });

      let afterEdit = await Questions.findOneAndUpdate(
        { _id },
        { rightAnswer: findCorrectOne[0]._id },
        { new: true, rawResult: true }
      );

      // await newExame.save();
      res.status(200).json({ afterEdit, msg: "you have edit is succefully" });
    } else {
      let questionedited = await Questions.findOneAndUpdate(
        { _id },
        {
          lesson,
          question,
          duration,
          image: s.image,
          chapter,
          fullMarks,
          updatedTime: new Date(),
          answers: [
            {
              a: answers.a.a,
              correct: answers.a.correct,
              img: answers.a.img,
            },
            {
              a: answers.b.a,
              correct: answers.b.correct,
              img: answers.b.img,
            },
            {
              a: answers.c.a,
              correct: answers.c.correct,
              img: answers.c.img,
            },
            {
              a: answers.d.a,
              correct: answers.d.correct,
              img: answers.d.img,
            },
          ],
        },
        { new: true, rawResult: true }
      );
      let findCorrectOne = questionedited.value.answers.filter((i) => {
        return i.correct == true;
      });
      let afterEdit = await Questions.findOneAndUpdate(
        { _id },
        { rightAnswer: findCorrectOne[0]._id },
        { new: true, rawResult: true }
      );

      // await newExame.save();
      res.status(200).json({ afterEdit, msg: "you have edit is succefully" });
      res.status(200).json(newExame);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  const questionId = req.body.questionId;
  try {
    const quesdtion = await Questions.findOneAndDelete({ _id: questionId });
    res.status(200).json({ quesdtion });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Questions.find({}).lean();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
exports.correctExame = async (req, res, next) => {
  const { exameId, questions } = req.body;
  try {
    const exame = await Exams.findOne({ _id: exameId }).populate({
      path: "questions.QuestionId",
      select: "question  answers groupAnswer rightAnswer",
      model: "Questions",
    });
    console.log(exame.questions[0]);
    let che = exame.questions.map((one) => {
      return {
        questionId: one._id,
        correctOne: one.QuestionId.rightAnswer,
        comment: one.QuestionId.answers.filter((i) => i.correct == true),
      };
    });
    let result = 0;
    let corrQ = [];
    let errorQ = [];
    questions.forEach((one, index) => {
      if (che[index].questionId == one._id) {
        if (che[index].correctOne == one.QuestionId.groupAnswer) {
          result++;
          corrQ.push(one.QuestionId);
        } else {
          errorQ.push({ ...one.QuestionId, le: che[index].comment[0].a });
        }
      }
    });
    // add the exame model to the student
    const student = await Student.findByIdAndUpdate(
      { _id: "606addb663cfb021ac7375c2" },
      {
        $push: {
          exams: { date: new Date().toISOString(), result, exameModel: exame },
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ result: `${result}`, fullMarks: che.length, corrQ, errorQ });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
exports.createExam = async (req, res, next) => {
  try {
    const chapter = req.body.chapter;
    // 1- get random 9 questions then edit
    //  them and create exame with them then i
    // will return that exams to to student
    console.log(chapter);
    const getchapterQuestions = await Questions.aggregate([
      { $match: { chapter: chapter } },
      { $group: { _id: "$_id" } },
      { $sample: { size: 20 } },
    ]);
    // console.log(getchapterQuestions);
    // console.log(new Set(getchapterQuestions));

    let editQuestion = getchapterQuestions.map((item) => {
      return { QuestionId: item._id };
    });
    // 2- create the exam
    // const newExame = new Exams({ questions: editQuestion ,chapter})
    // await newExame.save();
    await Exams.updateOne(
      { chapter },
      { questions: editQuestion },
      { upsert: true }
    );
    //  3- return the exms to
    const exam = await Exams.find({ chapter })
      .populate({
        path: "questions.QuestionId",
        select: "question  answers groupAnswer image",
        model: "Questions",
      })
      .exec();

    res.status(200).json({ exam });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
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
exports.updateProfile=async (req, res, next) => {
  const {_id, name, email,  city, phone, fatherNumber,addres } = req.body
  try {
    const user = await Student.findOneAndUpdate(
      { _id},
      { name, email,  city, phone, fatherNumber,addres },
      { new: true }
    );
    return res
      .status(200)
      .json({ user, msg: "you have edited your profile" });
    
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
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
exports.createSerial = async (req, res, next) => {
  try {
console.log(req.connection);
const idnew = crypto.randomBytes(13).toString("hex");

console.log(idnew);
    const serialNumber =idnew
    const CardId = (Math.random() * 1600).toString().split('.')[1]
    const serial = new Ser({ serialNumber, CardId });

    await serial.save();
    res.status(200).json(serial);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getSerialDetails = async (req, res, next) => {
  let { serialId, cardId } = req.body;
  let serial;
  try {
    if (serialId) {
      serial = await Ser.findOne({ serialNumber: serialId })
        .populate([
          {
            path: "lectureDetails.studentId",
            model: "Students",
            select: "name age phone ",
          },
          {
            path: "lectureDetails.lectureId",
            model: "Lectures",
            select: "chapter lesson  ",
          },
        ])
        .exec();
    } else if (cardId) {
      serial = await Ser.findOne({ CardId: cardId })
        .populate([
          {
            path: "lectureDetails.studentId",
            model: "Students",
            select: "name age phone ",
          },
          {
            path: "lectureDetails.lectureId",
            model: "Lectures",
            select: "chapter lesson  ",
          },
        ])
        .exec();
    }
    if (serial == null) {
      return res.status(400).json({ msg: "your serial is wrong " });
    }
    res.status(200).json({ serial });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
exports.searchForDetails = async (req, res, next) => {
  try {
    let { userId, startDate, endDate } = req.body;
    //   const user = await Student.aggregate([
    //     { $match: { _id: userId } },
    //     { $unwind: { "$exams": 1 } },
    //     { $match: { "exams.date":{$gte:new Date(`${startDate}`),
    //   } } },
    //     { $project: { _id: 1, exams: 1 } }
    // ])
    // new Date(`${startDate}`)
    console.log(new Date(`${startDate}`).toISOString());
    console.log(new Date(`${endDate}`).toISOString());

    endDate = new Date(
      new Date(`${endDate}`).setHours(new Date(`${endDate}`).getHours() + 24)
    );

    const mongoose = require("mongoose");
    const user2 = await Student.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          items: {
            $filter: {
              input: "$exams",
              as: "item",
              cond: {
                $and: [
                  {
                    $gt: [
                      "$$item.date",
                      new Date(`${startDate}`).toISOString(),
                    ],
                  },
                  {
                    $lte: ["$$item.date", new Date(`${endDate}`).toISOString()],
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    console.log(user2);

    res.status(200).json({ user2 });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
exports.payLecture = async (req, res, next) => {
  const { serialNumber, studentId, lectureId } = req.body;
  const date = new Date();
  // const endTime = new Date(new Date().getTime() + 5 * 600000);
  const endTime = new Date(new Date().setMinutes(new Date().getMinutes() +1))
  try {
    // 1- check if the serialNumber is valid or not and
    const serial = await Ser.findOne({ serialNumber: serialNumber });
    if (serial.valid == true) {
      // 1- change the seria
      const serial = await Ser.findOneAndUpdate(
        { serialNumber: serialNumber },
        { valid: false, lectureDetails: { date, studentId, lectureId } },
        { new: true, rawResult: true }
      );
      console.log(serial.lastErrorObject.updatedExisting);

      //  2 - work with lecture
      const lecture = await Lec.findOneAndUpdate(
        { _id: lectureId },
        {$push: {
          StudentAttendance: {
              $each: [ {
                date,
                endTime,
                serialId: serial._id,
                studentId,
              }],
              $position: 0
          }
      }},
       
        { new: true, rawResult: true }
      );
      // 3- work with student
      const user = await Student.findOneAndUpdate(
        { _id: studentId },
        {$push: {
          lectures: {
              $each: [ { date, endTime, serialId: serial._id, lectureId }],
              $position: 0
          }
      }},
      
        { new: true, rawResult: true }
      );
      console.log(user.lastErrorObject.updatedExisting);
      if (
        serial.lastErrorObject.updatedExisting === false ||
        lecture.lastErrorObject.updatedExisting === false ||
        user.lastErrorObject.updatedExisting === false
      ) {
        return res.status(400).json({ msg: "your serial is wrong " });
      }
      res.status(200).json(serial, lecture, user);
    } else {
      res.status(400).json({ msg: "your serial is wrong " });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.createLecture = async (req, res, next) => {
  let s = JSON.parse(req.body.data);
  let { chapter, text, price, lesson, free, duration } = s;
  let files = req.files;
  let date = new Date();
  try {
    if (files.length > 0) {
      console.log("trye");

      const uploader = async (path) => await clody.uploadVedio(path);
      let urls = [];
      for (let file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath);
      }
      const vedioUrl = urls.map((p) => {
        return p.url;
      });
      let vedio = vedioUrl[0];
      lecture = new Lec({
        chapter,
        text,
        price,
        lesson,
        free,
        date,
        duration,
        vedio,
      });

      await lecture.save();

      let title = "new lecture has been added ";
      let seen = false;
      let lectureId = lecture._id;

      let user = await Student.updateMany(
        {},
        {
          $push: { notifications: { title, seen, date, lectureId } },
        },
        { upsert: true }
      );
      let userNotif = await Student.find(
        { _id: "606addb663cfb021ac7375c2" },
        { notifications: 1 }
      );
      let lastNotification =
        userNotif[0].notifications[userNotif[0].notifications.length - 1];
      io.getIO().emit("notification", {
        action: "create",
        lecture,
        lastNotification,
      });
      res.status(200).json(lecture);

      // }
      // const uploader = async (path) => await clody.uploads(path);
      // let urls = [];
      // for (let file of files) {
      //   const { path } = file;
      //   const newpath = await uploader(path);
      //   console.log(newpath);
      //   urls.push(newpath);
      // }
      // console.log(urls);
      // const images = urls.map((p) => {
      //   return p.url;
      // });
    } else {
      const lecture = new Lec({
        chapter,
        text,
        price,
        lesson,
        free,
        date,
        duration,
      });

      await lecture.save();

      let title = "new lecture has been added ";
      let seen = false;
      let lectureId = lecture._id;

      let user = await Student.updateMany(
        {},
        {
          $push: { notifications: { title, seen, date, lectureId } },
        },
        { upsert: true }
      );
      let userNotif = await Student.find(
        { _id: "606addb663cfb021ac7375c2" },
        { notifications: 1 }
      );
      let lastNotification =
        userNotif[0].notifications[userNotif[0].notifications.length - 1];
      io.getIO().emit("notification", {
        action: "create",
        lecture,
        lastNotification,
      });
      res.status(200).json(lecture);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
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
exports.getRandomQuestion = async (req, res, next) => {
  try {
    const q = await Questions.aggregate([
      { $project: { chapter: 1 } },
      { $sample: { size: 10 } },
    ]);

    res.status(200).json(q);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.getAllExams = async (req, res, next) => {
  try {
    const exams = await Exams.find({}).lean();
    res.status(200).json({ exams });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getAllLectures = async (req, res, next) => {
  try {
    const lectures = await Lec.find(
      {}
      // { text: 1, chapter: 1, duration: 1 ,free:1}
    ).lean();
    res.status(200).json({ lectures });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getDashboardData = async (req, res, next) => {
  try {
    //  1 - ALL LECTRURES
    const lectures = await Lec.find({}).count();
    //  2 - ALL activeStudents
    const activeStudents = await Student.find({ active: "true" }).count();
    //  3 - ALL unactiveeStudents
    const unactiveeStudents = await Student.find({ active: "false" }).count();
    //  4 - activeSerials
    const activeSerials = await Ser.find({ valid: "true" }).count();
    //  5 - unActiveSerials
    const unActiveSerials = await Ser.find({ valid: "false" }).count();

    res.status(200).json({
      lectures,
      activeStudents,
      unactiveeStudents,
      activeSerials,
      unActiveSerials,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.getSingleLecture = async (req, res, next) => {
  try {
    const { lectureId, userId } = req.body;
    const date = new Date();
    const endTime = new Date(new Date().getTime() + 30 * 60000);
    const lecture = await Lec.findOne({ _id: lectureId });
    if (lecture.free === false) {
      let findstudentPaid = lecture.StudentAttendance.filter((i) => {
        return i.studentId.toString() == userId.toString();
      });

      if (findstudentPaid.length > 0) {
        let StartingTime =
          new Date(findstudentPaid[0].endTime).getTime() - new Date().getTime();
        let remaind = Math.round(StartingTime);
        if (remaind <= 0) {
          res.status(402).json({ msg: "your time is over" });
        } else {
          let remainTime = msToTime(StartingTime); // "4:59"
          res.status(200).json({
            msg: "you still have remain time",
            remainTime,
            lecture,
            remaind: findstudentPaid[0].endTime,
          });
        }
      } else {
        console.log("you not sign for it before");
        res.status(402).json({ msg: "you not sign for it beffore" });
      }
    } else {
      console.log("its free lecture ");

      let findstudentPaid = lecture.StudentAttendance.filter((i) => {
        return i.studentId.toString() == userId.toString();
      });
      if (findstudentPaid.length > 0) {
        let StartingTime =
          new Date(findstudentPaid[0].endTime).getTime() - new Date().getTime();
        let remaind = Math.round(StartingTime);
        if (remaind <= 0) {
          res.status(402).json({ msg: "your time is over" });
        } else {
          let remainTime = msToTime(StartingTime); // "4:59"
          res.status(200).json({
            msg: "you still have remain time",
            remainTime,
            lecture,
            remaind: findstudentPaid[0].endTime,
          });
        }
      } else {
        console.log("noteeeeee ^^^^");
        const lecture = await Lec.findOneAndUpdate(
          { _id: lectureId },
          {
            $push: {
              StudentAttendance: {
                date,
                endTime,
                studentId: userId,
              },
            },
          },
          { new: true }
        );
        // 16693
        console.log();
        res.status(200).json({
          remaind: endTime,
          lecture,
          msg: "you have sign for it for first time ",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
exports.getleLectureDetails = async (req, res, next) => {
  try {
    const { lectureId } = req.body;
    const lecture = await Lec.findOne({ _id: lectureId })
    console.log(lecture);
        res.status(200).json({
          lecture,
        });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
exports.getRemainingTime = async (req, res, next) => {
  try {
    const { userId, lectureId } = req.body;
    const lecture = await Lec.findOne({ _id: lectureId });

    let findstudentPaid = lecture.StudentAttendance.find((i) => {
      return i.studentId.toString() == userId.toString();
    });

    let StartingTime =
      new Date(findstudentPaid.endTime).getTime() - new Date().getTime();
    let remaind = Math.round(StartingTime);
    if (remaind <= 0) {
      res.status(402).json({ msg: "your time is over" });
    } else {
      let remainTime = msToTime(StartingTime); // "4:59"
      res.status(200).json({
        msg: "you still have remain time",
        remainTime,
        lecture,
        remaind: findstudentPaid.endTime,
      });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};
exports.addExtraTime = async (req, res, next) => {
  try {
    const { lectureId, userId, time } = req.body;

    let currentDate = new Date();
    let aa = currentDate.setHours(currentDate.getHours() + +time);
    // let aa = currentDate.setMinutes(currentDate.getMinutes() + +time);
    console.log(req.body);
    let newDate = new Date(aa);
    const lecture = await Lec.findOneAndUpdate(
      { _id: lectureId, "StudentAttendance.studentId": userId },
      { $set: { "StudentAttendance.$.endTime": newDate } },
      { new: true, rawResult: true }
    );
    console.log(lecture.lastErrorObject.updatedExisting);
    if (lecture.lastErrorObject.updatedExisting) {
      res.status(200).json({
        msg: `you have added more ${time}h to the student `,
        lecture: lecture.value,
      });
    } else {
      res.status(400).json({ msg: "you have an error with your data " });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
exports.deleteLecture = async (req, res, next) => {
  try {
    const lecture = await Lec.findOneAndDelete({ _id: req.body.lectureId });
    res.status(200).json({ lecture, msg: "you have delete the lectures" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.editLecture = async (req, res, next) => {
  let s = JSON.parse(req.body.data);
  let { _id, chapter, text, price, lesson, free, duration } = s;
  const files = req.files;
  console.log(files);
  // if (files[0].mimetype === 'video/mp4' || files[0].mimetype === 'video/mp3') {
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>");
  // }else{
  //   console.log("############")

  // }
  try {
    if (files.length <= 0) {
      const lecture = await Lec.findOneAndUpdate(
        { _id },
        { chapter, lesson, text, free, duration },
        { new: true, rawResult: true }
      );
      console.log(lecture);
      res.status(200).json({ msg: "you have updated the lecture", lecture });
    } else {
      const uploader = async (path) => await clody.uploadVedio(path);
      let urls = [];
      for (let file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath);
      }
      const vedioUrl = urls.map((p) => {
        return p.url;
      });
      let vedio = vedioUrl[0];
      const lecture = await Lec.findOneAndUpdate(
        { _id },
        { chapter, lesson, vedio, text, free, duration },
        { new: true }
      );
      res.status(200).json({ msg: "you have updated the lecture", lecture });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.getExam = async (req, res, next) => {
  try {
    //  - 1 way with populate
    const exam = await Exams.find({ _id: "6048124dc10c1e32886468bb" })
      .populate({
        path: "questions.QuestionId",
        select: "questions.q",
        model: "Questions",
      })
      .exec();
    res.status(200).json(exam);
  } catch (error) {
    res.status(404).json(error);
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
    // console.log(student);
    res.status(200).json({ student });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.printToPdf = async (req, res, next) => {
  const { exameId, userId } = req.body;

  try {
    const user = await Student.findOne({ _id: userId }, { exams: 1 })
      .populate({
        path: "exams.exameModel.questions.QuestionId",
        select: "question  answers groupAnswer rightAnswer",
        model: "Questions",
      })
      .exec();
    let s = user.exams.filter((i) => {
      return i._id.toString() == exameId.toString();
    });
    const name = "exame_" + exameId + ".pdf";
    var dir = path.join("./public");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const pathName = path.join(__dirname, "../", "../", dir, name);
    // const pathName = path.join(
    //   __dirname,
    //   "../",
    //   "../",
    //   "front-end/",
    //   dir,
    //   name
    // );
    const pdfDoc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline;filename="' + name + '" ');

    pdfDoc.pipe(fs.createWriteStream(pathName));
    pdfDoc.pipe(res);
    pdfDoc
      .fontSize(22)
      .fillColor("green")
      .text("exame  ", { align: "center", textIndent: true });
    pdfDoc
      .fontSize(18)
      .text(`chapter :${s[0].exameModel[0].chapter} (result :${s[0].result})`, {
        align: "center",
        underline: true,
      });
    // pdfDoc.fillColor('black').text(`_______________________`)

    s[0].exameModel.forEach((item) => {
      item.questions.forEach((one, n) => {
        pdfDoc
          .fontSize(15)
          .fillColor("red")
          .text(` ${n}:${one.QuestionId.question}`);
        one.QuestionId.answers.forEach((two) => {
          pdfDoc
            .fontSize(12)
            .fillColor("blue")
            .list([`${two.a}`]);
        });
      });
      pdfDoc
        .fontSize(18)
        .fillColor("blue")
        .text(`results`, { align: "center", underline: true });
      item.questions.forEach((one, n) => {
        one.QuestionId.answers.filter((two) => {
          if (two.correct == true) {
            pdfDoc
              .fontSize(14)
              .fillColor("red")
              .text(`${n} >(${two.a})`, { underline: true });
          }
        });
      });
    });
    console.log(pathName);

    clody.uploadPdf(pathName).then((result) => {
      const pdfFile = {
        pdfUrl: result.url,
        pdfId: result.id,
      };
      console.log("pdf results--", pdfFile.pdfUrl);
    });
    pdfDoc.end();

    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
// -------------- =----------------------------
