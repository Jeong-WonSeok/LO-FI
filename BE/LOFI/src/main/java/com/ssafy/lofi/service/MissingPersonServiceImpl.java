package com.ssafy.lofi.service;

import com.ssafy.lofi.db.entity.MissingPerson;
import com.ssafy.lofi.db.repository.MissingPersonRepository;
import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("missingPersonService")
@RequiredArgsConstructor
public class MissingPersonServiceImpl implements MissingPersonService {
    private final MissingPersonRepository missingPersonRepository;
    @Override
    @Transactional
    public void saveMissingPersonAPIData(List<MissingPersonAPIResponse> data){
        List<MissingPerson> list = new ArrayList<>();
        for (MissingPersonAPIResponse response : data){
            list.add(MissingPerson.of(response));
        }
        missingPersonRepository.saveAll(list);
    }
}
