const Detail = require('../models/Details');

exports.getPrivateRoute = (req, res, next) => {
    Detail.find({ })
        .then((data) => {
            res.status(200).json({
                sucess: true,
                data: data
            });
        })
        .catch((error) => {
            console.log('error: ', error);
        });
};