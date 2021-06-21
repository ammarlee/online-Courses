
const Ser = require("../../models/serials");
const Lec = require("../../models/lectures");
const Student = require("../../models/students");
const clody = require("../cloud");
const io = require("../../socket");

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

exports.payLecture = async (req, res, next) => {
  const { serialNumber, studentId, lectureId } = req.body;
  const date = new Date();
  // const endTime = new Date(new Date().getTime() + 5 * 600000);
  const endTime = new Date(new Date().setMinutes(new Date().getMinutes() + 1));
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
        {
          $push: {
            StudentAttendance: {
              $each: [
                {
                  date,
                  endTime,
                  serialId: serial._id,
                  studentId,
                },
              ],
              $position: 0,
            },
          },
        },

        { new: true, rawResult: true }
      );
      // 3- work with student
      const user = await Student.findOneAndUpdate(
        { _id: studentId },
        {
          $push: {
            lectures: {
              $each: [{ date, endTime, serialId: serial._id, lectureId }],
              $position: 0,
            },
          },
        },

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
  let data = JSON.parse(req.body.data);
  let { chapter, text, price, lesson, free, duration,userId } = data;
  let files = req.files;
  let date = new Date();
  console.log('files>>>>>>>>>>');
  console.log(files);
  
  let sharedFunction = async (data)=>{ 
    lecture = new Lec(data);
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
      { _id: userId},
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


  try {
    if (files.length > 0) {
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
      let createdLectureData = {
        chapter,
        text,
        price,
        lesson,
        free,
        date,
        duration,
        vedio,
      }
      sharedFunction(createdLectureData)
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
     let  createdLectureData = {
      chapter,
      text,
      price,
      lesson,
      free,
      date,
      duration,
    }
    sharedFunction(createdLectureData)

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

exports.getAllLectures = async (req, res, next) => {
  try {
    const lectures = await Lec.find({}).lean();
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
let isStudentInAttendece = (lecture, userId) => {
 return lecture.StudentAttendance.find((i) => {
    return i.studentId.toString() == userId.toString();
  });
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


exports.getSingleLecture = async (req, res, next) => {
  try {
    const { lectureId, userId } = req.body;
    const date = new Date();
    const endTime = new Date(new Date().getTime() + 30 * 60000);
    const lecture = await Lec.findOne({ _id: lectureId });
    let getLectureFinishedTime = (student) => {
 
      let StartingTime = new Date(student.endTime).getTime() - new Date().getTime();
      let remaind = Math.round(StartingTime);
      if (remaind <= 0) {
        res.status(402).json({ msg: "your time is over" });
      } else {
        let remainTime = msToTime(StartingTime); // "4:59"
        res.status(200).json({
          msg: "you still have remain time",
          remainTime,
          lecture,
          remaind: student.endTime,
        });
      
    }
    
    };
    let student = isStudentInAttendece(lecture, userId);
    console.log(student);
    

    if (lecture.free === false) {
      if (!student) {
        res.status(402).json({ msg: "you not sign for it beffore" });
      }
      getLectureFinishedTime(student);
    } else {
      if (student) {
        getLectureFinishedTime(student);
      } else {
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
    const lecture = await Lec.findOne({ _id: lectureId });
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
      // res.status(402).json({ msg: "your time is over" });
      res.status(402).send("your time is over!");
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
    res.status(402).send("Something broke!");
    // res.status(404).json({ error });
  }
};
exports.addExtraTime = async (req, res, next) => {
  try {
    const { lectureId, userId, time } = req.body;

    let currentDate = new Date();
    let countOfExtraTime = currentDate.setHours(currentDate.getHours() + +time);
    let newDate = new Date(countOfExtraTime);
    const lecture = await Lec.findOneAndUpdate(
      { _id: lectureId, "StudentAttendance.studentId": userId },
      { $set: { "StudentAttendance.$.endTime": newDate } },
      { new: true, rawResult: true }
    );
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


exports.printToPdf = async (req, res, next) => {
  const { exameId, userId } = req.body;
  console.log(exameId, userId);

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
    res.status(200).json({ exam: s });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
