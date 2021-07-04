function getsalary(empid,empname,salary){  
    this.empid=empid;  
    this.empname=empname;  
    this.salary=salary;  
      
    this.changeSalary=changeSalary;  
    function changeSalary(otherSalary){  
    this.salary=otherSalary;  
    }  
    }  
    
    e=new getsalary(103,"siddhika rakshe",30000);  
    document.write(e.empid+" "+e.empname+" "+e.salary);  
    e.changeSalary(45000);  
    document.write("<br>"+e.empid+" "+e.empname+" "+e.salary);  