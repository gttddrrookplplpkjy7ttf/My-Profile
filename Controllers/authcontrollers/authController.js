const User = require('../../Models/user/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.getUsers = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมด
    const users = await User.find();

    // ส่งข้อมูลผู้ใช้ทั้งหมดกลับไป
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Get Users Error');
  }
};


exports.AddUser = async (req, res) => {
  try {
    const adduser = new User(req.body);
    await adduser.save();
    res.send('AddUser Complete');
  } catch (err) {
    console.log(err);
    res.status(500).send('AddUser Error');
  }
}


exports.register = async (req, res) => {
  try {
    // CheckUser
    const { name, password } = req.body
    const user = await User.findOne({ name })
    // res.send('no')
    if (user) {
      return res.send('User Already Exists').status(400)
    }
    // Encrypt
    const salt = await bcrypt.genSalt(10);
    console.log(salt)

    newUser = new User({
      name,
      password
    })
    newUser.password = await bcrypt.hash(password, salt) // password hash
    console.log(newUser)
    // Save
    await newUser.save()
    res.send('Register Success')

  } catch (err) {

    console.log(err)
    res.status(500).send('Register Error')
  }
}


exports.login = async (req, res) => {
  try {
    // check user
    const { name, password } = req.body
    var CheckUser = await User.findOne({ name }); // ใช้ findOne แทน findOneAndUpdate

    console.log(CheckUser)
    if (CheckUser) {
      const isMatch = await bcrypt.compare(password, CheckUser.password)
      if (!isMatch) {
        return res.status(400).send('Password Invalid !!')
      }
      // payload
      var payload = {
        user: {
          name: CheckUser.name
        }
      }
      // generate token
      jwt.sign(payload, 'jwtsecret', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });      
    } else{
      return res.status(400).send('User not Found!!')
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('login Error')
  }
}