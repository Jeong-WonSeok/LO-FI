package com.ssafy.lofi.service;

import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;

import java.util.List;

public interface MissingPersonService {
    void saveMissingPersonAPIData(List<MissingPersonAPIResponse> data);

    void deleteMissingPersonAPIData();
}
