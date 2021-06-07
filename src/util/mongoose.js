module.exports = {
    //Xu ly return array
    mutipleMongooseToObject: function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject():mongoose;
        // Neu co 1 thi return 1.toObject, neu khong thi return lai chinh no
    }
}