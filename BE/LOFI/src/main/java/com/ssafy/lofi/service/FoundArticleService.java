package com.ssafy.lofi.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.lofi.db.entity.FoundArticle;
import com.ssafy.lofi.db.repository.FoundArticleRepository;
import com.ssafy.lofi.dto.response.FoundArticleDetailResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@Service("foundArticleService")
@RequiredArgsConstructor
public class FoundArticleService {
    private final FoundArticleRepository foundArticleRepository;
    public boolean getFoundArticleList(int numOfRows, int pageNo, Map<String, Integer> idMap, String startDate, String endDate) throws IOException {
        /*URL*/
        String urlBuilder = "http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd" +
                "?" + URLEncoder.encode("serviceKey", "UTF-8") + "=z5aVcHaA2frLlaYTCzEF45A22OIUDm1rc1CcW54fwBAFwz%2F7VB3QHz2SWxUGa8aP3xbnVSAZkGrnIAwb%2FWc4OQ%3D%3D" + /*Service Key*/
                "&" + URLEncoder.encode("PRDT_CL_CD_01", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8") + /*대분류*/
                "&" + URLEncoder.encode("PRDT_CL_CD_02", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8") + /*중분류*/
                "&" + URLEncoder.encode("FD_COL_CD", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8") + /*습득물 색상*/
                "&" + URLEncoder.encode("START_YMD", "UTF-8") + "=" + URLEncoder.encode(startDate, "UTF-8") + /*검색시작일*/
                "&" + URLEncoder.encode("END_YMD", "UTF-8") + "=" + URLEncoder.encode(endDate, "UTF-8") + /*검색종료일*/
                "&" + URLEncoder.encode("N_FD_LCT_CD", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8") + /*습득지역*/
                "&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(Integer.toString(pageNo), "UTF-8") + /*페이지 번호*/
                "&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(Integer.toString(numOfRows), "UTF-8"); /*목록 건수*/
        URL url = new URL(urlBuilder);
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
        JSONObject jsonObject = XML.toJSONObject(sb.toString());
        System.out.println(jsonObject.toString(0));

        // 습득물 리스트에서 id값만 꺼내기
        JSONObject response = jsonObject.getJSONObject("response");
        JSONObject body = response.getJSONObject("body");
        JSONObject items = body.getJSONObject("items");
        int totalCount = body.getInt("totalCount");
        if(totalCount - (pageNo - 1) * numOfRows == 1){
            JSONObject item = items.getJSONObject("item");
            idMap.put(item.getString("atcId"), 0);
//            idList.add(item.getString("atcId"));
        } else {
            JSONArray item = items.getJSONArray("item");
            for (int i = 0; i < item.length(); i++) {
                org.json.JSONObject obj = item.getJSONObject(i);
                idMap.put(obj.getString("atcId"), 0);
//                idList.add(obj.getString("atcId"));
            }
        }

        if (totalCount < pageNo * numOfRows){
            return false;
        }
        return true;
    }

    public void checkIdExist(Map<String, Integer> idMap, List<String> insertList, List<String> deleteList){
        List<String> dbIdList = foundArticleRepository.findAllAtcId();
        for (String id : dbIdList){
            if(idMap.containsKey(id)){
                idMap.put(id, 1);
            }else {
                deleteList.add(id);
            }
        }
        for (Map.Entry<String, Integer> entry : idMap.entrySet()){
            if(entry.getValue().equals(0)){
                insertList.add(entry.getKey());
            }
        }
    }

    public void callDetailAPIAndSaveFoundArticle(List<String> idList) throws IOException, ParseException {
        for (String atcId : idList) {
            /*URL*/
            String urlBuilder = "http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundDetailInfo" +
                    "?" + URLEncoder.encode("serviceKey", "UTF-8") + "=z5aVcHaA2frLlaYTCzEF45A22OIUDm1rc1CcW54fwBAFwz%2F7VB3QHz2SWxUGa8aP3xbnVSAZkGrnIAwb%2FWc4OQ%3D%3D" + /*Service Key*/
                    "&" + URLEncoder.encode("ATC_ID", "UTF-8") + "=" + URLEncoder.encode(atcId, "UTF-8") + /*관리ID*/
                    "&" + URLEncoder.encode("FD_SN", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"); /*습득순번*/
            URL url = new URL(urlBuilder);
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
            JSONObject jsonObject = XML.toJSONObject(sb.toString());
            System.out.println(jsonObject.toString(0));
            try {
                JSONObject detailResponse = jsonObject.getJSONObject("response");
                JSONObject detailBody = detailResponse.getJSONObject("body");
                JSONObject detailItem = detailBody.getJSONObject("item");
                ObjectMapper mapper = new ObjectMapper();
                mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                FoundArticleDetailResponse foundArticleDetailResponse = mapper.readValue(detailItem.toString(), FoundArticleDetailResponse.class);

                foundArticleRepository.save(FoundArticle.of(foundArticleDetailResponse));
            } catch (JSONException e) {

            }


        }
    }

    public void deleteFoundArticle(List<String> deleteIdList){
        for (String id : deleteIdList){
            foundArticleRepository.deleteFoundArticle(id);
        }
    }
}
