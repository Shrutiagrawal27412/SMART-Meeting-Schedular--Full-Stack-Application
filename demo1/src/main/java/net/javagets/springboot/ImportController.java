package net.javagets.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class ImportController {

    @Autowired
    private ImportService importService;

    @PostMapping("/import-employees")  
    public String importEmployees(@RequestParam String file) {
        return importService.importData(file);
    }
}
