const path = require("path");
const Questions = require("../../models/questions");
const clody = require("../cloud");
const imguploader = require("./uploader")
const algoliasearch = require("algoliasearch");
const client = algoliasearch("5AX3QTWUTZ", "51ba31f56313488518c91d7571cddcde");
const index = client.initIndex("facebook");
// ______________________________________

exports.createQuestions = async (req, res, next) => {
  let data = JSON.parse(req.body.data);
  const { question, duration, chapter, fullMarks, lesson ,answers} = data;
  // const answers = data.answers;
  const files = req.files;
  let sharedFunction = async (answers,questionImg)=>{
    const newExame = new Questions({
      question,
      lesson,
      image: questionImg || null,
      answers,
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
  try {
    if (files) {
      let testing =await imguploader.uploadQuestionsImgs(files)
      let answersData = [
        { a: answers.a.a, correct: answers.a.correct, img: testing.imga || null },
        { a: answers.b.a, correct: answers.b.correct, img: testing.imgb || null },
        { a: answers.c.a, correct: answers.c.correct, img: testing.imgc || null },
        { a: answers.d.a, correct: answers.d.correct, img: testing.imgd || null },
      ]
      sharedFunction(answersData,questionImg)
      
    } else {
      let answersData =[
        { a: answers.a.a, correct: answers.a.correct },
        { a: answers.b.a, correct: answers.b.correct },
        { a: answers.c.a, correct: answers.c.correct },
        { a: answers.d.a, correct: answers.d.correct },
      ]
      sharedFunction(answersData,null)
    
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.updateQuestions = async (req, res, next) => {
  try {
    let data = JSON.parse(req.body.data);
    let { question, duration, chapter, _id, fullMarks, lesson ,answers} = data;
    // let answers = data.answers;
    // let sharedFunction = async ()=>{ }
    let files = req.files;
    if (files) {
      let testing =await imguploader.uploadQuestionsImgs(files)
      let questionedited = await Questions.findOneAndUpdate(
        { _id },
        {
          lesson,
          question,
          duration,
          image: testing.questionImg || data.image,
          chapter,
          fullMarks,
          updatedTime: new Date(),
          answers: [
            {
              a: answers.a.a,
              correct: answers.a.correct,
              img: testing.imga || answers.a.img,
            },
            {
              a: answers.b.a,
              correct: answers.b.correct,
              img: testing.imgb || answers.b.img,
            },
            {
              a: answers.c.a,
              correct: answers.c.correct,
              img: testing.imgc || answers.c.img,
            },
            {
              a: answers.d.a,
              correct: answers.d.correct,
              img: testing.imgd || answers.d.img,
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
      res.status(200).json({ afterEdit, msg: "you have edit is succefully" });
    } else {
      let questionedited = await Questions.findOneAndUpdate(
        { _id },
        {
          lesson,
          question,
          duration,
          image: data.image,
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

      res.status(200).json({ afterEdit, msg: "you have edit is succefully" });
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

