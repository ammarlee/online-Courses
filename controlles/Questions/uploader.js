const clody = require("../cloud");
const uploader = async (path) => await clody.uploadImg(path);
let questionImg, imga, imgb, imgc, imgd;
exports.uploadQuestionsImgs =async (files)=>{
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
      return {questionImg, imga, imgb, imgc, imgd}
}