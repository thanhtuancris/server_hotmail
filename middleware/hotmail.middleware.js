module.exports = {
    add_hotmail2fa:  function(req, res, next) {
        if(!req.body.mail){
            res.status(400).json({
                message: 'Thieu mail'
            })
            return
        }
        if(!req.body.password){
            res.status(400).json({
                message: 'Thieu password'
            })
            return
        }
        // if(!req.body.code2fa){
        //     res.status(400).json({
        //         message: 'Thieu code2fa'
        //     })
        //     return
        // }
        // if(!req.body.mailReco){
        //     res.status(400).json({
        //         message: 'Thieu mailReco'
        //     })
        //     return
        // }
        if(!req.body.status){
            res.status(400).json({
                message: 'Thieu status'
            })
            return
        }
        next()
    },
    hotmail_analyst: function(req, res, next) {
        if(!req.body.token){
            res.status(400).json({
                message: 'Thieu token'
            })
            return
        }
        next()
    }
}