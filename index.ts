#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"


// Displaying a header for the student management system
console.log(chalk.rgb(0, 255, 255).italic.bold("\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\t\t************* Student Managment system *************\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\t"));

// Main function to interact with user
function studentForm() {

  // Prompting the user to choose an action
    inquirer.prompt([
      {
        type: 'list',
        name: 'selected',
        message: chalk.italic.rgb(255, 182, 193)("Choose one of the following management."),
        choices: [
          'Add Student',        // this will take inquiry about the student
          'Enroll Student',     // this will enroll student in course a they select
          'Pay Tuition',        // fee payment process
          'View Balance',       // balnace remaining
          'Show Status',        // show all data about student 
          'Exit'                // smooth way to exit 
        ]
      }
    ]).then(answers => {
      // Handling user selection
      switch (answers.selected) {
        case 'Add Student':
          addStudent();
          break;
        case 'Enroll Student':
          EnrollCandidate();
          break;
        case 'Pay Tuition':
          payFees();
          break;
        case 'View Balance':
          viewBalance();
          break;
        case 'Show Status':
          showStatus();
          break;
        case 'Exit':
          console.log(chalk.yellowBright.italic.bold('\n\t\t\tThank you for using the Student Management System!\n\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\t'));
          break;
        default:
          console.log(chalk.red.italic.bold('\nYou selected invalid management.\n'));
          studentForm();
      }
    });
  }
 // Start the program
 studentForm();

 //Defining interfaces for StudentInfo and Course
interface StudentInfo {
    id: string;
    student: string;
    fname :string
    courses: Course[];
    balance: number;
  }

interface Course {
    
    name: string,
    creditHours :number,
    fee: number

}

// Class for managing student information
class studentManagment {
  private studentinfo: StudentInfo[] = []
  private studentID: string;
  private coursesEnrolled:Course[];
  paid : number[]
   
  constructor() {
    this.studentID = this.generateStudentID();
    this.paid = [0]
    this.coursesEnrolled =[
          {  name: 'Mathematics ', creditHours: 2, fee: 1000 },
          { name: 'Biology ', creditHours: 1, fee: 1000 },
          { name: 'English ', creditHours: 1, fee: 1000 },
          { name: 'Physics ', creditHours: 1, fee:  2000},
          { name: 'Chemistry ', creditHours: 2, fee: 1000},
          { name: 'Islamiat ', creditHours: 1, fee: 500},
          { name: 'Urdu ', creditHours: 1/2, fee: 500},
        ];
      
    
}

    // Function to generate a student ID
    private generateStudentID(): string {
        return Math.floor((Math.random() * 90000) + 1).toString()
    }

    // Getters for student information 
    getStudentInfo(): StudentInfo[] {
        return this.studentinfo;
    }
    // Getters for  enrolled courses
    getcourses() :Course[]{
        return this.coursesEnrolled
    }


    // add Student NAME + father name with id 
    addstudent(student :string, fname : string){
        const id = this.generateStudentID()  
        let students : StudentInfo = {student,fname,id,courses: [] , balance : 0}
        this.studentinfo.push(students)   
        
        console.log(chalk.rgb(238, 130, 238).italic.bold
         (`\nStudent "${student.toUpperCase()} ${fname.toUpperCase()}" added in School managment `));
            
        console.log(chalk.yellow.italic.bold
        (`\n${student.toUpperCase()} Id number is:  ${id}\n`));
         
    }

    //  enroll course in studentinfo array
    enrollStudent( studentID : string,course: string): void {
       let student = this.studentinfo.find(stu => stu.student === studentID)
       const cour = this.coursesEnrolled.find(c => c.name === course);
        
      if(student && cour){
          student.courses.push(cour);
          student.balance += cour.fee;
          console.log(chalk.rgb(238, 130, 238).italic.bold(`\nStudent ${student.student.toUpperCase()}  "ID no ${chalk.yellowBright(student.id)}" enroll in subject : ${chalk.yellowBright(course)} which fee is: ${chalk.yellowBright(cour.fee)} \n\t`));
      } else{
        console.log(chalk.red.italic.bold(" Error :The student is not found in management."));
      }
          
    }
    
  
    // fuction to pay tution fees 
    tutionfee(studentID: string ,amount : number){
      const student = this.studentinfo.find(s => s.id === studentID);
     
      if (!student) {
        console.log(chalk.red.bold.italic('\nError: Student not found.\n'));
        return;
      }
      if (amount > student.balance) {
        const change = amount - student.balance;
        let paids = amount - change 
        console.log(chalk.rgb(238, 130, 238).bold.italic(`\nPlease take the funds that you paid extra. Rs/${change}- your paid amount is ${paids}\n` ));
        student.balance -= paids
        
      } else {
         let  paid = student.balance -= amount ;
         console.log(chalk.rgb(238, 130, 238).bold.italic(`\nStudent ${student.student} paid Rs.${amount} and their remaining balance is: Rs.${paid}/-\n`));
       }
        
     
       
       let submit =  student.balance + Number(amount)
       let gud = submit - student.balance

   
       this.paid.push(gud)// this will store paid amount 
       
        
    }

