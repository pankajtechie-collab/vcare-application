package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobKanwilPelaksanaData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobKanwilPelaksanaDataRepository extends JpaRepository<JobKanwilPelaksanaData, Long> {
    @Query("SELECT a.id as id, a.name as name FROM JobKanwilPelaksanaData a")
    List<DropdownProjection> findAllDropdowns();
}