import mongoose from "mongoose"

const studentschema = mongoose.Schema({
            name: String,
            age: Number,
            gender: String
        })
        const student = mongoose.model("student",studentschema)

export default student