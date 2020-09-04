// 백엔드 서버의 시작점
// 이 프로젝트는 express 프레임워크를 사용한다.
// package.json에 등록한 스크립트 명령어인 start를 통해 바로 node index.js 명령어를 실행하여 app을 실행할 수 있다.

/* express 모듈을 가져와서 express 앱을 만든다. */
// port 번호 설정
const express = require("express");
const app = express();
const port = 3000;

/* mongoose를 가져와서 mongoDB uri로 연결한 후 각종 설정을 받는 객체를 두번째 인자로 받아서 설정을 완료한다. 이후 then을 이용한 프로미스를 통해 잘 연결된 경우 콘솔에 메시지를 출력하고 에러 발생시 이를 잡아 콘솔에 출력한다. */
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sihan827:reebok8442@practicecluster.2aq9s.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

/* get 메소드는 첫 번째 인자로 path 경로를 받고  두 번째 인자로 request(요청)와 response(응답)을 인자로 받는 함수를 받는다. 해당 함수에서 현재는 response의 send 메소드를 통해 response로  "hello world"를 보내도록 하고 있다. */
app.get("/", (req, res) => res.send("hello world!"));

/* listen 메소드는 첫 번째 인자로 포트 번호를 받고 두 번째 인자로 콜백함수를 받아 app을 실행시킨다. */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
