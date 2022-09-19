import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {REDIRECT_URI, REST_API_KEY} from "./KaKaoLoginData";

const KakaoLogin = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const KAKAO_CODE = location.search.split('=')[1];

    //토큰 저장
    const getKakaoToken = () => {
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        })
        .then(res => res.json())
        .then(data => {
            if (data.access_token) {
                console.log(data.access_token);
                localStorage.setItem('token', data.access_token);
            } else {
                navigate('/');
                console.log("check token");

            }
        });
    };
    

    useEffect(() => {
        if (!location.search) return;
        getKakaoToken();
    }, [])

    return(
        <div>
            <div>KakaoLogin</div>
            <div>{KAKAO_CODE}</div>
        </div>
    )
}

export default KakaoLogin;