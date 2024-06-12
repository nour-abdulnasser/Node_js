/* **** READ FILE **** */

// import the required modules
const http = require("http");
const fs = require("fs");
const { stringify } = require("querystring");
const { userInfo } = require("os");

// define the paths in variables
const studentsPath = "./students.json";
const coursesPath = "./courses.json";
const departmentsPath = "./departments.json";

// get data from files
const studentsData = JSON.parse(fs.readFileSync(studentsPath, "utf-8")); // readFileSync returns string, so we need to parse
const coursesData = JSON.parse(fs.readFileSync(coursesPath, "utf-8"));
const departmentsData = JSON.parse(fs.readFileSync(departmentsPath, "utf-8"));

// create server, request response logic
const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method == "GET" && url == "/courses") {
    res.end(JSON.stringify(coursesData)); // end takes string
  }
  else if (method == "GET" && url == "/students") {
    // creating the path, defining the request and response
    res.end(JSON.stringify(studentsData)); // end takes string
  }
  else if (method == "GET" && url == "/departments") {
    // creating the path, defining the request and response
    res.end(JSON.stringify(departmentsData)); // end takes string
  }
  else if (method == "POST" && url == "/student") {
    req.on("data", (chunk) => {
      const body = JSON.parse(chunk); // get data

      // check email (isExist?)
      const userIndex = studentsData.findIndex((ele) => {
        return ele.email == body.email;
      });

      if (userIndex != -1) {
        res.statusCode = 409;
        return res.end("email already exists.");
      }

      // generate id
      const studentId = studentsData.length + 1;

      body.id = studentId;
      studentsData.push(body);

      // save to file
      fs.writeFileSync(studentsPath, JSON.stringify(studentsData));
      res.end("New Student Added");
    });
  }
  else if (method == "DELETE" && url.startsWith("/student/")) {
    // We're using startsWith because http module doesn't have params option
    // url.split("/")[2]; // url.split("/") --> ['','student','param']

    const id = +url.split("/")[2]; // + turns it into number from string
    const index = studentsData.findIndex((ele) => ele.id == id);
    if (index == -1) {
      res.statusCode = 400;
      return res.end("ID doesn't exist");
    }

    studentsData.splice(index, 1);

    fs.writeFileSync(studentsPath, JSON.stringify(studentsData));
    res.statusCode = 200;
    res.end("User deleted successfully.");
  }
  else if (method == "PUT" && url.startsWith("/student/")) {
    const id = +url.split("/")[2];

    const userIndex = studentsData.findIndex((ele) => ele.id == id);

    if (userIndex == -1) {
      res.statusCode = 400;
      return res.end("ID does not exist");
    }

    req.on("data", (chunk) => {
      const body = JSON.parse(chunk);
      if (body.email) {
        const isEmail = studentsData.findIndex(
          (ele) => ele.email == body.email && id != ele.id
        ); // checking that no other user has this email

        if (isEmail != -1) {
          res.statusCode = 400;
          return res.end("Email already exists.");
        }
      }
      // update studentsData, how to override
      studentsData[userIndex] = {
        ...studentsData[userIndex],
        ...body,
      };

      fs.writeFileSync(studentsPath, JSON.stringify(studentsData));

      res.statusCode = 200;

      res.end("User updated successfully.");
    });
  }
  else if (method == "GET" && url.startsWith("/student/")) {
    const id = +url.split("/")[2];

    const userIndex = studentsData.findIndex((ele) => ele.id == id);

    if (userIndex == -1) {
      res.statusCode = 400;
      return res.end("ID does not exist");
    }

    return res.end(JSON.stringify(studentsData[userIndex]));
  }
  // get all students with department, course info
  // what is in common (student, department, course)? the department id
  // each student has a department ID
  else if (method == "GET" && url == "/studentsInfo") {
    const getStudentArr = studentsData.map((studentElement) => {
      const dep = departmentsData.find((departmentElement) => {
        return departmentElement.id == studentElement.deptId;
      });
      // get courses related to student department
      const course = coursesData.filter((courseElement) => {
        return courseElement.deptId == studentElement.deptId;
      });
      delete studentElement.deptId;

      return {
        ...studentElement,
        departmentInfo: dep,
        coursesInfo: course,
      };
    });
    return res.end(JSON.stringify(getStudentArr));
  } else if (method == "POST" && url == "/course") {
    req.on("data", (data) => {
      const body = JSON.parse(data);

      //generate id
      const id = coursesData.length + 1;
      body.id = id;

      // add course to courses arr
      coursesData.push(body);

      fs.writeFileSync(coursesPath, JSON.stringify(coursesData));
      res.end("Course added successfully.");
    });
    // update course
  } else if (method == "PUT" && url.startsWith("/course/")) {
    const id = +url.split("/")[2];

    const courseIdIndex = coursesData.findIndex((ele) => ele.id == id);

    if (courseIdIndex == -1) {
      res.statusCode = 400;
      return res.end("Invalid Course ID - Course does not exist.");
    }

    req.on("data", (data) => {
      const body = JSON.parse(data);

      coursesData[courseIdIndex] = {
        ...coursesData[courseIdIndex],
        ...body,
      };

      fs.writeFileSync(coursesPath, JSON.stringify(coursesData));

      res.statusCode = 200;

      res.end("Course updated successfully.");
    });
  } else if (method == "DELETE" && url.startsWith("/course/")) {
    // We're using startsWith because http module doesn't have params option
    // url.split("/")[2]; // url.split("/") --> ['','student','param']

    const id = +url.split("/")[2]; // + turns it into number from string
    const index = coursesData.findIndex((ele) => ele.id == id);
    if (index == -1) {
      res.statusCode = 400;
      return res.end("Course ID doesn't exist");
    }

    coursesData.splice(index, 1);

    fs.writeFileSync(coursesPath, JSON.stringify(coursesData));
    res.statusCode = 200;
    res.end("Course deleted successfully.");
  } else if (method == 'GET' && url.startsWith("/course/")){
    const courseId = +url.split("/")[2];

    const courseIndex = coursesData.findIndex((element)=> element.id == courseId)
    if (courseIndex == -1) {
        res.statusCode = 400;
        return res.end("Course ID invalid - does not exist.")
    }
    res.end(JSON.stringify(coursesData[courseIndex]))
  } 
  // departments
  else if (method == "POST" && url == "/department") {
    req.on("data", (data) => {
      const body = JSON.parse(data);

      //generate id
      const id = departmentsData.length + 1;
      body.id = id;

      // add department to departments arr
      departmentsData.push(body);

      fs.writeFileSync(departmentsPath, JSON.stringify(departmentsData));
      res.end("department added successfully.");
    });
    // update department
  } else if (method == "PUT" && url.startsWith("/department/")) {
    const id = +url.split("/")[2];

    const departmentIdIndex = departmentsData.findIndex((ele) => ele.id == id);

    if (departmentIdIndex == -1) {
      res.statusCode = 400;
      return res.end("Invalid department ID - department does not exist.");
    }

    req.on("data", (data) => {
      const body = JSON.parse(data);

      departmentsData[departmentIdIndex] = {
        ...departmentsData[departmentIdIndex],
        ...body,
      };

      fs.writeFileSync(departmentsPath, JSON.stringify(departmentsData));

      res.statusCode = 200;

      res.end("department updated successfully.");
    });
  } else if (method == "DELETE" && url.startsWith("/department/")) {
    // We're using startsWith because http module doesn't have params option
    // url.split("/")[2]; // url.split("/") --> ['','student','param']

    const id = +url.split("/")[2]; // + turns it into number from string
    const index = departmentsData.findIndex((ele) => ele.id == id);
    if (index == -1) {
      res.statusCode = 400;
      return res.end("department ID doesn't exist");
    }

    departmentsData.splice(index, 1);

    fs.writeFileSync(departmentsPath, JSON.stringify(departmentsData));
    res.statusCode = 200;
    res.end("department deleted successfully.");
  } else if (method == 'GET' && url.startsWith("/department/")){
    const departmentId = +url.split("/")[2];

    const departmentIndex = departmentsData.findIndex((element)=> element.id == departmentId)
    if (departmentIndex == -1) {
        res.statusCode = 400;
        return res.end("department ID invalid - does not exist.")
    }
    res.end(JSON.stringify(departmentsData[departmentIndex]))
  }
  
  
  
  
  else {
    res.statusCode = 404;
    res.end("Invalid URL or method.");
  }
});

// port
server.listen(3000, () => {
  console.log("server is running on port 3000");
});
