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
const algoliasearch = require("algoliasearch");
const client = algoliasearch("5AX3QTWUTZ", "51ba31f56313488518c91d7571cddcde");

const index = client.initIndex("facebook");
const PDFDocument = require("pdfkit");
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
exports.createSerial = async (req, res, next) => {
  try {
    console.log(req.connection);
    const idnew = crypto.randomBytes(13).toString("hex");

    console.log(idnew);
    const serialNumber = idnew;
    const CardId = (Math.random() * 1600).toString().split(".")[1];
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
