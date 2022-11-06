const express = require('express');
var app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended : true
}
))

app.use(express.json());
//app.use(express.json);
var courses = [
    {id:1, name:"C++"},
    {id:2, name: "JAVA"},
    {id:3, name: "PYTHON"},
    {id:4, name: "RDBMS"},
    {id:5, name: ".NET"}
]
 app.get('/', (req, res)=>{
    res.send(`<html>   
    <h1>Example of CRUD Operations</h1>
    <h3>Options Available:</h3>
    <br>
    <br>
    <a href="/api/courses">Get All Courses</a>
    <br>
    <br>
    <a href="/add">Add New Course</a>
    <br>
    <br>
    <a href="/update">Update Course Name</a>
    <br>
    <br>
    <a href="/delete">Delete Any Course</a>
            </html>`)
    //  res.send("Hello World");
 });

app.get('/add',(req, res)=>{
    res.send(`<html>
    <h2>To Add New Course</h2>
    <h4>Enter Course Name:</h4>
        <form method='post' action='/api/add'>
            <input type='text' placeholder='Course' name='course'>
            <input type='submit' value='ADD'>
        </form> 
        <a href='/'>Go Back</a>        
    </html>`)
})

app.get('/update',(req, res)=>{
    res.send(`<html>
    <h2>To Update Any Course</h2>
    <h4>Enter Course Id:</h4>
        <form method='post' action='/api/courses/update'>
            <input type='text' placeholder='Course Id' name='id'>
            <input type='text' placeholder='Course' name='name'>
            <input type='submit' value='Search'>
        </form> 
        <a href='/'>Go Back</a>        
    </html>`)
})

app.get('/delete',(req, res)=>{
    res.send(`<html>
    <h2>To Remove Any Course</h2>
    <h4>Enter Course Id:</h4>
        <form method='post' action='/api/courses/delete'>
            <input type='text' placeholder='Course Id' name='id'>
            <input type='submit' value='Delete'>
        </form> 
        <a href='/'>Go Back</a>
    </html>`)
})

app.get('/api/courses',(req, res)=>{
    res.send(courses);
    // res.send(`<html>

    // </html>`)
})
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find((c) =>{
        return c.id === parseInt(req.params.id);
    })
    if (!course) res.status(404).send("Course not found.");
    console.log(course);
    res.send(course);
})

app.post('/api/add', (req, res)=>{
    // console.log(req.body);
    if(req.body.course){
        const new_course = {
            id: courses.length + 1,
            name: req.body.course
        };
        courses.push(new_course);
        res.send(`<html>
        <h1>Course Successfully Added.</h1>
        <a href='/'>Go Back</a>
        </html>`)
    }
    else{
        res.send(`<html>
        <h1>Course Name Not Found.</h1>
        <a href='/'>Go Back</a>
        </html>`)
    }
})

app.post('/api/courses/update', (req,res)=>{
    // console.log(req.body);
    // console.log('abhi');
    if (req.body.id){
        const course = courses.find((c)=>{
            return c.id === parseInt(req.body.id);
        });
        if (!course) res.status(404).send("Course not Found");
        
        if (!req.body.name || req.body.name.length < 3){
            res.status(400).send("Bad Request");
            return;
        }
        if(course){
            course.name = req.body.name;
            res.send(`<html>
            <h1>Course Successfully Updated.</h1>
            <a href='/'>Go Back</a>
            </html>`);
        }
    }else{
        res.send(`<html>
        <h1>Course Id Not Found.</h1>
        <a href='/'>Go Back</a>
        </html>`)
    }
});

app.post("/api/courses/delete", (req, res)=>{
    if (req.body.id){
        const course= courses.find((c)=>{
            return c.id === parseInt(req.body.id);
        });
    
        if (!course) res.status(404).send("Course not find");
    
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        if(course){
            res.send(`<html>
            <h1>Course Successfully Deleted.</h1>
            <a href='/'>Go Back</a>
            </html>`);
        }
    }else{
        res.send(`<html>
        <h1>Course Id Not Found.</h1>
        <a href='/'>Go Back</a>
        </html>`)
    }
    
})
app.listen(port,()=> {
    console.log(`App is running on http://localhost:${port}`);
});