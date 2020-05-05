const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')

adminController = {

    /**
     * Compares the login info with input
     */
    loginAdmin: async (req, res) => {
        try {
            let input = req.body;
            let admin = await Admin.findOne({ username: input.username })

            // checks if username is valid
            if(admin){
                // checks if password is valid
                bcrypt.compare(input.password, admin.password, function(err,equal){
                    // if password input and password inasdasd db match
                    if(equal){
                        // saves user idnum to current session
                        req.session.admin_id = input.username;
                        console.log(req.session.admin_id)
                        console.log(req.sessionID)
                        req.session.save(function(){
                            if(req.session.admin_id){
                                res.send('New Session Created')
                            }
                            else{
                                res.send('Session was not created')
                            }
                        })
                        
                    }
                    else{
                        res.status(404).json({ message: 'Invalid Username/Password' });
                    }
                })
            }
            else{
                res.status(404).json({ message: 'Invalid Username/Password' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }        
    },
    /**
     * checks if user is currently logged in or not
     */
    getAdminLogin: async (req,res) => {
        console.log(req.session.admin_id)
        console.log(req.sessionID)
        res.status(200).json(req.session);
    },
    /**
     * logs out current user by clearing current session
     */
    logoutAdmin: async (req,res) => {
        console.log(req.session)
        req.session.destroy()
        console.log(req.session)
        res.send('Session removed')
    },

}

module.exports = adminController