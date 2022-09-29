package com.ssafy.lofi.service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.lofi.db.entity.Police;
import com.ssafy.lofi.db.repository.PoliceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class PoliceService {
    private final PoliceRepository policeRepository;

    public void updateAddress() {
        //List<Police> list = policeRepository.findAll();
//        for (Police police: list) {
//            String jsonString = getKakaoApiFromAddress(police.getAddress());
//            HashMap<String, String> xymap = getXYMapfromJson(jsonString);
//            double lat = Double.parseDouble(xymap.get("x"));
//            double lon = Double.parseDouble(xymap.get("y"));
//            police.update(lat,lon);
//            policeRepository.save(police);
//        }
        Police police = policeRepository.findById(1l).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 경찰서가 존재 하지 않습니다." + 1l));
        String jsonString = getKakaoApiFromAddress(police.getAddress());
        HashMap<String, String> xymap = getXYMapfromJson(jsonString);
        double lat = Double.parseDouble(xymap.get("x"));
        double lon = Double.parseDouble(xymap.get("y"));
    }

    public String getKakaoApiFromAddress(String roadFullAddr) {
        String apiKey = "8caa0985e26947cab3d878195a1247c6";
        String apiUrl = "https://dapi.kakao.com/v2/local/search/address.json";
        String jsonString = null;

        try {
            roadFullAddr = URLEncoder.encode(roadFullAddr, "UTF-8");

            String addr = apiUrl + "?query=" + roadFullAddr;

            URL url = new URL(addr);
            URLConnection conn = url.openConnection();
            conn.setRequestProperty("Authorization", "KakaoAK " + apiKey);

            BufferedReader rd = null;
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuffer docJson = new StringBuffer();

            String line;

            while ((line=rd.readLine()) != null) {
                docJson.append(line);
            }

            jsonString = docJson.toString();
            rd.close();

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonString;
    }

    public HashMap<String, String> getXYMapfromJson(String jsonString) {
        ObjectMapper mapper = new ObjectMapper();
        HashMap<String, String> XYMap = new HashMap<String, String>();

        try {
            TypeReference<Map<String, Object>> typeRef
                    = new TypeReference<Map<String, Object>>(){};
            Map<String, Object> jsonMap = mapper.readValue(jsonString, typeRef);

            @SuppressWarnings("unchecked")
            List<Map<String, String>> docList
                    =  (List<Map<String, String>>) jsonMap.get("documents");

            Map<String, String> adList = (Map<String, String>) docList.get(0);
            XYMap.put("x",adList.get("x"));
            XYMap.put("y", adList.get("y"));

        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return XYMap;
    }
}
