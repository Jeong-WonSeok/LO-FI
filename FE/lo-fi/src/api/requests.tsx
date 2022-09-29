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
  profile: "api/register/myPage",

  // 메인페이지(지도)
  article: "api/main/article",
  animal: "api/main/animal",
  person: "api/main/person",
  found: "api/main/found",

  // 상세페이지
  detail: "api/detail",

  // 검색페이지
  searchDetail: "api/search/keyword",

  //등록페이지
  addAnimal: "api/register/missingAnimal",
  addPerson: "api/register/missingPerson",
  addArticle: "api/register/lostArticle",
  addFound: "api/register/foundArticle",
}

export default requests;