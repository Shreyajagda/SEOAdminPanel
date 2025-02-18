const model = require('../model/adminModel')
const schema = require('../model/adminModel')
const fs = require('fs')


module.exports.adminLogin = (req, res) => {
  res.render('adminLogin') 
}

module.exports.login = async (req, res) => {
  await schema.findOne({}).then((data) => {    
    if (data.email == req.body.email && data.password == req.body.password) {
      res.cookie('adminData', data) 
      res.redirect('/dashBoard')
    } else {
      res.redirect('/') 
    }
  })
}

module.exports.logout = (req, res) => {
  res.clearCookie('adminData') 
  res.redirect('/')
}

module.exports.dashBoard = (req, res) => {
  // req.cookies.adminData ? res.render('dashBoard') : res.redirect('/')
  res.render('dashBoard')
}

module.exports.adminForm = (req, res) => {
  res.render('adminForm') 
}


module.exports.adminTable = async (req, res) => {
  await model.find({}).then(admins => {
    res.render('adminTable', { admins }) 
  })
}

module.exports.addAdmin = async (req, res) => {
  req.body.image = req.file.path 
  console.log(req.body)
  await model.create(req.body).then(() => {
    res.redirect('/adminTable') 
  })
}


module.exports.adminDelete = async (req, res) => {
  const admin = await model.findById(req.params.id)
  fs.unlinkSync(admin.image) 

  await model.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/adminTable') 
  })
}

module.exports.adminEdit = async (req, res) => {
  const admin = await model.findById(req.params.id) 
  res.render('adminEdit', { admin })
}


module.exports.adminUpdate = async (req, res) => {
  const admin = await model.findById(req.body.id)
  let img

  req.file ? (img = req.file.path) : (img = req.body.image) 
  req.file && fs.unlinkSync(admin.image) 
  req.body.image = img 

  await model.findByIdAndUpdate(req.body.id, req.body).then(() => {
    res.redirect('/adminTable') 
  })
}
