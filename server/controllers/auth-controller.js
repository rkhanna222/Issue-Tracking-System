import * as authService from  "../services/auth-service.js";


// @route   GET /api/auth
// @desc    Get Auth token
// @access  public
export const get = async(request,response) => {
    try{
        const id = request.id;
       

        const user = await authService.getAuth(id);

        console.log(user, "99999");

        response.status(200).send({
            id : user.id,
            name : user.name,
            email : user.email
        });

        // response.status()
    } catch(error){
        console.error(error.message);
        response.status(500).json({msg : "Token not valid"});
    }
}

// @route   POST /api/auth
// @desc    Reset Password
// @access  public
export const resetPasswordRequestController = async (req, res, next) => {
  console.log("resetPasswordRequestController")
    const requestPasswordResetService = await authService.requestPasswordReset(
      req.body.email
    );
    return res.json(requestPasswordResetService);
  };
  

// @route   GET /api/auth/:id
// @desc    Reset password
// @access  public
  export const resetPasswordController = async (req, res, next) => {

    const token =req.body.token;
    const id = req.body.id;
    const resetPasswordService = await authService.resetPassword(
      id,
      token,
      req.body.password
    );
    return res.json(resetPasswordService);
  };
  
