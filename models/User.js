// 유저 모델을 mongoose 스키마로 설계하는 파일이다.

/* mongoose를 불러온다 */
const mongoose = require("mongoose");

/* Schema 클래스를 생성자를 통해 유저 스키마를 생성한다. 생성자의 인자로 스키마에 들어갈 유저 정보의 형식 정보를 담은 객체를 받는다. */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // trim은 문자열 사이 공백을 없애준다.
    trim: true,
    // 이메일은 유일하므로 unique 속성을 사용한다.
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // role은 사용자에게 관리자나 일반 유저 등의 역할을 부여하기 위한 상태값이다.
  role: {
    type: Number,
    default: 0,
  },
  // 정보의 타입만 정해도 된다면 아래 형식도 허용한다.
  image: String,
  // token을 통해 유효성을 관리할 수 있다.
  token: {
    type: String,
  },
  // tokenExp는 token의 유효 기간을 정한다.
  tokenExp: {
    type: Number,
  },
});

/* 스키마를 모델로 감싸는 작업이다. model 메소드를 이용하며 첫번째 인자는 이름, 두번째 인자는 스키마를 받는다. */
const User = mongoose.model("User", userSchema);

/* 해당 모델을 외부에서 사용할 수 있도록 모듈화한다. */
module.exports = { User };
