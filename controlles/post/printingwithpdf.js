// const name = "exame_" + exameId + ".pdf";
    // var dir = path.join("./public");
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir);
    // }
    // const pathName = path.join(__dirname, "../", "../", dir, name);
    // // const pathName = path.join(
    // //   __dirname,
    // //   "../",
    // //   "../",
    // //   "front-end/",
    // //   dir,
    // //   name
    // // );
    // const pdfDoc = new PDFDocument();
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", 'inline;filename="' + name + '" ');

    // pdfDoc.pipe(fs.createWriteStream(pathName));
    // pdfDoc.pipe(res);
    // pdfDoc
    //   .fontSize(22)
    //   .fillColor("green")
    //   .text("exame  ", { align: "center", textIndent: true });
    // pdfDoc
    //   .fontSize(18)
    //   .text(`chapter :${s[0].exameModel[0].chapter} (result :${s[0].result})`, {
    //     align: "center",
    //     underline: true,
    //   });
    // // pdfDoc.fillColor('black').text(`_______________________`)

    // s[0].exameModel.forEach((item) => {
    //   item.questions.forEach((one, n) => {
    //     pdfDoc
    //       .fontSize(15)
    //       .fillColor("red")
    //       .text(` ${n}:${one.QuestionId.question}`);
    //     one.QuestionId.answers.forEach((two) => {
    //       pdfDoc
    //         .fontSize(12)
    //         .fillColor("blue")
    //         .list([`${two.a}`]);
    //     });
    //   });
    //   pdfDoc
    //     .fontSize(18)
    //     .fillColor("blue")
    //     .text(`results`, { align: "center", underline: true });
    //   item.questions.forEach((one, n) => {
    //     one.QuestionId.answers.filter((two) => {
    //       if (two.correct == true) {
    //         pdfDoc
    //           .fontSize(14)
    //           .fillColor("red")
    //           .text(`${n} >(${two.a})`, { underline: true });
    //       }
    //     });
    //   });
    // });
    // console.log(pathName);

    // clody.uploadPdf(pathName).then((result) => {
    //   const pdfFile = {
    //     pdfUrl: result.url,
    //     pdfId: result.id,
    //   };
    //   console.log("pdf results--", pdfFile.pdfUrl);
    // });
    // pdfDoc.end();