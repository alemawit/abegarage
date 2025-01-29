//import installService to handle communication with the database
const installService = require("../service/install.service");
//create a function to handle the install request
async function install(req, res) {
  //call the install service to create the database
  const installMessage = await installService.install();
  //check if the install was successful
  if (installMessage.status === 200) {
    //send a success response to the client
    res.status(200).json({ message: installMessage });
  } else {
    //if unsuccessful, send an error response to the client
    res.status(500).json({ message: installMessage });
  }
}
//export the install function
module.exports = { install };
