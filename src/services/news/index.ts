import { baseAPI } from "../index.js";

const newsApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getAll: build.query({
            query: (params = {}) => ({
                url: `search`,
                params
            }),
        }),
        getAllByDate: build.query({
            query: (params = {}) => ({
                url: `search_by_date`,
                params
            }),
        })
    })
})

export const { useGetAllQuery, useGetAllByDateQuery } = newsApi