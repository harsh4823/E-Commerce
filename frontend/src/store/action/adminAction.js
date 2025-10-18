import api from "c:/Users/HP/OneDrive/Desktop/Projects/E-Commerce/frontend/src/api/api"

export const fetchAnalyticsData = () => async (dispatch) => {
    try {
        const { data } = await api.get("/admin/app/analytics");
        dispatch({
            type: "Fetch_Analytics_Data",
            payload: data,
        });
        
    } catch (error) {
        console.error(error);
    }
}