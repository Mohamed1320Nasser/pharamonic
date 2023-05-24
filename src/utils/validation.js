const AppError = require("./AppError")

const dataMethod = ['body', 'params', 'headers']

exports.validation = (Schema) => {
    return (req, res, next) => {
        try {
            const validationArr = []
            dataMethod.forEach(key => {
                if (Schema[key]) {
                    const validationResult = Schema[key].validate(req[key], { abortEarly: false, })
                    if (validationResult?.error?.details) {
                        validationResult.error.details.forEach((detail) => {
                            const { message, path } = detail;
                            validationArr.push({ message,path});
                        });
                    }
                }
            })
            if (validationArr.length) {
                return res.status(400).json({ message: "Validation error", validationArr })
            } else {

                return next()

            }
        } catch (error) {
            return next(new AppError("validation err", 500))
        }
    }
}