import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        maxlength : [30 , `Username should not be longer than 15 characters`],
        unique : true
    },
    email : {
        type : String,
        required : true, 
        unique : true,
    }, 
    password: {
        type: String,
        required: true,
        maxlength : [100 , `Username should not be longer than 15 characters`],
    },
    role : {
        type : String,
        enum : ["Admin", "Sales Representative" , "Manager"],
        required : true,
        message : `{VALUE} is not supported`,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }, 
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  };

export default mongoose.model("User" , userSchema);