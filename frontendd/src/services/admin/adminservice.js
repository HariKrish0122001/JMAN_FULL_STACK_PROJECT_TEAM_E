import Localhost from '../../Http/http';

const adminApiService = {
  createTraining: async (trainingData) => {
    try {
      const response = await Localhost.post(
        `/admin`,
        trainingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchDeletedTrainings: async () => {
    try {
      const response = await Localhost.get(`deleted_trainings`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  restoreTraining: async (trainingId) => {
    try {
      const response = await Localhost.post(`/restore`, { id: trainingId });
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchUpcomingTrainings: async () => {
    try {
      const response = await Localhost.get(`/get_trainings`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteTraining: async (trainingId) => {
    try {
      const response = await Localhost.post(`/dtrain`, { training_id: trainingId });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default adminApiService;
