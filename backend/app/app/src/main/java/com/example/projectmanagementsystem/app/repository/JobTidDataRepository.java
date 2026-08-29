package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobTidData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobTidDataRepository extends JpaRepository<JobTidData, Long> {
    Optional<JobTidData> findByTid(Integer tid);

    @Query("SELECT a.id as id, a.tid as name FROM JobTidData a")
    List<DropdownProjection> findAllDropdowns();
}