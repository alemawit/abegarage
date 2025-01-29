const  pool  = require('../dbconfig/db.config');
const { StatusCodes } = require('http-status-codes');

 async function postService(req, res) {
    const { service_name, service_description } = req.body;
    if (!service_name) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: 'Please provide a service name' });
    }
    try {
        await pool.query(
            'INSERT INTO common_services (service_name, service_description) VALUES (?, ?)', 
            [service_name, service_description]
        );
        return res
            .status(StatusCodes.CREATED)
            .json({ msg: 'Service posted successfully' });
    } catch (error) {
        console.log(error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: 'An unexpected error occurred' });
    }
}

 async function getService(req, res) {
    try {
        const [services] = await pool.query(
            'SELECT * FROM common_services'
        );
        return res.status(StatusCodes.OK).json(services);
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: 'Something went wrong, try again later!',
        });
    }
}

 async function getSingleService(req, res) {
    const { id } = req.params;
    try {
        const [service] = await pool.query(
            'SELECT * FROM common_services WHERE service_id = ? ', 
            [id]
        );
        if (service.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Service not found' });
        }
        return res.status(StatusCodes.OK).json(service);
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: 'Something went wrong, try again later!',
        });
    }
}

 async function updateService(req, res) {
    const {service_id, service_name, service_description } = req.body;
    if (!service_id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Service ID required" });
    }

    try {
        const result = await pool.query(
          "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?",
          [service_name, service_description, service_id]
        );

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Service not found' });
        }

        return res.status(StatusCodes.OK).json({ msg: 'Service updated successfully' });
    } catch (error) {
        console.log(error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: 'An unexpected error occurred' });
    }
}

 async function deleteService(req, res) {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM common_services WHERE service_id = ?', [id]);
        return res.status(StatusCodes.OK).json({ msg: 'Service deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: 'Something went wrong, try again later!',
        });
    }
}
module.exports= { postService, getService, getSingleService, updateService, deleteService };