package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.model.JobCsiData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobCsiDataRepository extends JpaRepository<JobCsiData, Long> {
    Optional<JobCsiData> findByCsi(Integer csi);

    @Query("SELECT a.id as id, a.csi as name FROM JobCsiData a")
    List<DropdownProjection> findAllDropdowns();
}