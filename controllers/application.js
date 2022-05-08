const { default: mongoose } = require("mongoose")
const Application = require("../models/Application")
const Internship = require("../models/internship")
const Student = require("../models/student")

exports.ApplyForIntern = async(req,res) => {
    
    try{
        let studentId = req.user.id
        let intershipId = req.params.internshipId
        let {experience , whyHire} = req.body
        let facultyId = await Internship.findById(intershipId).facultyId

        const newApplication = new Application({
                                facultyId: facultyId,
                                intershipId : intershipId,
                                experience: experience,
                                whyHire: whyHire,
                                studentId: studentId                    
                            })
        
        newApplication.save()
        
        return res.status(200).json({
            success: true,
            data: newApplication,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }

}

exports.appliedInterns = async(req,res) => {
    
    try{
        let {applicationId} = req.params.applicationId
        
        const applied = await Application.find({'intershipId': applicationId})
        
        return res.status(200).json({
            success: true,
            data: applied,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }
}


exports.appliedInternships = async(req,res) => {
    
    try{
        let {studentId} = req.user.id
        const applied = await Application.find({'studentId': studentId})
        
        return res.status(200).json({
            success: true,
            data: applied,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }
}


exports.approveIntern = async(req,res) => {
    
    try{
        
        const applicationId = req.params.applicationId
        const application = await Application.findOneAndUpdate(
                                                {'id': applicationId},
                                                {'isApproved' : true})

        
        return res.status(200).json({
            success: true,
            data: application,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }
}


exports.detailedApplication = async(req,res) => {
    
    try{    
        const applicationId = req.params.applicationId
        const application = await Application.findOne({'id': applicationId})
        const student= Student.findOne({'id' : application.studentId})
        
        return res.status(200).json({
            success: true,
            data: application,
            student: student
        });
    }

    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }
}

exports.facultyInterships = async(req,res) => {
  
    try{    
        const facultyId = req.params.facultyID
        const application = await Application.find({'id': facultyId})
        
        return res.status(200).json({
            success: true,
            data: application,
        });
    }

    catch(err){
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }
}
