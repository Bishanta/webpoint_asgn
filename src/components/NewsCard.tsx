export default function NewsCard({ news }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Title: {news.title}</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Points: {news.points}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">Author: {news.author}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">time: {news.created_at}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">comments: {news.num_comments}</span>
                </div>
            </div>
            URL: {news.url}
        </div>
    )
}