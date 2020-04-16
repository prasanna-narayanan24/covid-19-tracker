import { useEffect, useContext } from "react";
import * as Types from "../constants/ActionTypes";
import { GlobalContext } from "../providers/ContextProvider";
import API from "../utils/RequestUtil";

const useGlobalStatFetch = (dependencies = []) => {
    const [, dispatch] = useContext(GlobalContext);
    useEffect(() => {
        const onGlobalStatFetchSuccess = res => {
            dispatch({ type: Types.FETCH_GLOBAL_STAT_SUCESS, data: res });
        }

        const onGlobalStatFetchFailed = err => {
            dispatch({ type: Types.FETCH_GLOBAL_STAT_FAILED, data: err });
        }

        API.call("/v2/all", onGlobalStatFetchSuccess, onGlobalStatFetchFailed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, ...dependencies]);
}

export default useGlobalStatFetch;