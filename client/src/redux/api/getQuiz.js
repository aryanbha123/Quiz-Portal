import axios from "axios";
import { BASE_URL } from "../../config";
import store from "../store";
import { incrementPage, quizFailure, quizRequest, quizSuccess, setHasMore } from "../reducers/quizReducer";

export const getQuiz = async () => {
    const {data , page} = store.getState().quiz;
    store.dispatch(quizRequest());
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/quiz/get?page=${page}&limit=${10}&search=`);
        console.log(res);
        store.dispatch(incrementPage());
        store.dispatch(quizSuccess(res.data.data));
        if(res.data.totalPages <= page){
            store.dispatch(setHasMore());
        }

    } catch (error) {
        store.dispatch(quizFailure(error.message));
        console.log(error)
    }
}