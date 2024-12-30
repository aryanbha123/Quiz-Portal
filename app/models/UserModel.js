import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuid } from 'uuid'
const userSchema = new Schema(
    {
        _id:{type:String, default: uuid},
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        image:String,
        password: { type: String , sparse:true },
        role: { type: String, required: true, enum: ["admin", "user"], default: 'user' },
        phone:String,
        dob:{type:Date},
        solutions:{type:String,default:0},
        program:String,
        university:String
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.email =  this.email = this.email.toLowerCase();
        next();
    } catch (err) {
        next(err);
    }
});



const Users = model("Users", userSchema);

export default Users;
