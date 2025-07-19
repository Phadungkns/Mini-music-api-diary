const mongoose = require('mongoose')//ประกาศใช้งาน mongoose
//ประกาศตัวแปลเก็บข้อมุล
const musicSchema = new mongoose.Schema({
    sid: Number,
    musicname: String,
    artist: String,
    img: String,
    sound: String,
    createdAt:{
        type: String,
        immutable: true
    }
});
//สร้างmodule โดยดึงข้อมูลจาก studentSchema
const Music  = mongoose.model('Music',musicSchema);
module.exports = Music;