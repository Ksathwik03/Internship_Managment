const Faculty = require("../models/faculty")
const Student = require("../models/student")

exports.registerStudent = async(req,res) => {
    
    try{
        const {resume,phoneNumber,CGPA} = req.body
        console.log(req.data)
        await Student.findOneAndUpdate({'email' : req.user.email} , 
            {
                resume: resume,
                phoneNumber: phoneNumber,
                CGPA: CGPA
            }
        )
        .catch(err => {
            return res.status(500).json({
                success: false,
                err: err
            })    
        })
        
        return res.status(200).json({
            success: true,
            user: req.user
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }

}


exports.registerFaculty = async(req,res) => {
    
    try{
        const {areaOfInterest,qualifications,website} = req.body

        await Faculty.findOneAndUpdate({'email' : req.user.email} , 
            {
                areaOfInterest: areaOfInterest,
                qualifications: qualifications,
                website: website
            }
        )
        .catch(err => {
            return res.status(500).json({
                success: false,
                err: err
            })    
        })
        
        return res.status(200).json({
            success: true,
            user: req.user
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }

}

exports.getProfile = async(req,res) => {
    
    try{
        return res.status(200).json({
            success: true,
            user: req.user
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }

}