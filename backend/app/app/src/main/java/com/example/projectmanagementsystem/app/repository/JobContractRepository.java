package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobContractRepository extends JpaRepository<JobContract, Long> {
    @Query("SELECT c.id AS id, c.name AS name FROM JobContract c")
    List<DropdownProjection> findAllDropdowns();
}