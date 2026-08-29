package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobContractLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobContractLineRepository extends JpaRepository<JobContractLine, Long> {
    @Query("SELECT a.id as id, a.name as name FROM JobContractLine a")
    List<DropdownProjection> findAllDropdowns();
}