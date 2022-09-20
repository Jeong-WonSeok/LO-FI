import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="container">
      <div className="register">
        <span id="register_text">회원가입</span>
        <div className="login_id">
          <span className="text">E-mail</span>
          <input type="email" name="" id="" placeholder="Email" />
        </div>
        <button>이메일 인증</button>
        <div className="login_id">
          <span className="text">비밀번호</span>
          <input type="email" name="" id="" placeholder="비밀번호" />
        </div>
        <div className="login_id">
          <span className="text">비밀번호 확인</span>
          <input type="email" name="" id="" placeholder="비밀번호 확인" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
