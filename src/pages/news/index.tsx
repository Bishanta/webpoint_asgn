import PageLayout from "../../layouts/PageLayout"
import { useGetPopularQuery, useGetLatestQuery } from "../../services/news";
import { NewsParamType, NewsDataType } from "../../types";
import Pagination from "../../components/Pagination";
import SearchImage from '../../assets/Curious-rafiki.png'
import useDebounce from '../../hooks/useDebounce';
import ErrorImage from '../../assets/error.png'
import LoadingGif from '../../assets/Loading.gif'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NewsCard from "../../components/NewsCard";
import { useState } from "react";

export default function News() {

    const [params, setParams] = useState<NewsParamType>({
        tags: 'front_page',
        hitsPerPage: 10,
        page: 0,
        query: ''
    })

    const debouncedParams = useDebounce(params, 300);

    const { data: newsData, isLoading, isFetching, error } = params.tags === "front_page" ? useGetPopularQuery(debouncedParams) : useGetLatestQuery(debouncedParams)
    return <PageLayout>

        <div className="relative flex items-center">
            <div className="flex-1 space-x-4">
                <button
                    className={`text-lg font-semibold ${params.tags === "front_page" ? "text-green-500" : "text-gray-600"}`}
                    onClick={() => setParams({ ...params, page: 0, tags: "front_page" })}
                >
                    Popular
                </button>
                <button
                    className={`text-lg font-semibold ${params.tags === "story" ? "text-green-500" : "text-gray-600"}`}
                    onClick={() => setParams({ ...params, page: 0, tags: "story" })}
                >
                    Latest
                </button>
            </div>

            <label className="relative flex-1">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <FontAwesomeIcon className="h-5 w-5 fill-slate-300" icon={faSearch} />
                </span>
                <input
                    value={params.query}
                    onChange={(event) => { setParams({ ...params, query: event.target.value }) }}
                    placeholder="Search for news..."
                    type="text"
                    name="search"
                    className="placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md my-5 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
            </label>
        </div>

        {error ? (<div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops, something went wrong.</h2>
            <p className="text-gray-600 text-lg">Please try again later.</p>
            <img src={ErrorImage} alt="Error" className="max-w-full w-80 h-auto mt-8" />
        </div>) :
            isLoading || isFetching ? (
                <div className="flex justify-center items-center h-[80vh]" >
                    <img src={LoadingGif} alt="loading spinner" className="w-20 h-auto" />
                </div>
            ) :
                newsData.hits.length ? (
                    <>
                        {newsData.hits.map((news: NewsDataType) => <NewsCard news={news} key={news.objectID} />)}
                        <Pagination params={params} setParams={setParams} total={newsData.nbHits} />
                    </>) : (
                    <div className="flex flex-col justify-center items-center h-[80vh]">
                        <img src={SearchImage} alt="No data" className="max-w-full w-80 h-auto mt-8" />
                        <h5 className="text-lg font-bold">No Data Found</h5>
                    </div>
                )}

    </PageLayout>
}