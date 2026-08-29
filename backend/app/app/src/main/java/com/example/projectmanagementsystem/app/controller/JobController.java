package com.example.projectmanagementsystem.app.controller;

import com.example.projectmanagementsystem.app.dto.ApiResponse;
import com.example.projectmanagementsystem.app.dto.DropdownProjection;
import com.example.projectmanagementsystem.app.dto.JobRegisterRequestDto;
import com.example.projectmanagementsystem.app.model.MainJobDetails;
import com.example.projectmanagementsystem.app.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
//@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<Page<MainJobDetails>>> getAllJobsWithRelations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "") String search
    ) {
        try {
            Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size, sort);

            Page<MainJobDetails> jobPage = jobService.getAllJobsWithRelations(search, pageable);

            ApiResponse<Page<MainJobDetails>> response = ApiResponse.success("Jobs fetched successfully with pagination!", jobPage);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            ApiResponse<Page<MainJobDetails>> errorResponse = ApiResponse.error("Failed to fetch jobs with relations: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<MainJobDetails>> registerNewJob(@RequestBody JobRegisterRequestDto requestDto) {
        try {
            MainJobDetails savedJob = jobService.registerJob(requestDto);
            ApiResponse<MainJobDetails> response = ApiResponse.success("Job registered successfully!", savedJob);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            ApiResponse<MainJobDetails> errorResponse = ApiResponse.error("Failed to register job: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/dropdowns/accounts")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getAccountsForDropdown() {
        List<DropdownProjection> data = jobService.getAccountDropdowns();
        return ResponseEntity.ok(ApiResponse.success("Accounts fetched successfully", data));
    }

    @GetMapping("/dropdowns/contracts")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getContractsForDropdown() {
        List<DropdownProjection> data = jobService.getContractDropdowns();
        return ResponseEntity.ok(ApiResponse.success("Contracts fetched successfully", data));
    }

    @GetMapping("/dropdowns/work-activities")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getWorkActivityDropdowns() {
        List<DropdownProjection> data = jobService.getActivityDropdowns();
        return ResponseEntity.ok(ApiResponse.success("Work Activities fetched successfully", data));
    }

    @GetMapping("/dropdowns/contract-lines")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getContractLineDropdowns() {
        List<DropdownProjection> data = jobService.getContractLineDropdowns();
        return ResponseEntity.ok(ApiResponse.success("Contract Lines fetched successfully", data));
    }

    @GetMapping("/dropdowns/case-types")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getCaseTypeDropdowns() {
        List<DropdownProjection> data = jobService.getCaseTypeDropdowns();
        return ResponseEntity.ok(ApiResponse.success("Case Types fetched successfully", data));
    }

    @GetMapping("/dropdowns/mids")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getMidDropdowns() {
        List<DropdownProjection> data = jobService.getJobMidDataDropdowns();
        return ResponseEntity.ok(ApiResponse.success("MIDs fetched successfully", data));
    }

    @GetMapping("/dropdowns/tids")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getTidDropdowns() {
        List<DropdownProjection> data = jobService.getTidDataDropdowns();
        return ResponseEntity.ok(ApiResponse.success("TIDs fetched successfully", data));
    }

    @GetMapping("/dropdowns/csis")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getCsiDropdowns() {
        List<DropdownProjection> data = jobService.getCsiDataDropdowns();
        return ResponseEntity.ok(ApiResponse.success("CSIs fetched successfully", data));
    }

    @GetMapping("/dropdowns/sp-origins")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getSpOriginDropdowns() {
        List<DropdownProjection> data = jobService.getSpOriginDataDropdowns();
        return ResponseEntity.ok(ApiResponse.success("SP Origins fetched successfully", data));
    }

    @GetMapping("/dropdowns/sp-executors")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getSpExecutorDropdowns() {
        List<DropdownProjection> data = jobService.getSpiExecutorDataDropdowns();
        return ResponseEntity.ok(ApiResponse.success("SP Executors fetched successfully", data));
    }

    @GetMapping("/dropdowns/kanwil-penerbits")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getKanwilPenerbitDropdowns() {
        List<DropdownProjection> data = jobService.getKanwiiPenerbitDataDropdowns();
        return ResponseEntity.ok(ApiResponse.success("Kanwil Penerbits fetched successfully", data));
    }

    @GetMapping("/dropdowns/kanwil-pelaksanas")
    public ResponseEntity<ApiResponse<List<DropdownProjection>>> getKanwilPelaksanaDropdowns() {
        List<DropdownProjection> data = jobService.getKanwiiPelaksanaDataDropdowns();
        return ResponseEntity.ok(ApiResponse.success("Kanwil Pelaksanas fetched successfully", data));
    }

    @GetMapping("/export")
    public ResponseEntity<Resource> exportJobsToExcel() {
        try {
            ByteArrayInputStream actualFile = jobService.exportJobsToExcel();
            String filename = "job_details_export.xlsx";

            InputStreamResource fileResource = new InputStreamResource(actualFile);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(fileResource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}