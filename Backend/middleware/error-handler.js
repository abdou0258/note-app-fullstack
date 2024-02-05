
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'something went wrong please try again later'
  }
  if(err.name ==='ValidationError'){
    customError.msg = Object.values(err.errors)
      .map((item)=>item.message)
      .join(',')
      customError.statusCode = 400
  }
  if(err.code && err.code ===11000){
      customError.msg = 'This user is Already registered try to log in'
      customError.code = StatusCodes.BAD_REQUEST
  }
    
  if(err.name=='CastError'){
      customError.msg = `no item found with this id:${err.value}`
      customError.statusCode = 404
  }
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg:customError.msg })
}

module.exports = errorHandlerMiddleware
