package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobSpOriginData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSpOriginDataRepository extends JpaRepository<JobSpOriginData, Long> {
    @Query("SELECT a.id as id, a.name as name FROM JobSpOriginData a")
    List<DropdownProjection> findAllDropdowns();
}