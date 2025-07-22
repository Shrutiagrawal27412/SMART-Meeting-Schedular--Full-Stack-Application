package net.javagets.springboot;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;


@Service
public class ExcelReaderService {

    public List<Employee> readEmployeesFromExcel(String filePath) {
        List<Employee> employees = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                Employee emp = new Employee();
                emp.setID((int) row.getCell(0).getNumericCellValue());
                emp.setName(row.getCell(1).getStringCellValue());
                emp.setDepartment(row.getCell(2).getStringCellValue());
                emp.setAge((int) row.getCell(3).getNumericCellValue());
                emp.setEmail(row.getCell(4).getStringCellValue());

                employees.add(emp);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return employees;
    }




    public List<Employee> readEmployeeFromCSV(String filePath) {
        List<Employee> employeeList = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            boolean firstLine = true;
            while ((line = br.readLine()) != null) {
                if (firstLine) {
                    firstLine = false;
                    continue;
                }

                String[] parts = line.split(",");
                if (parts.length < 5) continue;

                Employee emp = new Employee();
                emp.setID(Integer.parseInt(parts[0].trim()));
                emp.setName(parts[1].trim());
                emp.setDepartment(parts[2].trim());
                emp.setAge(Integer.parseInt(parts[3].trim()));
                emp.setEmail(parts[4].trim());

                employeeList.add(emp);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return employeeList;
    }}


//
//@Service
//public class ExcelReaderService {
//
//  public List<Employee> readEmployeeFromExcel(String filePath) {
//      List<Employee> employeeList = new ArrayList<>();
//
//      try (FileInputStream fis = new FileInputStream(filePath);
//           Workbook workbook = new XSSFWorkbook(fis)) {
//
//          Sheet sheet = workbook.getSheetAt(0);
//
//          for (int i = 1; i <= sheet.getLastRowNum(); i++) {
//              Row row = sheet.getRow(i);
//              if (row == null) continue;
//
//              Employee emp = new Employee();
//              emp.setID((int) row.getCell(0).getNumericCellValue());
//              emp.setName(row.getCell(1).getStringCellValue());
//              emp.setDepartment(row.getCell(2).getStringCellValue());
//              emp.setAge((int) row.getCell(3).getNumericCellValue());
//              emp.setEmail(row.getCell(4).getStringCellValue());
//
//              employeeList.add(emp);
//          }
//
//      } catch (Exception e) {
//          e.printStackTrace();
//      }
//
//      return employeeList;
//  }
//
//
//    public boolean updateEmployeeInExcel(String filePath, int id, Employee updatedEmp) {
//        try (FileInputStream fis = new FileInputStream(filePath);
//             Workbook workbook = new XSSFWorkbook(fis)) {
//
//            Sheet sheet = workbook.getSheetAt(0);
//            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
//                Row row = sheet.getRow(i);
//                if (row == null) continue;
//
//                int currentId = (int) row.getCell(0).getNumericCellValue();
//                if (currentId == id) {
//                    row.getCell(1).setCellValue(updatedEmp.getName());
//                    row.getCell(2).setCellValue(updatedEmp.getDepartment());
//                    row.getCell(3).setCellValue(updatedEmp.getAge());
//                    row.getCell(4).setCellValue(updatedEmp.getEmail());
//
//                    fis.close();
//                    try (FileOutputStream fos = new FileOutputStream(filePath)) {
//                        workbook.write(fos);
//                    }
//
//                    return true;
//                }
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return false;
//    }
//
//    public boolean updateEmployeeInCSV(String filePath, int id, Employee updatedEmp) {
//        List<Employee> list = readEmployeeFromCSV(filePath);
//        boolean found = false;
//
//        try (PrintWriter pw = new PrintWriter(new FileWriter(filePath))) {
//            pw.println("ID,Name,Department,Age,Email");
//
//            for (Employee emp : list) {
//                if (emp.getID() == id) {
//                    emp = updatedEmp;
//                    emp.setID(id);
//                    found = true;
//                }
//                pw.printf("%d,%s,%s,%d,%s%n", emp.getID(), emp.getName(), emp.getDepartment(), emp.getAge(), emp.getEmail());
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return found;
//    }
//}


//package net.javagets.springboot;
//import net.javagets.springboot.Employee;
//import org.apache.poi.ss.usermodel.*;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.springframework.stereotype.Service;
//
//import java.io.*;
//import java.util.*;
//
//
//@Service
//
//public class ExcelReaderService {
//	 public List<Employee> readEmployeeFromExcel(String filePath) {
//	        List<Employee> employeeList = new ArrayList<>();
//
//	        try (FileInputStream fis = new FileInputStream(filePath);
//	             Workbook workbook = new XSSFWorkbook(fis)) {
//
//	            Sheet sheet = workbook.getSheetAt(0);
//
//	            for (int i = 1; i <= sheet.getLastRowNum(); i++) {  // skip 1st wala row
//	                Row row = sheet.getRow(i);
//	                if (row == null) continue;
//
//	                Employee emp = new Employee();
//	                emp.setID((int)row.getCell(0).getNumericCellValue());
//	                emp.setName(row.getCell(1).getStringCellValue());
//	                emp.setDepartment(row.getCell(2).getStringCellValue());
//	                emp.setAge((int) row.getCell(3).getNumericCellValue());
//	                emp.setEmail(row.getCell(4).getStringCellValue());
//	                
//	                
//	                
//
//	                employeeList.add(emp);
//	            }
//
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	        }
//
//	        return employeeList;
//	    }
//
//public List<Employee> readEmployeeFromCSV(String filePath) {
//    List<Employee> employeeList = new ArrayList<>();
//
//    try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
//        String line;
//        boolean isFirstLine = true;
//        while ((line = br.readLine()) != null) {
//            if (isFirstLine) {
//                isFirstLine = false;
//                continue; // skip header
//            }
//
//            String[] data = line.split(",");
//            Employee emp = new Employee();
//            emp.setID(Integer.parseInt(data[0].trim()));
//            emp.setName(data[1].trim());
//            emp.setDepartment(data[2].trim());
//            emp.setAge(Integer.parseInt(data[3].trim()));
//            emp.setEmail(data[4].trim());
//
//            employeeList.add(emp);
//        } } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return employeeList;
//    }
//public boolean updateEmployeeInCSV(String filePath, int id, Employee updatedEmp) {
//    List<Employee> list = readEmployeeFromCSV(filePath);
//    boolean found = false;
//
//    try (PrintWriter pw = new PrintWriter(new FileWriter(filePath))) {
//        pw.println("ID,Name,Department,Age,Email"); // write header
//
//        for (Employee emp : list) {
//            if (emp.getID() == id) {
//                emp = updatedEmp; // replace with new data
//                emp.setID(id); // retain ID
//                found = true;
//            }
//            pw.printf("%d,%s,%s,%d,%s\n",
//                      emp.getID(), emp.getName(), emp.getDepartment(),
//                      emp.getAge(), emp.getEmail());
//        }
//
//    } catch (Exception e) {
//        e.printStackTrace();
//        return false;
//    }
//
//    return found;
//}
//
//}