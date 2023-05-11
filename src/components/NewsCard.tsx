import { NewsDataType } from "../types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faUser, faClock, faComments, faLink } from "@fortawesome/free-solid-svg-icons";

export default function NewsCard({ news }: {news: NewsDataType}) {

    const newsDate = new Date(news.created_at)
    const formatedDate = newsDate.getFullYear() + "-" + (newsDate.getMonth() + 1) + "-" + newsDate.getDate()

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">{news.title}</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500"> <FontAwesomeIcon icon={faThumbsUp} /> {news.points}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500"><FontAwesomeIcon icon={faUser} /> {news.author}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500"> <FontAwesomeIcon icon={faClock} /> {formatedDate}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500"> <FontAwesomeIcon icon={faComments} /> {news.num_comments ? news.num_comments : 0}</span>
                </div>
            </div>
            {news.url && <a className="text-blue-600" href={news.url} target="_blank"><FontAwesomeIcon icon={faLink} /> {news.url}</a>}
        </div>
    )
}