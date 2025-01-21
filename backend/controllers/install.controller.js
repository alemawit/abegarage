//import the install service to handle communication with the database
import installService from '../services/install.service';   
//create a function to handle the install request
const install = async (req, res) => {
  //call the install service to create the database tables
    const installMessage = await installService.install();
};