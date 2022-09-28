package com.ssafy.lofi.service;

import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;

import java.text.ParseException;
import java.util.List;

public interface MissingPersonService {
    void saveMissingPersonAPIData(List<MissingPersonAPIResponse> data) throws ParseException;

    void deleteMissingPersonAPIData();
}
