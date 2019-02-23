// var link = [104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115]

// // Function to parse the link based of charcode
// function parseLink(value) {
//     let computedText = ''
//     value.forEach(element => {
//         computedText += String.fromCharCode(element)
//     })

//     return computedText
// }

// // Run Parse link function
// console.log(parseLink(link))

// Assuming you have already done "npm install fernet"
let fernet = require('fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABccYf07mj1WhYBGxshnng3NMr7Fidig5x6wsQXHed8oLVVB5RzeZHZOERAtO-xwVFHj2k9DcBk-GSJmUaKaOS3MDYcD-YcldajCN79i4ugjSc201euekeuq95yveRwkR4oQmU2vfA3anBRd5UiOqzKEbziqFt-6BunkYOy_ZpqUKZdJbs4JAF5pT50aR1jXL0yhdXm'
let token = new fernet.Token({secret: secret, token: message, ttl:0})
console.log(token.decode())