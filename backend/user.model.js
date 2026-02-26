import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required:true,
            unique:true,

        },
        password: {
            type:String,
            required: true,

        },
        email:{
            type:String,
            required:true,
            unique:true,
        }
    })

    const UserDetails = mongoose.model("details",userSchema)

export default UserDetails