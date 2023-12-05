import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadStudent } from '../services/allAPI'

function StudentsDetails() {
    const [student,setStudents]=useState({
        sname:"",address:"",age:"",email:"",phone:""
    })
    const navigate = useNavigate()
    const handleSave = async (e)=>{
        e.preventDefault()
        const {sname,address,age,email,phone}= student
        if(!sname || !address || !age || !email || !phone){
            alert("Please fill  the form!!!")
        }else{
           const response = await uploadStudent(student)
           console.log(response);
           if(response.status>=201 && response.status<300){
            alert("Successfully uploaded")
            navigate('/students')
           }else{
            console.log(response);
           }
        }
    }
    return (
        <div  className='d-flex justify-content-center align-items-center flex-column mt-5'>
            <h1 className='text-white'>Student Details</h1>
            <div className='border shadow mt-3 rounded p-4 d-flex justify-content-center align-items-center flex-column'>
                <form style={{width:'400px'}} className='d-flex justify-content-center align-items-center flex-column'>
                    <input onChange={(e)=>{setStudents({...student,sname:e.target.value})}} className='form-control mb-3 w-100' type="text" placeholder='Student Name' />
                    <input onChange={(e)=>{setStudents({...student,address:e.target.value})}} className='form-control mb-3 w-100' type="text" placeholder='Address' />
                    <input onChange={(e)=>{setStudents({...student,age:e.target.value})}} className='form-control mb-3 w-100' type="text" placeholder='Age' />
                    <input onChange={(e)=>{setStudents({...student,email:e.target.value})}} className='form-control mb-3 w-100' type="email" placeholder='Email' />
                    <input onChange={(e)=>{setStudents({...student,phone:e.target.value})}} className='form-control mb-3 w-100' type="text" placeholder='Phone Number' />
                    <button onClick={handleSave} className='btn btn-info mt-1 w-100'>SAVE</button>
                </form>
            </div>
        </div>
        )
}

export default StudentsDetails