import { postService, getService, getSingleService, updateService, deleteService } from '../service';

 const createService = async (req, res) => {
    await postService(req, res);
};

 const fetchAllServices = async (req, res) => {
    await getService(req, res);
};

 const fetchSingleService = async (req, res) => {
    await getSingleService(req, res);
};

 const modifyService = async (req, res) => {
    await updateService(req, res);
};

 const removeService = async (req, res) => {
    await deleteService(req, res);
};
export { createService, fetchAllServices, fetchSingleService, modifyService, removeService };
