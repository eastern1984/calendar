import { AxiosError } from "axios";
import { useGetAxiosRequests } from "../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKeys } from "../../interfaces/types";

export const useGetDayQuery = () => {
    const { getDayData } = useGetAxiosRequests();

    return useQuery([QueryKeys.DAY], () => getDayData(), {
        onSuccess: () => { },
        onError: (error: AxiosError) => {
            //  enqueueSnackbar("Get accounts error", { variant: "error" });
        },
    });
};