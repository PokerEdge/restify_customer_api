export interface User {
    email: {
    type: String,
    required: true,
    trim: true
},
username: {
    type: String,
    required: true,
    trim: true
},
password: {
    type: String,
    required: true
}