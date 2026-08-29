package com.example.projectmanagementsystem.app.seeder;

import com.example.projectmanagementsystem.app.model.*;
import com.example.projectmanagementsystem.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    // Read the property from application.properties (defaults to false if not specified)
    @Value("${app.seeder.enabled}")
    private boolean seederEnabled;

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

    @Autowired
    private MainJobDetailsRepository mainJobDetailsRepository;

    @Override
    public void run(String... args) throws Exception {
        // If the property is set to false, skip execution completely
        if (!seederEnabled) {
            System.out.println("ℹ️ Seeder is disabled via application properties.");
            return;
        }

        // Run seeding only if lookup tables are empty
        if (jobAccountRepository.count() == 0) {
            System.out.println("🌱 Seeding multiple dummy records (at least 5 per model)...");

            // 1. Seed 5 Job Accounts
            List<JobAccount> accounts = new ArrayList<>();
            String[] accountNames = {
                    "PT Bank Mandiri (Persero) Tbk",
                    "PT Bank Rakyat Indonesia (Persero) Tbk",
                    "PT Bank Negara Indonesia (Persero) Tbk",
                    "PT Bank Central Asia Tbk",
                    "PT Bank CIMB Niaga Tbk"
            };
            for (String name : accountNames) {
                JobAccount acc = new JobAccount();
                acc.setName(name);
                accounts.add(jobAccountRepository.save(acc));
            }

            // 2. Seed 5 Job Contracts
            List<JobContract> contracts = new ArrayList<>();
            String[] contractNames = {
                    "CONTRACT-EDC-2026-001",
                    "CONTRACT-EDC-2026-002",
                    "CONTRACT-QRIS-2026-010",
                    "CONTRACT-ATM-2026-055",
                    "CONTRACT-POS-2026-100"
            };
            for (String name : contractNames) {
                JobContract con = new JobContract();
                con.setName(name);
                contracts.add(jobContractRepository.save(con));
            }

            // 3. Seed 5 Job Activities
            List<JobActivity> activities = new ArrayList<>();
            String[] activityNames = {
                    "Technical Support & Maintenance",
                    "EDC Terminal Installation",
                    "Hardware Replacement",
                    "Software Patch Update",
                    "Merchant Training & Onboarding"
            };
            for (String name : activityNames) {
                JobActivity act = new JobActivity();
                act.setName(name);
                activities.add(jobActivityRepository.save(act));
            }

            // 4. Seed 5 Job Contract Lines
            List<JobContractLine> contractLines = new ArrayList<>();
            String[] lineNames = {
                    "EDC Terminal Deployment Line A",
                    "Android EDC Rollout Line B",
                    "QRIS Dynamic Display Line C",
                    "Mini ATM Maintenance Line D",
                    "Legacy POS Support Line E"
            };
            for (String name : lineNames) {
                JobContractLine line = new JobContractLine();
                line.setName(name);
                contractLines.add(jobContractLineRepository.save(line));
            }

            // 5. Seed 5 Job Case Types
            List<JobCaseType> caseTypes = new ArrayList<>();
            String[] caseTypeNames = {
                    "Hardware Malfunction",
                    "Connectivity Issue",
                    "Paper Roll Out of Stock",
                    "Transaction Timeout",
                    "Power Supply Failure"
            };
            for (String name : caseTypeNames) {
                JobCaseType ct = new JobCaseType();
                ct.setName(name);
                caseTypes.add(jobCaseTypeRepository.save(ct));
            }

            // 6. Seed 5 Job MID Data Records
            List<JobMidData> midDataList = new ArrayList<>();
            String[] mNames = {"Toko Makmur Jaya", "Supermarket Sejahtera", "Kopi Kenangan Senopati", "Apotek Kimia Farma", "Restoran Padang Sederhana"};
            int[] mIds = {88102938, 88102939, 88102940, 88102941, 88102942};
            String[] mAddresses = {"Jl. Sudirman 52", "Jl. Thamrin 10", "Jl. Senopati 5", "Jl. Gatot Subroto 12", "Jl. Menteng Raya 44"};
            String[] mPostals = {"12190", "10310", "12110", "12930", "10340"};

            for (int i = 0; i < 5; i++) {
                JobMidData mid = new JobMidData();
                mid.setMerchantName(mNames[i]);
                mid.setMerchantId(mIds[i]);
                mid.setAddress(mAddresses[i]);
                mid.setPostalCode(mPostals[i]);
                midDataList.add(jobMidDataRepository.save(mid));
            }

            // 7. Seed 5 Job TID Data Records
            List<JobTidData> tidDataList = new ArrayList<>();
            int[] tIds = {44192012, 44192013, 44192014, 44192015, 44192016};
            for (int tId : tIds) {
                JobTidData tid = new JobTidData();
                tid.setTid(tId);
                tidDataList.add(jobTidDataRepository.save(tid));
            }

            // 8. Seed 5 Job CSI Data Records
            List<JobCsiData> csiDataList = new ArrayList<>();
            int[] cValues = {99281, 99282, 99283, 99284, 99285};
            for (int cVal : cValues) {
                JobCsiData csi = new JobCsiData();
                csi.setCsi(cVal);
                csiDataList.add(jobCsiDataRepository.save(csi));
            }

            // 9. Seed 5 SP Origin Data Records
            List<JobSpOriginData> spOrigins = new ArrayList<>();
            String[] originNames = {"Helpdesk Regional Center", "Merchant Call Center", "Email Support Inbox", "Mobile App Ticket", "Branch Office Walk-in"};
            for (String name : originNames) {
                JobSpOriginData origin = new JobSpOriginData();
                origin.setName(name);
                spOrigins.add(jobSpOriginDataRepository.save(origin));
            }

            // 10. Seed 5 SP Executor Data Records
            List<JobSpExecutorData> spExecutors = new ArrayList<>();
            String[] executorNames = {"Field Engineer Team Alpha", "Technical Support Beta", "Vendor Maintenance Team", "Quick Response Unit", "Senior Network Specialist"};
            for (String name : executorNames) {
                JobSpExecutorData exec = new JobSpExecutorData();
                exec.setName(name);
                spExecutors.add(jobSpExecutorDataRepository.save(exec));
            }

            // 11. Seed 5 Kanwil Penerbit Data Records
            List<JobKanwilPenerbitData> kanwilPenerbits = new ArrayList<>();
            String[] penerbitNames = {"Kanwil Jakarta I", "Kanwil Jakarta II", "Kanwil Surabaya", "Kanwil Medan", "Kanwil Bandung"};
            for (String name : penerbitNames) {
                JobKanwilPenerbitData kp = new JobKanwilPenerbitData();
                kp.setName(name);
                kanwilPenerbits.add(jobKanwilPenerbitDataRepository.save(kp));
            }

            // 12. Seed 5 Kanwil Pelaksana Data Records
            List<JobKanwilPelaksanaData> kanwilPelaksanas = new ArrayList<>();
            String[] pelaksanaNames = {"Kanwil Jakarta Selatan", "Kanwil Jakarta Pusat", "Kanwil Surabaya Timur", "Kanwil Medan Kota", "Kanwil Bandung Wetan"};
            for (String name : pelaksanaNames) {
                JobKanwilPelaksanaData kpel = new JobKanwilPelaksanaData();
                kpel.setName(name);
                kanwilPelaksanas.add(jobKanwilPelaksanaDataRepository.save(kpel));
            }

            // 13. Seed 5 Sample Main Job Details Records linked across the master lists
            for (int i = 0; i < 5; i++) {
                MainJobDetails job = new MainJobDetails();
                job.setAccount(accounts.get(i));
                job.setContract(contracts.get(i));
                job.setWorkActivity(activities.get(i));
                job.setContractLine(contractLines.get(i));

                job.setJobNumber(20260300 + i + 1);
                job.setCaseId("CS-900" + (i + 1));
                job.setCaseTypeObj(caseTypes.get(i));
                job.setReferenceNumber(90010 + i);
                job.setSpkReference(44100 + i);
                job.setJobDescription("Sample technical support case number " + (i + 1) + " requiring onsite merchant assistance.");
                job.setIsSlaPriority((byte) (i % 2)); // Alternating 0 and 1 for SLA priority

                job.setJobMidData(midDataList.get(i));
                job.setJobTidData(tidDataList.get(i));
                job.setJobCsiData(csiDataList.get(i));

                job.setJobMerchantName(midDataList.get(i).getMerchantName());
                job.setJobAddress(midDataList.get(i).getAddress());
                job.setJobCity(i % 2 == 0 ? "Jakarta Selatan" : "Jakarta Pusat");
                job.setJobPostalCode(midDataList.get(i).getPostalCode());

                job.setJobSpOriginData(spOrigins.get(i));
                job.setJobSpExecutorData(spExecutors.get(i));
                job.setJobKanwilPenerbitData(kanwilPenerbits.get(i));
                job.setJobKanwilPelaksanaData(kanwilPelaksanas.get(i));

                job.setJobRegisteredOn(LocalDateTime.now().minusDays(5 - i));
                job.setJobReceivedOn(LocalDateTime.now().minusDays(5 - i).plusHours(1));
                job.setJobActualTargetDate(LocalDateTime.now().plusDays(2 + i));
                job.setJobUpdateToCustomerDate(LocalDateTime.now().minusHours(2));
                job.setJobExpectedResponseDate(LocalDateTime.now().plusHours(4));
                job.setJobExpectedCompletionDate(LocalDateTime.now().plusDays(3 + i));
                job.setJobStatus(i == 0 ? "REGISTERED" : "IN_PROGRESS");

                mainJobDetailsRepository.save(job);
            }

            System.out.println("✅ Successfully seeded 5+ records for all model classes!");
        } else {
            System.out.println("ℹ️ Database already seeded. Skipping execution.");
        }
    }
}