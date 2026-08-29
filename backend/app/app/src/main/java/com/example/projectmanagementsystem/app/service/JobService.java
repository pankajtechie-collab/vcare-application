package com.example.projectmanagementsystem.app.service;

import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.dto.JobRegisterRequestDto;
import com.example.projectmanagementsystem.app.model.*;
import com.example.projectmanagementsystem.app.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private MainJobDetailsRepository mainJobDetailsRepository;

    @Autowired
    private JobAccountRepository jobAccountRepository;
    @Autowired
    private JobContractRepository jobContractRepository;
    @Autowired
    private JobActivityRepository jobActivityRepository;
    @Autowired
    private JobContractLineRepository jobContractLineRepository;
    @Autowired
    private JobCaseTypeRepository jobCaseTypeRepository;
    @Autowired
    private JobMidDataRepository jobMidDataRepository;
    @Autowired
    private JobTidDataRepository jobTidDataRepository;
    @Autowired
    private JobCsiDataRepository jobCsiDataRepository;
    @Autowired
    private JobSpOriginDataRepository jobSpOriginDataRepository;
    @Autowired
    private JobSpExecutorDataRepository jobSpExecutorDataRepository;
    @Autowired
    private JobKanwilPenerbitDataRepository jobKanwilPenerbitDataRepository;
    @Autowired
    private JobKanwilPelaksanaDataRepository jobKanwilPelaksanaDataRepository;

    public List<DropdownProjection> getAccountDropdowns() {
        return jobAccountRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getCaseTypeDropdowns() {
        return jobCaseTypeRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getContractLineDropdowns() {
        return jobContractLineRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getCsiDataDropdowns() {
        return jobCsiDataRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getKanwiiPelaksanaDataDropdowns() {
        return jobKanwilPelaksanaDataRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getKanwiiPenerbitDataDropdowns() {
        return jobKanwilPenerbitDataRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getJobMidDataDropdowns() {
        return jobMidDataRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getSpiExecutorDataDropdowns() {
        return jobSpExecutorDataRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getSpOriginDataDropdowns() {
        return jobSpOriginDataRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getTidDataDropdowns() {
        return jobTidDataRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getContractDropdowns() {
        return jobContractRepository.findAllDropdowns();
    }

    public List<DropdownProjection> getActivityDropdowns() {
        return jobActivityRepository.findAllDropdowns();
    }

    @Transactional
    public MainJobDetails registerJob(JobRegisterRequestDto dto) {
        // Fetch and validate relationship references
        JobAccount account = jobAccountRepository.findById(dto.getAccountId())
                .orElseThrow(() -> new EntityNotFoundException("JobAccount not found with ID: " + dto.getAccountId()));

        JobContract contract = jobContractRepository.findById(dto.getContractId())
                .orElseThrow(() -> new EntityNotFoundException("JobContract not found with ID: " + dto.getContractId()));

        JobActivity workActivity = jobActivityRepository.findById(dto.getWorkActivityId())
                .orElseThrow(() -> new EntityNotFoundException("JobActivity not found with ID: " + dto.getWorkActivityId()));

        JobContractLine contractLine = jobContractLineRepository.findById(dto.getContractLineId())
                .orElseThrow(() -> new EntityNotFoundException("JobContractLine not found with ID: " + dto.getContractLineId()));

        JobCaseType caseTypeObj = jobCaseTypeRepository.findById(dto.getCaseTypeId())
                .orElseThrow(() -> new EntityNotFoundException("JobCaseType not found with ID: " + dto.getCaseTypeId()));

        JobMidData jobMidData = jobMidDataRepository.findById(dto.getMidId())
                .orElseThrow(() -> new EntityNotFoundException("JobMidData not found with ID: " + dto.getMidId()));

        JobTidData jobTidData = jobTidDataRepository.findById(dto.getTidId())
                .orElseThrow(() -> new EntityNotFoundException("JobTidData not found with ID: " + dto.getTidId()));

        JobCsiData jobCsiData = jobCsiDataRepository.findById(dto.getCsiId())
                .orElseThrow(() -> new EntityNotFoundException("JobCsiData not found with ID: " + dto.getCsiId()));

        JobSpOriginData spOrigin = jobSpOriginDataRepository.findById(dto.getSpOriginId())
                .orElseThrow(() -> new EntityNotFoundException("JobSpOriginData not found with ID: " + dto.getSpOriginId()));

        JobSpExecutorData spExecutor = jobSpExecutorDataRepository.findById(dto.getSpExecutorId())
                .orElseThrow(() -> new EntityNotFoundException("JobSpExecutorData not found with ID: " + dto.getSpExecutorId()));

        JobKanwilPenerbitData kanwilPenerbit = jobKanwilPenerbitDataRepository.findById(dto.getKanwilPenerbitId())
                .orElseThrow(() -> new EntityNotFoundException("JobKanwilPenerbitData not found with ID: " + dto.getKanwilPenerbitId()));

        JobKanwilPelaksanaData kanwilPelaksana = jobKanwilPelaksanaDataRepository.findById(dto.getKanwilPelaksanaId())
                .orElseThrow(() -> new EntityNotFoundException("JobKanwilPelaksanaData not found with ID: " + dto.getKanwilPelaksanaId()));

        // Map DTO to Entity
        MainJobDetails job = new MainJobDetails();
        job.setAccount(account);
        job.setContract(contract);
        job.setWorkActivity(workActivity);
        job.setContractLine(contractLine);

        job.setJobNumber(dto.getJobNumber());
        job.setCaseId(dto.getCaseId());
        job.setCaseTypeObj(caseTypeObj);
        job.setReferenceNumber(dto.getReferenceNumber());
        job.setSpkReference(dto.getSpkReference());
        job.setJobDescription(dto.getJobDescription());
        job.setIsSlaPriority(dto.getIsSlaPriority());

        job.setJobMidData(jobMidData);
        job.setJobTidData(jobTidData);
        job.setJobCsiData(jobCsiData);

        job.setJobMerchantName(dto.getJobMerchantName());
        job.setJobAddress(dto.getJobAddress());
        job.setJobCity(dto.getJobCity());
        job.setJobPostalCode(dto.getJobPostalCode());

        job.setJobSpOriginData(spOrigin);
        job.setJobSpExecutorData(spExecutor);
        job.setJobKanwilPenerbitData(kanwilPenerbit);
        job.setJobKanwilPelaksanaData(kanwilPelaksana);

        job.setJobRegisteredOn(dto.getJobRegisteredOn());
        job.setJobReceivedOn(dto.getJobReceivedOn());
        job.setJobActualTargetDate(dto.getJobActualTargetDate());
        job.setJobUpdateToCustomerDate(dto.getJobUpdateToCustomerDate());
        job.setJobExpectedResponseDate(dto.getJobExpectedResponseDate());
        job.setJobExpectedCompletionDate(dto.getJobExpectedCompletionDate());

        job.setJobStatus("REGISTERED");

        // Save to database
        return mainJobDetailsRepository.save(job);
    }

    // Fetch all jobs including their mapped relations
    public Page<MainJobDetails> getAllJobsWithRelations(String search, Pageable pageable) {
        return mainJobDetailsRepository.findAllWithRelations(search, pageable);
    }

    // Fetch a single job by ID with all its relations
    public MainJobDetails getJobByIdWithRelations(Long id) {
        return mainJobDetailsRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new EntityNotFoundException("Job not found with ID: " + id));
    }

    public ByteArrayInputStream exportJobsToExcel() {
        String[] COLUMNS = {
                "ID", "Job Number", "Case ID", "Reference Number", "SPK Reference",
                "Merchant Name", "City", "Job Status", "Registered On", "Received On"
        };

        List<MainJobDetails> jobs = mainJobDetailsRepository.findAll();

        // Formatter to convert LocalDateTime to human-readable format (e.g., "28 Aug 2026, 08:00")
        DateTimeFormatter humanReadableFormatter = DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm");

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Job Details");

            // Create Header Font and Style
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            headerCellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Row for Header
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNS.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNS[col]);
                cell.setCellStyle(headerCellStyle);
            }

            // Populate Data Rows
            int rowIdx = 1;
            for (MainJobDetails job : jobs) {
                Row row = sheet.createRow(rowIdx++);

                // 1. Format Job Status to Title Case (e.g., "IN_PROGRESS" -> "In Progress")
                String formattedStatus = "";
                if (job.getJobStatus() != null && !job.getJobStatus().isEmpty()) {
                    String[] words = job.getJobStatus().toLowerCase().split("_");
                    StringBuilder sb = new StringBuilder();
                    for (String word : words) {
                        if (!word.isEmpty()) {
                            sb.append(Character.toUpperCase(word.charAt(0)))
                                    .append(word.substring(1))
                                    .append(" ");
                        }
                    }
                    formattedStatus = sb.toString().trim();
                }

                // 2. Format Registered On Date
                String formattedRegisteredOn = "";
                if (job.getJobRegisteredOn() != null) {
                    formattedRegisteredOn = job.getJobRegisteredOn().format(humanReadableFormatter);
                }

                // 3. Format Received On Date
                String formattedReceivedOn = "";
                if (job.getJobReceivedOn() != null) {
                    formattedReceivedOn = job.getJobReceivedOn().format(humanReadableFormatter);
                }

                row.createCell(0).setCellValue(job.getId() != null ? job.getId() : 0);
                row.createCell(1).setCellValue(job.getJobNumber() != null ? job.getJobNumber() : 0);
                row.createCell(2).setCellValue(job.getCaseId() != null ? job.getCaseId() : "");
                row.createCell(3).setCellValue(job.getReferenceNumber() != null ? job.getReferenceNumber() : 0);
                row.createCell(4).setCellValue(job.getSpkReference() != null ? job.getSpkReference() : 0);
                row.createCell(5).setCellValue(job.getJobMerchantName() != null ? job.getJobMerchantName() : "");
                row.createCell(6).setCellValue(job.getJobCity() != null ? job.getJobCity() : "");
                row.createCell(7).setCellValue(formattedStatus);
                row.createCell(8).setCellValue(formattedRegisteredOn);
                row.createCell(9).setCellValue(formattedReceivedOn);
            }

            // Auto-size columns for better readability
            for (int i = 0; i < COLUMNS.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store excel data: " + e.getMessage());
        }
    }
}