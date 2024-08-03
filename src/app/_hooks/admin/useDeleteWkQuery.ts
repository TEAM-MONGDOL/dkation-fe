import api from '@/_hooks/Axios';

export const deleteWkQuery = async (wktId: number) => {
  try {
    return await api.delete(`api/wkt/${wktId}`).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};
