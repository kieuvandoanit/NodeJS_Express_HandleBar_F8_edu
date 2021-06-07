const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');



const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String, maxLength: 255},
    videoID: {type: String, required: true},
    level: {type: String, maxLength: 255},
    slug: {type: String, slug: 'name', unique: true},
},{
    timestamps:true,
});

//Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);

//Course trong ngoặc '' là tên model name. Nó tự động cover thành viết thường và thêm s đằng sau. Giông tên collection bên mongodb