import PageLayout from "../../layouts/PageLayout"


export default function News() {
    return <PageLayout>
        <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Title</h2>
            <div className="flex items-center space-x-2">
            <span className="text-gray-500">Points:</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">Author:</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">time:</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">comments:</span>
            </div>
        </div>
        URL:
        </div>
    </PageLayout>
}