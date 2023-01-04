const express = require("express");
const path = require("path");
const logger = require("morgan");
const fs = require("fs");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/");
console.log(_path); // 현재 경로 확인

app.use("/", express.static(_path));
app.use(logger("tiny"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/dist/test", (req, res) => {
  const test = `
  <li><a href="/test?id=77">아이디 : 77</a></li>
      <li><a href="/test&name">이름 : 홍길동</a></li>`;
  res.send(test);
});

app.post("/info", function (req, res) {
  let name = req.body.name;
  let name2 = req.body.name2;
  let age = req.body.age;
  let que = req.body.que;

  fs.stat(_path + name + ".txt", (err, stats) => {
    console.log(stats ? "파일이존재합니다" : "파일이 없습니다");
    fs.writeFile(
      _path + name + ".txt",
      "이름: " + name2 + " 나이: " + age + " 문의사항: " + que,
      (e) => {
        if (e) throw e;
        res.send(`<script>alert("${name}.txt 파일 저장 완료!</script>`);
      }
    );
  });
});

app.listen(port, () => {
  console.log(port + " 로 연결되었습니다");
});
