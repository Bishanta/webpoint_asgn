import PageLayout from "../../layouts/PageLayout"
import { useGetAllQuery } from "../../services/news";
import { NewsParamType } from "../../types";
import SearchImage from '../../assets/Curious-rafiki.png'
import ErrorImage from '../../assets/error.png'
import LoadingGif from '../../assets/Loading.gif'
import { useState } from "react";

export default function News() {

    const [params, setParams] = useState<NewsParamType>({
        tags: 'front_page'
    })
    const { data: newsData, isLoading, isFetching, error } = useGetAllQuery(params)
    return <PageLayout>
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
                newsData ? (
                    <>
                        {newsData.hits.map((data: any) => <div className="bg-white rounded-lg shadow-md p-6 mt-10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Title: {data.title}</h2>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-500">Points: {data.points}</span>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-gray-500">Author: {data.author}</span>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-gray-500">time: {data.created_at}</span>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-gray-500">comments: {data.num_comments}</span>
                                </div>
                            </div>
                            URL: {data.url}
                        </div>)}
                    </>) : (
                    <div className="flex flex-col justify-center items-center h-[80vh]">
                        <img src={SearchImage} alt="No data" className="max-w-full w-80 h-auto mt-8" />
                    </div>
                )}

    </PageLayout>
}