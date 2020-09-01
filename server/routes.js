const router = require('express').Router();
import userModel from '../src/DB/models';
router.route('/join')
    .post(async (req, res, next) => {
        try {
            const { username, room } = req.body;
            if (typeof username !== undefined && typeof room !== undefined) {
                res.status(200).json({
                    success: 'true',
                    message: 'your user was created successfuly, you will be redirected to your personal page'
                });

            }
        } catch (err) {
            if (err) throw new Error('Something went wrong in creating user on DB')
            return res.status(500).json({
                success: 'false',
                message: 'something went wrong, please try gain'
            })
        }
    });