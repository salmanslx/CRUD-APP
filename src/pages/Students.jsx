import React, { useEffect, useState } from 'react'
import { deleteStudent, editStudent, getStudent } from '../services/allAPI'

function Students() {
  const [allStudents, setAllStudents] = useState([])

  const [editMode, setEditMode] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleSave = async (id) => {
    try {
      // Update data on the server
      await editStudent(id,updatedData  );
      getAllStudents();
      setEditMode(null);
      setUpdatedData({});
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setUpdatedData((prevData) => ({ ...prevData, [field]: value }));
  };


  useEffect(() => {
    getAllStudents()
  }, [])
  const handleDelete = async (id) => {
    await deleteStudent(id)
    getAllStudents();
  }

  const getAllStudents = async () => {
    const response = await getStudent()
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      setAllStudents(response.data)
    } else {
      console.log(response);
    }
  }

  const handleEdit = (id) => {
    setEditMode(id);
    // Set initial data to be edited
    setUpdatedData(allStudents.find(student => student.id === id) || {});
  };

  return (
    <div style={{ height: '100vh' }} className='d-flex flex-column justify-content-center align-items-center'>
      <h1 className='text-light'>Students List</h1>
      <div className='w-100 p-5'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th>SL.NO</th>
              <th>Name</th>
              <th>Adress</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
                    <tbody>
            {allStudents?.length > 0 ? (
              allStudents.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{editMode === student.id ? <input className='bg-white' type="text" value={updatedData.sname || ''} onChange={(e) => handleInputChange('sname', e.target.value)} /> : student.sname}</td>
                  <td>{editMode === student.id ? <input className='bg-white' type="text" value={updatedData.address || ''} onChange={(e) => handleInputChange('address', e.target.value)} /> : student.address}</td>
                  <td>{editMode === student.id ? <input className='bg-white' type="text" value={updatedData.age || ''} onChange={(e) => handleInputChange('age', e.target.value)} /> : student.age}</td>
                  <td>{editMode === student.id ? <input className='bg-white' type="text" value={updatedData.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} /> : student.email}</td>
                  <td>{editMode === student.id ? <input className='bg-white' type="text" value={updatedData.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} /> : student.phone}</td>
                  <td>
                    {editMode === student.id ? (
                      <>
                        <button className='bg-success mb-3' onClick={() => handleSave(student.id)}>Save</button>
                        <button className='bg-danger' onClick={() => setEditMode(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <i onClick={() => handleDelete(student.id)} className="fa-solid fa-trash bg-white me-3" style={{ color: 'red' }}></i>
                        <i onClick={() => handleEdit(student.id)} className="fa-regular fa-pen-to-square bg-white" style={{ color: 'black' }}></i>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className='text-danger m-3'>
                  Student List Empty!!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Students