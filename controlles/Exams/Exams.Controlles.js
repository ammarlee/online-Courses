const path = require("path");
const fs = require("fs");
const Questions = require("../../models/questions");

const Exams = require("../../models/exams");
const Student = require("../../models/students");
const algoliasearch = require("algoliasearch");
const client = algoliasearch("5AX3QTWUTZ", "51ba31f56313488518c91d7571cddcde");

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
      res.status(200).json({ exam: s });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
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
  }
  exports.getAllExams = async (req, res, next) => {
    try {
      const exams = await Exams.find({}).lean();
      res.status(200).json({ exams });
    } catch (error) {
      res.status(400).json(error);
    }
  }
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
  exports.correctExame = async (req, res, next) => {
    const { exameId, questions, studentId } = req.body;
    try {
      const exame = await Exams.findOne({ _id: exameId }).populate({
        path: "questions.QuestionId",
        select: "question  answers groupAnswer rightAnswer",
        model: "Questions",
      });
      let che = exame.questions.map((one) => {
        return {
          questionId: one._id,
          correctOne: one.QuestionId.rightAnswer,
          comment: one.QuestionId.answers.filter((i) => i.correct == true),
        };
      });
      let result = 0;
      let correctQuestions = [];
      let errorQuestions = [];
      questions.forEach((one, index) => {
        if (che[index].questionId == one._id) {
          if (che[index].correctOne == one.QuestionId.groupAnswer) {
            result++;
            correctQuestions.push(one.QuestionId);
          } else {
            errorQuestions.push({
              ...one.QuestionId,
              le: che[index].comment[0].a,
            });
          }
        }
      });
      // add the exame model to the student
      const student = await Student.findByIdAndUpdate(
        { _id: studentId },
        {
          $push: {
            exams: { date: new Date().toISOString(), result, exameModel: exame },
          },
        },
        { new: true }
      );
  
      res
        .status(200)
        .json({
          result: `${result}`,
          fullMarks: che.length,
          correctQuestions,
          errorQuestions,
        });
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
      const getChapterQuestions = await Questions.aggregate([
        { $match: { chapter: chapter } },
        { $group: { _id: "$_id" } },
        { $sample: { size: 20 } },
      ]);
      console.log(getChapterQuestions);
      // console.log(new Set(getChapterQuestions));
      if (getChapterQuestions.length == 0) {
        return res
          .status(201)
          .json({ msg: "there are not a exams for that chapter" });
      }
  
      let editQuestion = getChapterQuestions.map((item) => {
        return { QuestionId: item._id };
      });
      console.log(editQuestion);
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
  
