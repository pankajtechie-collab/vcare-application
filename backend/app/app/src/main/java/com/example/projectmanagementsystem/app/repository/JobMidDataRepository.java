package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobMidData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobMidDataRepository extends JpaRepository<JobMidData, Long> {
    Optional<JobMidData> findByMerchantId(Integer merchantId);

    @Query("SELECT a.id as id, a.merchantName as name FROM JobMidData a")
    List<DropdownProjection> findAllDropdowns();
}