    // balance check function
    viewbalance(studentID : string){
      const student = this.studentinfo.find(s => s.id === studentID);
  
      if (!student) {
        console.log(chalk.red.bold.italic('\nError: Student not found.\n'));
        return;
      }else {
        console.log(chalk.rgb(238, 130, 238).bold.italic(`\nStudent ${student.student}'s remaining balance for the course cost is: Rs.${student.balance}/-\n`));
        
      }
     
    }

    // show all the info about student 
    showStatus(studentId: string): void {
        const student = this.studentinfo.find(s => s.id === studentId);
        if (!student) {
          console.log(chalk.red.bold.italic('\nStudent not found.\n'));
          return;
        }
        console.log(chalk.rgb(0, 255, 255).bold.italic(`\nStudent ID: "${chalk.rgb(255, 0, 255)(student.id)}"`));
        console.log(chalk.rgb(0, 255, 255).bold.italic(`Name: "${chalk.rgb(255, 0, 255)(student.student)}"`));
        console.log(chalk.rgb(0, 255, 255).bold.italic(`father-Name: ${chalk.rgb(255, 0, 255)(student.fname)}`));
        student.courses.forEach(course => {
          console.log(chalk.rgb(0, 255, 255).bold.italic(`Courses Enrolled: ${chalk.rgb(255, 0, 255)(course.name)}`));
          console.log(chalk.rgb(0, 255, 255).bold.italic(`Courses Enrolled fees : ${chalk.rgb(255, 0, 255)(course.fee)}`));
          console.log(chalk.rgb(0, 255, 255).bold.italic(`Credit hours to be taken.: ${chalk.rgb(255, 0, 255)(course.creditHours)}`));
        });
        
       
        console.log(chalk.rgb(0, 255, 255).bold.italic(`\nPaid Balance: Rs.${chalk.rgb(255, 0, 255)(this.paid.reduce((ary, bl3) =>  ary +  bl3 ))}/-`));
        console.log(chalk.rgb(0, 255, 255).bold.italic(`Total Balance: Rs.${chalk.rgb(255, 0, 255)(student.balance)}/-\n`));

    }
}


//
let school = new studentManagment()

// this function is used an urgument of addstudent class method
function addStudent() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: chalk.italic.rgb(255, 182, 193)('please Enter student name:'),
        validate: input => /^[A-Za-z]+$/.test(input) ? true : 'Please enter only alphabetical characters.'
      },{
        type: 'input',
        name: 'fname',
        message: chalk.italic.rgb(255, 182, 193)('Enter your Father name:'),
        validate: input => /^[A-Za-z]+$/.test(input) ? true : 'Please enter only alphabetical characters.'
      }
    ]).then(answers => {
      school.addstudent(answers.name,answers.fname);
      studentForm()
    });
}

// this function is used an urgument of enrollstudent class method
function EnrollCandidate () {
    const students = school.getStudentInfo();
    const courses = school.getcourses();
  if(students.length === 0 || courses.length === 0) {
    console.log(chalk.red.italic.bold('\nNo students or courses found.\n'));
    studentForm();
    return;
  }
    inquirer.prompt([
     {
        type: 'list',
        name: 'studentId',
        message: chalk.italic.rgb(255, 182, 193)('Select the student name :'),
        choices: students.map(student => student.student)
      },
      {
        name: "enroll",
        type: "list",
        message: chalk.italic.rgb(255, 182, 193)("Select the course you want to enroll"),
        choices: courses.map(course => ({ name: course.name, value: course.name , fees : course.fee}))
      }
    ]).then(answer =>{
        school.enrollStudent(answer.studentId , answer.enroll) 
        studentForm()
    })
}


// this function is used an urgument of tutionfees class method
function payFees(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'studentId',
      message: chalk.italic.rgb(255, 182, 193)('Type the student ID here:'),
      validate: input => /^\d+$/.test(input) ? true : 'Please enter only numerical digits for the student ID.'
    },
    {
      type: 'input',
      name: 'amount',
      message: chalk.italic.rgb(255, 182, 193)('Enter amount to pay:'),
      validate: input => /^\d+$/.test(input) ? true : 'Please enter only numerical digits for the amount.'
    }
  ]).then(answers => {
         school.tutionfee(answers.studentId,answers.amount)
         studentForm()

  })

}

// this function is used an urgument of viewbalance class method
function viewBalance(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'studentId',
      message: chalk.italic.rgb(255, 182, 193)('Enter student ID:'),
      validate: input => /^\d+$/.test(input) ? true : 'Please enter only numerical digits for the student ID.'
    }
  ]).then(answers => {
      school.viewbalance(answers.studentId)
      studentForm()
    }
  )

}


// this function is used an urgument of showstatus class method
function showStatus(){
  inquirer.prompt(
    [
      {
        type: 'input',
        name: 'studentId',
        message: chalk.italic.rgb(255, 182, 193)('Enter the ID of the student:'),
        validate: input => /^\d+$/.test(input) ? true : 'Please enter only numerical digits for the student ID.'
      }
    ]
  ).then(answers=> {
        school.showStatus(answers.studentId)
        studentForm();
    }
  )
}

