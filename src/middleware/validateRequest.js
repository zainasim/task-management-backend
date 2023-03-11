import Logging from '../library/Logging.js';

const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params
            });

            return next();
        } catch (error) {
            res.send(error['errors']);
        }
    };
};
export default validateSchema;
