module.exports = {
    add_data_checked:  function(req, res, next) {
        if(!req.body.status){
            res.status(400).json({
                message: 'Thieu status'
            })
            return
        }
        if(!req.body.finalNumber){
            res.status(400).json({
                message: 'Thieu finalNumber'
            })
            return
        }
        next()
    },
}