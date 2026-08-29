package com.example.projectmanagementsystem.app.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class JobRegisterRequestDto {
    private Long accountId;
    private Long contractId;
    private Long workActivityId;
    private Long contractLineId;

    private Integer jobNumber;
    private String caseId;
    private Long caseTypeId;
    private Integer referenceNumber;
    private Integer spkReference;
    private String jobDescription;
    private Byte isSlaPriority;

    private Long midId;
    private Long tidId;
    private Long csiId;

    private String jobMerchantName;
    private String jobAddress;
    private String jobCity;
    private String jobPostalCode;

    private Long spOriginId;
    private Long spExecutorId;
    private Long kanwilPenerbitId;
    private Long kanwilPelaksanaId;

    private LocalDateTime jobRegisteredOn;
    private LocalDateTime jobReceivedOn;
    private LocalDateTime jobActualTargetDate;
    private LocalDateTime jobUpdateToCustomerDate;
    private LocalDateTime jobExpectedResponseDate;
    private LocalDateTime jobExpectedCompletionDate;
}