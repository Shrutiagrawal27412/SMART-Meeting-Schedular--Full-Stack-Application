package net.javagets.springboot;
import jakarta.persistence.*; //JPA-> used to map Java objects to database tables 

@Entity
@Table(name = "employees", uniqueConstraints = {
	    @UniqueConstraint(columnNames = "email")
	})

public class Employee {
	@Id //primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto take id values (serially)
    private int id;

	private String name;
    private String department;
    private int age;
    private String securityQuestion;
    private String securityAnswer;
    
    @Column(nullable = false, unique = true)
    private String email;
    private String password;
    public int getID()
    { return id; }
    public void setID(int id) 
    { this.id = id; }
    
    public String getName() 
    { return name; }
    public void setName(String name) 
    { this.name = name; }

    public String getDepartment() 
    { return department; }
    public void setDepartment(String department) 
    { this.department = department; }

    public int getAge() 
    { return age; }
    public void setAge(int age) 
    { this.age = age; }

    public String getEmail()
    { return email; }
    public void setEmail(String email) 
    { this.email = email; }
    
    public String getPassword()
    { return password; }
    public void setPassword(String password) 
    { this.password = password; }
    
    
    public String getSecurityQuestion() 
        { return securityQuestion; }
    public void setSecurityQuestion(String securityQuestion) 
    { this.securityQuestion = securityQuestion; }
    
    public String getSecurityAnswer() 
    { return securityAnswer; }
    public void setSecurityAnswer(String securityAnswer) 
    { this.securityAnswer = securityAnswer; }
		}
    

