package com.ssafy.lofi.service;

import com.ssafy.lofi.db.entity.LostArticle;
import com.ssafy.lofi.db.repository.LostArticleRepository;
import com.ssafy.lofi.dto.response.LostArticleDetailResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service("lostArticleService")
@RequiredArgsConstructor
public class LostArticleService {
    private final LostArticleRepository lostArticleRepository;

    public boolean getLostArticleList(int numOfRows, int pageNo, List<String> idList) throws IOException{
        String urlBuilder = "http://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccToClAreaPd" + "?" + URLEncoder.encode("serviceKey", "UTF-8") + "=z5aVcHaA2frLlaYTCzEF45A22OIUDm1rc1CcW54fwBAFwz%2F7VB3QHz2SWxUGa8aP3xbnVSAZkGrnIAwb%2FWc4OQ%3D%3D" + /*Service Key*/
                "&" + URLEncoder.encode("START_YMD", "UTF-8") + "=" + URLEncoder.encode("20220921", "UTF-8") + /*분실물 등록날짜*/
                "&" + URLEncoder.encode("END_YMD", "UTF-8") + "=" + URLEncoder.encode("20220922", "UTF-8") + /*분실물 등록날짜*/
                "&" + URLEncoder.encode("PRDT_CL_CD_01", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8") + /*상위물품코드*/
                "&" + URLEncoder.encode("PRDT_CL_CD_02", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8") + /*하위물품코드*/
                "&" + URLEncoder.encode("LST_LCT_CD", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8") + /*분실지역코드*/
                "&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(Integer.toString(pageNo), "UTF-8") + /*페이지 번호*/
                "&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(Integer.toString(numOfRows), "UTF-8"); /*목록 건수*/
        URL url = new URL(urlBuilder);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        org.json.JSONObject jsonObject = XML.toJSONObject(sb.toString());
        System.out.println(jsonObject.toString(0));

        // 분실물 리스트에서 id값만 꺼내기
        org.json.JSONObject response = jsonObject.getJSONObject("response");
        org.json.JSONObject body = response.getJSONObject("body");
        org.json.JSONObject items = body.getJSONObject("items");
        int totalCount = body.getInt("totalCount");
        if(totalCount - (pageNo - 1) * numOfRows == 1){
            JSONObject item = items.getJSONObject("item");
            idList.add(item.getString("atcId"));
        } else {
            JSONArray item = items.getJSONArray("item");
            for (int i = 0; i < item.length(); i++) {
                org.json.JSONObject obj = item.getJSONObject(i);
                idList.add(obj.getString("atcId"));
            }
        }

        if(totalCount < pageNo * numOfRows){
            return false;
        }
        return true;
    }

    public void callDetailAPIAndSaveLostArticle(List<String> idList) throws IOException {
        for (String atcId : idList){
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsDetailInfo"); /*URL*/
            urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=z5aVcHaA2frLlaYTCzEF45A22OIUDm1rc1CcW54fwBAFwz%2F7VB3QHz2SWxUGa8aP3xbnVSAZkGrnIAwb%2FWc4OQ%3D%3D"); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("ATC_ID","UTF-8") + "=" + URLEncoder.encode(atcId, "UTF-8")); /*관리ID*/
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            org.json.JSONObject jsonObject1 = XML.toJSONObject(sb.toString());
            org.json.JSONObject detailResponse = jsonObject1.getJSONObject("response");
            org.json.JSONObject detailBody = detailResponse.getJSONObject("body");
            org.json.JSONObject detailItem = detailBody.getJSONObject("item");

            LostArticleDetailResponse lostArticleDetailResponse = new LostArticleDetailResponse();
            lostArticleDetailResponse.setAtcId(detailItem.getString("atcId"));
            lostArticleDetailResponse.setLstFilePathImg(detailItem.getString("lstFilePathImg"));
            lostArticleDetailResponse.setLstHor(detailItem.getInt("lstHor"));
            lostArticleDetailResponse.setLstLctNm(detailItem.getString("lstLctNm"));
            lostArticleDetailResponse.setLstPlace(detailItem.getString("lstPlace"));
            lostArticleDetailResponse.setLstPlaceSeNm(detailItem.getString("lstPlaceSeNm"));
            lostArticleDetailResponse.setLstPrdtNm(detailItem.getString("lstPrdtNm"));
            lostArticleDetailResponse.setLstSbjt(detailItem.getString("lstSbjt"));
            lostArticleDetailResponse.setLstSteNm(detailItem.getString("lstSteNm"));
            lostArticleDetailResponse.setLstYmd(detailItem.getString("lstYmd"));
            lostArticleDetailResponse.setOrgId(detailItem.getString("orgId"));
            lostArticleDetailResponse.setOrgNm(detailItem.getString("orgNm"));
            lostArticleDetailResponse.setPrdtClNm(detailItem.getString("prdtClNm"));
            lostArticleDetailResponse.setTel(detailItem.getString("tel"));
            lostArticleDetailResponse.setUniq(detailItem.getString("uniq"));

            lostArticleRepository.save(LostArticle.of(lostArticleDetailResponse));
        }
    }

    public void checkIdExist(List<String> idList){
        idList.removeIf(id -> lostArticleRepository.findByLostArticleId(id) != null);
    }
}
