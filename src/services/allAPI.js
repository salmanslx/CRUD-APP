import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

// upload student details
export const uploadStudent = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/students-list`,reqBody)
}

// Get student details
export const getStudent = async()=>{
    return await commonAPI("GET",`${serverURL}/students-list`,"")
}

// Delete student details
export const deleteStudent = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/students-list/${id}`,{})
}

// edit student details
export const editStudent = async (id,reqBody) => {
    return await commonAPI("PUT",`${serverURL}/students-list/${id}`,reqBody)
}