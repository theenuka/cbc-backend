import student from "../models/student.js";

export function getStudent(req,res){
    student.find().then(
     (studentlist)=>{(
         res.json({
             list: studentlist
         })
     )}
    )
 }

 export function createStudent(req,res){
    const Student  = new student(req.body);
    Student.save().then(()=>{
        res.json({
            message: "Student created"
        })
    }).catch(()=>{
        res.json({
            message: "Student not created",
        })
    })
}

export function deleteStudent(req,res){
    student.deleteOne({name: req.body.name}).then(()=>{
        res.json({
            message: "Student deleted successfully"
        })
    } )}



