import PageLayout from "../../layouts/PageLayout"
import { useGetAllQuery } from "../../services/news";
import { NewsParamType } from "../../types";
import Pagination from "../../components/Pagination";
import SearchImage from '../../assets/Curious-rafiki.png'
import ErrorImage from '../../assets/error.png'
import LoadingGif from '../../assets/Loading.gif'
import NewsCard from "../../components/NewsCard";
import { useState } from "react";

export default function News() {

    const [params, setParams] = useState<NewsParamType>({
        tags: 'front_page',
        hitsPerPage: 10,
        page: 0
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
                        {newsData.hits.map((news: any) => <NewsCard news={news} key={news.objectID} />)}
                        <Pagination params={params} setParams={setParams} total={newsData.nbHits} />
                    </>) : (
                    <div className="flex flex-col justify-center items-center h-[80vh]">
                        <img src={SearchImage} alt="No data" className="max-w-full w-80 h-auto mt-8" />
                    </div>
                )}

    </PageLayout>
}