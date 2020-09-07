// 백엔드 서버의 시작점
// 이 프로젝트는 express 프레임워크를 사용한다.
// package.json에 등록한 스크립트 명령어인 start를 통해 바로 node index.js 명령어를 실행하여 app을 실행할 수 있다.

/* express 모듈을 가져와서 express 앱을 만든다. */
// port 번호 설정
const express = require("express");
const app = express();
const port = 3000;
// body-parser는 클라이언트에서 post방식으로 받은 데이터를 서버에서 읽어낼 수 있도록 parse한다.
const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

// application/x-www-form-urlencoded라는 데이터를 분석할 수 있도록 설정하는 것이다.
app.use(bodyParser.urlencoded({ extended: true }));

// json 형식을 가져올 수 있도록 설정한 것이다.
app.use(bodyParser.json());

/* mongoose를 가져와서 mongoDB uri로 연결한 후 각종 설정을 받는 객체를 두번째 인자로 받아서 설정을 완료한다. 이후 then을 이용한 프로미스를 통해 잘 연결된 경우 콘솔에 메시지를 출력하고 에러 발생시 이를 잡아 콘솔에 출력한다. */
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

/* get 메소드는 get 방식으로 데이터를 받으며 첫 번째 인자로 url path 경로를 받고  두 번째 인자로 request(요청)와 response(응답)을 인자로 받는 함수를 받는다. 해당 함수에서 현재는 response의 send 메소드를 통해 response로  "hello world"를 보내도록 하고 있다. (이런 식으로 라우트를 구현한다.) */
app.get("/", (req, res) => res.send("hello world!~"));

/* post 메소드는 post방식으로 데이터를 받으며 형식은 get 메소드와 유사하다. */
app.post("/register", (req, res) => {
  // 회원 가입 시 필요한 정보를 post방식으로 클라이언트에서 가져오면
  // 이를 데이터베이스에 넣는다.
  // User 모델을 사용한다.
  // body-parser를 통해 가져온 정보를 바탕으로 User 인스턴스를 생성한다.
  const user = new User(req.body);
  // save메소드는 mongoDB에서 제공하는 메소드로 해당 인스턴스를 모델로 저장을 한다. 콜백함수로 에러와 해당 정보를 인자로 가지는 익명함수를 받는다. 에러 발생시 respond에서 json형식으로 실패했음을 알리고 성공시 respond에서 status 메소드로 200(정상)임을 표시하고 json형식으로 성공했음을 알린다.
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    else res.status(200).json({ success: true });
  });
});

/* listen 메소드는 첫 번째 인자로 포트 번호를 받고 두 번째 인자로 콜백함수를 받아 app을 실행시킨다. */
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
