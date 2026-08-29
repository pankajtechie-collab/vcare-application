package com.example.projectmanagementsystem.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "main_job_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MainJobDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Relationship Mappings ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private JobAccount account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id", nullable = false)
    private JobContract contract;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_activity_id", nullable = false)
    private JobActivity workActivity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_line_id", nullable = false)
    private JobContractLine contractLine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_type", nullable = false)
    private JobCaseType caseTypeObj; // Renamed to avoid collision if caseType is stored as String/Long elsewhere, or map directly

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_mid", nullable = false)
    private JobMidData jobMidData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_tid", nullable = false)
    private JobTidData jobTidData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_csi", nullable = false)
    private JobCsiData jobCsiData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_sp_origin", nullable = false)
    private JobSpOriginData jobSpOriginData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_sp_executor", nullable = false)
    private JobSpExecutorData jobSpExecutorData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_kanwil_penerbit", nullable = false)
    private JobKanwilPenerbitData jobKanwilPenerbitData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_kanwil_pelaksana", nullable = false)
    private JobKanwilPelaksanaData jobKanwilPelaksanaData;

    // --- Primitive Fields ---

    @Column(name = "job_number", nullable = false)
    private Integer jobNumber;

    @Column(name = "case_id", length = 10, nullable = false)
    private String caseId;

    @Column(name = "reference_number", nullable = false)
    private Integer referenceNumber;

    @Column(name = "spk_reference", nullable = false)
    private Integer spkReference;

    @Column(name = "job_description", nullable = false)
    private String jobDescription;

    @Column(name = "is_sla_priority", nullable = false)
    private Byte isSlaPriority;

    @Column(name = "job_merchant_name", length = 100, nullable = false)
    private String jobMerchantName;

    @Column(name = "job_address", length = 100, nullable = false)
    private String jobAddress;

    @Column(name = "job_city", length = 100, nullable = false)
    private String jobCity;

    @Column(name = "job_postal_code", length = 100, nullable = false)
    private String jobPostalCode;

    // --- Dates and Timestamps ---

    @Column(name = "job_registered_on")
    private LocalDateTime jobRegisteredOn;

    @Column(name = "job_received_on")
    private LocalDateTime jobReceivedOn;

    @Column(name = "job_actual_target_date")
    private LocalDateTime jobActualTargetDate;

    @Column(name = "job_update_to_customer_date")
    private LocalDateTime jobUpdateToCustomerDate;

    @Column(name = "job_expected_response_date")
    private LocalDateTime jobExpectedResponseDate;

    @Column(name = "job_expected_completion_date")
    private LocalDateTime jobExpectedCompletionDate;

    @Column(name = "job_status")
    private String jobStatus;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}