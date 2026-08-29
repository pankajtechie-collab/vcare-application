package com.example.projectmanagementsystem.app.repository;

import com.example.projectmanagementsystem.app.model.MainJobDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MainJobDetailsRepository extends JpaRepository<MainJobDetails, Long> {

    // Fetch all jobs along with key relationships eagerly
    @Query("SELECT DISTINCT m FROM MainJobDetails m " +
            "LEFT JOIN FETCH m.account a " +
            "LEFT JOIN FETCH m.contract c " +
            "LEFT JOIN FETCH m.workActivity w " +
            "LEFT JOIN FETCH m.caseTypeObj ct " +
            "LEFT JOIN FETCH m.jobMidData mid " +
            "LEFT JOIN FETCH m.jobTidData tid " +
            "LEFT JOIN FETCH m.jobCsiData csi " +
            "WHERE (:searchTerm IS NULL OR :searchTerm = '' OR " +
            "       LOWER(m.caseId) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "       LOWER(m.jobMerchantName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "       LOWER(m.jobStatus) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "       LOWER(a.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "       LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "       LOWER(w.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "       CAST(m.jobNumber AS string) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "       CAST(m.referenceNumber AS string) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<MainJobDetails> findAllWithRelations(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Fetch a single job by ID along with its relations
    @Query("SELECT m FROM MainJobDetails m " +
            "LEFT JOIN FETCH m.account " +
            "LEFT JOIN FETCH m.contract " +
            "LEFT JOIN FETCH m.workActivity " +
            "LEFT JOIN FETCH m.contractLine " +
            "LEFT JOIN FETCH m.caseTypeObj " +
            "LEFT JOIN FETCH m.jobMidData " +
            "LEFT JOIN FETCH m.jobTidData " +
            "LEFT JOIN FETCH m.jobCsiData " +
            "LEFT JOIN FETCH m.jobSpOriginData " +
            "LEFT JOIN FETCH m.jobSpExecutorData " +
            "LEFT JOIN FETCH m.jobKanwilPenerbitData " +
            "LEFT JOIN FETCH m.jobKanwilPelaksanaData " +
            "WHERE m.id = :id")
    Optional<MainJobDetails> findByIdWithRelations(@Param("id") Long id);
}