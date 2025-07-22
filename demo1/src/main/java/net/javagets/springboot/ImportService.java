package net.javagets.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javagets.springboot.repository.EmployeeRepository;
import java.util.List;

@Service
public class ImportService {

    @Autowired
    private ExcelReaderService excelReaderService;

    @Autowired
    private EmployeeRepository employeeRepository;

    public String importData(String fileType) {
        String filePath;
        List<Employee> employees = null;

        if (fileType.equalsIgnoreCase("excel")) {
            filePath = "src/main/resources/employees.xlsx";
            employees = excelReaderService.readEmployeesFromExcel(filePath);
          //  List<Employee> employees = excelReaderService.readEmployeesFromExcel(filePath);
          //  employeeRepository.saveAll(employees);
            //return "Excel data saved to DB.";
        } else if (fileType.equalsIgnoreCase("csv")) {
            filePath = "src/main/resources/employees.csv";
            employees = excelReaderService.readEmployeeFromCSV(filePath);
           // List<Employee> employees = excelReaderService.readEmployeeFromCSV(filePath);
           // employeeRepository.saveAll(employees);
            //return "CSV data saved to DB.";
        }else {
        return "Invalid file type!";
    }
        System.out.println("Number of employees to save: " + (employees != null ? employees.size() : 0));
        try{
        	employeeRepository.saveAll(employees);
        }
        catch(Exception e)
        {
        	 e.printStackTrace();
        }
       
        
        System.out.println("Employees saved to database.");

        return fileType + " data saved to DB.";
    }
}
