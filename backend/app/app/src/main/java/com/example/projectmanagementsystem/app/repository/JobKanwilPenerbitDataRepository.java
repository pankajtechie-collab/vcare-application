package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobKanwilPenerbitData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobKanwilPenerbitDataRepository extends JpaRepository<JobKanwilPenerbitData, Long> {
    @Query("SELECT a.id as id, a.name as name FROM JobKanwilPenerbitData a")
    List<DropdownProjection> findAllDropdowns();
}