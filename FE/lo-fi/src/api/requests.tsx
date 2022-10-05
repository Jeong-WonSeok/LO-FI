const requests = {
  // 로그인
  login: "api/account/login",
  password: "api/acouunt/password",
  google: "api/account/google",
  kakao: "api/account/kakao",
  logout: "api/account/logout",

  // 회원가입
  signup: "api/register/singUp",
  userUpdate: "api/register/update",
  userDelete: "api/register/delete",
  chat: "api/register/chat",
  profile: "api/register/myPage",

  // 메인페이지(지도)
  lostItem: "api/main/article",
  animal: "api/main/animal",
  person: "api/main/person",
  takeItem: "api/main/found",

  // 검색페이지
  searchAnimal: "api/search/animal",
  searchLostItem: "api/search/article",
  searchPerson: "api/search/Person",
  searchTakeItem: "api/search/found",
  searchDetail: "api/search/"
}

export default requests;