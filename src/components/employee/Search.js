import React, { useEffect, useState } from 'react';

const Search = () => {
    const [jobs, setJobs] = useState([]);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchJobData = async () => {
            const jobData = [
                {
                    id: 1,
                    title: 'Frontend Developer',
                    company: 'Tech Co.',
                    location: 'New York, NY',
                    description: 'We are looking for a skilled Frontend Developer to join our team.',
                },
                {
                    id: 2,
                    title: 'Backend Developer',
                    company: 'Dev Solutions',
                    location: 'San Francisco, CA',
                    description: 'Join our team as a Backend Developer and work on exciting projects.',
                },
                {
                    id: 3,
                    title: 'UI/UX Designer',
                    company: 'Design Studio',
                    location: 'Los Angeles, CA',
                    description: 'Seeking a talented UI/UX Designer to create stunning user interfaces.',
                },
            ];

            const imagePromises = jobData.map(async (job) => {
                const response = await fetch(`https://source.unsplash.com/200x150/?logo`);
                return response.url;
            });

            const imageUrls = await Promise.all(imagePromises);
            const jobsWithImages = jobData.map((job, index) => ({
                ...job,
                imageUrl: imageUrls[index],
            }));

            setJobs(jobsWithImages);
        };

        fetchJobData();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        if (filter === 'all') return true;
        if (filter === 'frontend') return job.title === 'Frontend Developer';
        if (filter === 'backend') return job.title === 'Backend Developer';
        if (filter === 'design') return job.title === 'UI/UX Designer';
        return true;
    });

    const handleApply = () => {
        setShowSuccessDialog(true);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Job Search</h2>
            <h2 className="text-3xl font-semibold mb-8">Explore Job Listings</h2>
            <p className="text-lg text-gray-600 mb-8">All Job Listings by your companies</p>

            {/* Filter */}
            <div className="mb-4">
                <label htmlFor="filter" className="text-sm font-semibold">
                    Filter by:
                </label>
                <select
                    id="filter"
                    className="ml-2 p-2 border border-gray-300 rounded"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="frontend">Frontend Developer</option>
                    <option value="backend">Backend Developer</option>
                    <option value="design">UI/UX Designer</option>
                </select>
            </div>

            {/* Job listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} onApply={handleApply} />
                ))}
            </div>

            {showSuccessDialog && (
                <div className="bg-white p-4 shadow-lg rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h3 className="text-xl font-semibold mb-2">Application Submitted Successfully!</h3>
                    <p>Your application is now under review.</p>
                    <button
                        onClick={() => setShowSuccessDialog(false)}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

const JobCard = ({ job, onApply }) => {
    return (
        <div className="bg-white p-4 shadow-lg rounded-md">
            <img src={job.imageUrl} alt={job.title} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-500">{job.company}</p>
            <p className="text-gray-700 mb-4">{job.location}</p>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <button
                onClick={onApply}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
                Apply
            </button>
        </div>
    );
};

export default Search;
