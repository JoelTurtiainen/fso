const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fullstack.kpfpv.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const User = mongoose.model('User', userSchema)

if (process.argv.length >= 5) {
  const user = new User({
    name: process.argv[3],
    number: process.argv[4]
  })

  user.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)

    mongoose.connection.close()
  })
} else {
  User.find({}).then(result => {
    console.log('phonebook:')

    result.forEach(user => {
      console.log(`${user.name} ${user.number}`)
    })

    mongoose.connection.close()
  })
}
