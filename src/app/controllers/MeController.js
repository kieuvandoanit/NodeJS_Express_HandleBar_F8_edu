const Course = require('../models/Course');
const {mutipleMongooseToObject,mongooseToObject} = require('../../util/mongoose');

class MeController{
    // [GET] /me/stored/courses
    storedCourses(req, res, next){
        // res.json(res.locals._sort);
        let courseQuery = Course.find({});
        if(req.query.hasOwnProperty('_sort')){
            const isValidtype = ['asc', 'desc'].includes(req.query.type);
            courseQuery = courseQuery.sort({
                [req.query.column]: isValidtype ? req.query.type :'desc',
            });
        }

        // Cứ cái gì .then, .catch là 1 promise
        // Đối số của .all này là 1 mảng, mảng này là các promise
        // Promise.all lại trả về 1 promise, nên ta lại .then, .catch
        // Nó trả về 2 đối số tương ứng kết quả trả về của 2 promise truyền vô
        Promise.all([Course.countDocumentsDeleted(),courseQuery.find({})])
            .then(([deletedCount, courses]) =>
                res.render('me/stored-courses',{
                    courses: mutipleMongooseToObject(courses),
                    deletedCount
                })
            )
            .catch(next);
                //2 promise ở dưới được gộp vào promise.all
        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: mutipleMongooseToObject(courses)
        //     }))
        //     .catch(next);
    }
    // [GET] /me/trash/courses
    trashCourses(req, res, next){
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses',{
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    
}

module.exports = new MeController;