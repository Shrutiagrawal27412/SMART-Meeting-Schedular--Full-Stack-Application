
package net.javagets.springboot;
import net.javagets.springboot.Employee;

import net.javagets.springboot.ExcelReaderService;
import net.javagets.springboot.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import net.javagets.springboot.dto.EmailRequest;
import net.javagets.springboot.dto.SecurityAnswerRequest;
import net.javagets.springboot.dto.ResetPasswordRequest;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private ExcelReaderService excelReaderService;



    @PostMapping("/import")
    public String importFromExcel() {
        String filePath = "src/main/resources/employees.xlsx";    
        List<Employee> employees = excelReaderService.readEmployeesFromExcel(filePath);
        employeeRepository.saveAll(employees);

        return "Imported " + employees.size() + " employees into database.";
    }  

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployeeById(@PathVariable int id, @RequestBody Employee updatedEmployee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();
            existingEmployee.setName(updatedEmployee.getName());
            existingEmployee.setDepartment(updatedEmployee.getDepartment());
            existingEmployee.setAge(updatedEmployee.getAge());
            existingEmployee.setEmail(updatedEmployee.getEmail());
            existingEmployee.setSecurityQuestion(updatedEmployee.getSecurityQuestion());
            existingEmployee.setSecurityAnswer(updatedEmployee.getSecurityAnswer());
            employeeRepository.save(existingEmployee);
            return ResponseEntity.ok(existingEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        try {
            employeeRepository.save(employee);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user: " + e.getMessage());
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Employee employee) {
//        Optional<Employee> foundUser = employeeRepository.findByEmailAndPassword(employee.getEmail(), employee.getPassword());
//        if (foundUser.isPresent()) {
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
  //  }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Employee employee) {
    	
        Optional<Employee> foundUser = employeeRepository.findByEmailAndPassword(employee.getEmail(), employee.getPassword());

        if (foundUser.isPresent()) {
            Employee user = foundUser.get();
            Map<String, Object> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }


    @GetMapping("/employees/email/{email}")
    public ResponseEntity<Employee> getByEmail(@PathVariable String email) {
        return employeeRepository.findByEmail(email).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/employees/email-update")
    public ResponseEntity<String> updateEmployeeByEmail(@RequestBody Employee updatedEmployee) {
        Optional<Employee> optional = employeeRepository.findByEmail(updatedEmployee.getEmail());
        if (optional.isPresent()) {
            Employee employee = optional.get();
            employee.setName(updatedEmployee.getName());
            employee.setAge(updatedEmployee.getAge());
            employee.setDepartment(updatedEmployee.getDepartment());
            employee.setSecurityQuestion(updatedEmployee.getSecurityQuestion());
            employee.setSecurityAnswer(updatedEmployee.getSecurityAnswer());
            employeeRepository.save(employee);
            return ResponseEntity.ok("Profile updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
   
 // STEP 1: Get Security Question
    @PostMapping("/forgot-password/get-security-question")
    public ResponseEntity<?> getSecurityQuestion(@RequestBody EmailRequest request) {
        Optional<Employee> employee = employeeRepository.findByEmail(request.getEmail());
        if (employee.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("securityQuestion", employee.get().getSecurityQuestion());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    // STEP 2: Verify Security Answer
    @PostMapping("/forgot-password/verify-security-answer")
    public ResponseEntity<?> verifySecurityAnswer(@RequestBody SecurityAnswerRequest request) {
        Optional<Employee> employee = employeeRepository.findByEmail(request.getEmail());
        if (employee.isPresent() && employee.get().getSecurityAnswer().equalsIgnoreCase(request.getSecurityAnswer())) {
            return ResponseEntity.ok("Security answer is correct.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect security answer.");
        }
    }

    // STEP 3: Reset Password
    @PostMapping("/forgot-password/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<Employee> employee = employeeRepository.findByEmail(request.getEmail());
        if (employee.isPresent()) {
            Employee user = employee.get();
            user.setPassword(request.getNewPassword());  // Make sure you have setPassword() method
            employeeRepository.save(user);
            return ResponseEntity.ok("Password reset successful.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    
}



//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api")
//
//public class EmployeeController {
//
//    @Autowired
//    private ExcelReaderService excelReaderService;
//
//    @Autowired
//    private EmployeeRepository employeeRepository;
//
//    @PostMapping("/import")
//    public String importFromExcel() {
//        String filePath = "src/main/resources/employees.xlsx";
//
//        List<Employee> employees = excelReaderService.readEmployeesFromExcel(filePath);
//        employeeRepository.saveAll(employees);
//
//        return "Imported " + employees.size() + " employees into database.";
//    }  
//    
//    
//    @Autowired
//    private EmployeeService employeeService;
//
//    @GetMapping("/employees")
//    
//    public List<Employee> getAllEmployees() {
//        return employeeService.getAllEmployees();
//    }
//    @PutMapping("/employees/{id}")
//    public ResponseEntity<Employee> updateEmployee(@PathVariable int id, @RequestBody Employee updatedEmployee) {
//        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
//
//        if (optionalEmployee.isPresent()) {
//            Employee existingEmployee = optionalEmployee.get();
//            existingEmployee.setName(updatedEmployee.getName());
//            existingEmployee.setDepartment(updatedEmployee.getDepartment());
//            existingEmployee.setAge(updatedEmployee.getAge());
//            existingEmployee.setEmail(updatedEmployee.getEmail());
//
//            employeeRepository.save(existingEmployee);
//            return ResponseEntity.ok(existingEmployee);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//    
//    @PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody Employee employee) {
//    	 if (employeeRepository.existsByEmail(employee.getEmail())) {
//    	        return ResponseEntity
//    	                .status(HttpStatus.CONFLICT)
//    	                .body("Email already exists");
//    	    }
//       try{ employeeRepository.save(employee);
//        return ResponseEntity.ok("User registered successfully");}
//       catch (Exception e) {
//           e.printStackTrace(); // logs the error to console
//          
//           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                                .body("Error registering user: " + e.getMessage());
//       }
//      
//
//    	
//
//   
//    }
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Employee employee) {
//        Optional<Employee> foundUser = employeeRepository.findByEmailAndPassword(employee.getEmail(), employee.getPassword());
//        if (foundUser.isPresent()) {
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
//    
//    @GetMapping("/api/employees/email/{email}")
//    public ResponseEntity<Employee> getByEmail(@PathVariable String email) {
//        return employeeRepository.findByEmail(email)
//            .map(ResponseEntity::ok)
//            .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PutMapping("employees/email-update")
//    public ResponseEntity<String> updateEmployee(@RequestBody Employee updatedEmployee) {
//        Optional<Employee> optional = employeeRepository.findByEmail(updatedEmployee.getEmail());
//
//        if (optional.isPresent()) {
//            Employee employee = optional.get();
//            employee.setName(updatedEmployee.getName());
//            employee.setAge(updatedEmployee.getAge());
//            employee.setDepartment(updatedEmployee.getDepartment());
//            employeeRepository.save(employee);
//            return ResponseEntity.ok("Profile updated successfully.");
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
//        }
//    }
//}






//public class EmployeeController {
//
//    private final ExcelReaderService excelReaderService;
//
//    @Autowired
//    public EmployeeController(ExcelReaderService excelReaderService) {
//        this.excelReaderService = excelReaderService;
//    }
//
//    @GetMapping("/employees")
//    public List<Employee> getEmployees(@RequestParam String file) {
//        String filePath;
//
//        if (file.equalsIgnoreCase("excel")) {
//            filePath = "src/main/resources/employees.xlsx";
//            return excelReaderService.readEmployeeFromExcel(filePath);
//        } else if (file.equalsIgnoreCase("csv")) {
//            filePath = "src/main/resources/employees.csv";
//            return excelReaderService.readEmployeeFromCSV(filePath);
//        } else {
//            return Collections.emptyList(); // invalid file type
//        }
//    }
//
//    @GetMapping("/employees/{id}")
//    public Employee getByID(@PathVariable int id, @RequestParam String file) {
//        String filePath;
//        List<Employee> list;
//
//        if (file.equalsIgnoreCase("excel")) {
//            filePath = "src/main/resources/employees.xlsx";
//            list = excelReaderService.readEmployeeFromExcel(filePath);
//        } else if (file.equalsIgnoreCase("csv")) {
//            filePath = "src/main/resources/employees.csv";
//            list = excelReaderService.readEmployeeFromCSV(filePath);
//        } else {
//            return null;
//        }
//
//        for (Employee emp : list) {
//            if (emp.getID() == id) {
//                return emp;
//            }
//        }
//        return null;
//    }
//
//    @PutMapping("/employee/{id}")
//    public String updateEmployee(@PathVariable int id, @RequestParam String file, @RequestBody Employee updatedEmp) {
//        String filePath;
//
//        if (file.equalsIgnoreCase("excel")) {
//            filePath = "src/main/resources/employees.xlsx";
//            return excelReaderService.updateEmployeeInExcel(filePath, id, updatedEmp)
//                    ? "Employee updated successfully in Excel!"
//                    : "Employee not found in Excel!";
//        } else if (file.equalsIgnoreCase("csv")) {
//            filePath = "src/main/resources/employees.csv";
//            return excelReaderService.updateEmployeeInCSV(filePath, id, updatedEmp)
//                    ? "Employee updated successfully in CSV!"
//                    : "Employee not found in CSV!";
//        } else {
//            return "Invalid file type.";
//        }
//    }
//}

//@RestController
//@RequestMapping("/api") 
//public class EmployeeController {
//
//    private final ExcelReaderService excelReaderService;
//
//    @Autowired
//    public EmployeeController(ExcelReaderService excelReaderService) {
//        this.excelReaderService = excelReaderService;
//    }
//
//    @GetMapping("/employees")
//    public List<Employee> getEmployees(@RequestParam String file) {
//    	String filePath;
//    	  if (file.equalsIgnoreCase("excel")) {
//    	        filePath = "src/main/resources/employees.xlsx";
//    	        return excelReaderService.readEmployeeFromExcel(filePath);
//    	    } else if (file.equalsIgnoreCase("csv")) {
//    	        filePath = "src/main/resources/employees.csv";
//    	        return excelReaderService.readEmployeeFromCSV(filePath);
//    	    } else {
//    	        return Collections.emptyList(); // invalid file type
//    	    }
//    	}
//    @GetMapping("/employees/{id}")
//    public Employee getByID(@PathVariable int id){ //path var-> takes value from url and stores it in id
//        String filePath = "src/main/resources/employees.xlsx";
//        List<Employee> list = excelReaderService.readEmployeeFromExcel(filePath);
//        for (Employee emp : list) {
//            if (emp.getID() == id) {
//                return emp;
//            }
//        }
//        return null;
//
//    }
// 
//    @PutMapping("/employee/{id}")
//    public String updateEmployee(@PathVariable int id, @RequestBody Employee updatedEmp) {
//        String filePath = "src/main/resources/employees.xlsx";
//
//        try (FileInputStream fis = new FileInputStream(filePath);
//             Workbook workbook = new XSSFWorkbook(fis)) {
//
//            Sheet sheet = workbook.getSheetAt(0);
//
//            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
//                Row row = sheet.getRow(i);
//                if (row == null) continue;
//
//                int currentId = (int) row.getCell(0).getNumericCellValue();
//
//                if (currentId == id) {
//                    row.getCell(1).setCellValue(updatedEmp.getName());
//                    row.getCell(2).setCellValue(updatedEmp.getDepartment());
//                    row.getCell(3).setCellValue(updatedEmp.getAge());
//                    row.getCell(4).setCellValue(updatedEmp.getEmail());
//                    fis.close(); 
//                    try (FileOutputStream fos = new FileOutputStream(filePath)) {
//                        workbook.write(fos);
//                    }
//
//                    return "Employee with ID " + id + " updated successfully!";
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error occurred while updating employee.";
//        }
//
//        return "Employee with ID " + id + " not found!";
//    }
//}
  
    
//    @GetMapping("/employees-req")
//    public Employee getEmp(@RequestParam int id , @RequestParam String name) {
//    	String filepath= "src/main/resources/employees.xlsx";
//    	 List<Employee> list = excelReaderService.readEmployeeFromExcel(filePath);
//    	 for (Employee emp : list) {
//             if (emp.getID() == id && emp.getName()== name) {
//                 return emp;
//             }
//         }
//         return null;
//    	
 //   }
    
