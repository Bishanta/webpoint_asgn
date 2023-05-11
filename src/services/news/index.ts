import { baseAPI } from "../index.js";

const newsApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getPopular: build.query({
            query: (params = {}) => ({
                url: `search`,
                params
            }),
        }),
        getLatest: build.query({
            query: (params = {}) => ({
                url: `search_by_date`,
                params
            }),
        })
    })
})

export const { useGetPopularQuery, useGetLatestQuery } = newsApi