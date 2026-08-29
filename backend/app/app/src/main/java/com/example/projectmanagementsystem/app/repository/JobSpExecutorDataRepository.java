package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobSpExecutorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSpExecutorDataRepository extends JpaRepository<JobSpExecutorData, Long> {
    @Query("SELECT a.id as id, a.name as name FROM JobSpExecutorData a")
    List<DropdownProjection> findAllDropdowns();
}