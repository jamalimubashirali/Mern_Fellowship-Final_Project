import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateDeal from './CreateDeal';

const Deals = () => {
    const [deals, setDeals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await axios.get('/api/deals');
                setDeals(response.data.deals);
            } catch (error) {
                console.error('Error fetching deals:', error);
            }
        };
        fetchDeals();
    }, []);

    const handleCreateDeal = () => {
        setSelectedDeal(null);
        setIsModalOpen(true);
    };

    const handleEditDeal = (deal) => {
        setSelectedDeal(deal);
        setIsModalOpen(true);
    };

    const handleDeleteDeal = async (dealId) => {
        try {
            await axios.delete(`/api/deals/${dealId}`);
            setDeals(deals.filter((deal) => deal._id !== dealId));
        } catch (error) {
            console.error('Error deleting deal:', error);
        }
    };

    const handleDealCreated = (newDeal) => {
        setDeals([...deals, newDeal]);
    };

    const handleDealUpdated = (updatedDeal) => {
        setDeals(deals.map((deal) => (deal._id === updatedDeal._id ? updatedDeal : deal)));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Deals</h1>
            <button onClick={handleCreateDeal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Create Deal
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Value</th>
                            <th className="py-2 px-4 border-b">Stage</th>
                            <th className="py-2 px-4 border-b">Closing Date</th>
                            <th className="py-2 px-4 border-b">Contact Person</th>
                            <th className="py-2 px-4 border-b">Organization</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deals.map((deal) => (
                            <tr key={deal._id}>
                                <td className="py-2 px-4 border-b">{deal.title}</td>
                                <td className="py-2 px-4 border-b">{deal.value}</td>
                                <td className="py-2 px-4 border-b">{deal.stage}</td>
                                <td className="py-2 px-4 border-b">{new Date(deal.closingDate).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">{deal.contactPerson}</td>
                                <td className="py-2 px-4 border-b">{deal.organization}</td>
                                <td className="py-2 px-4 border-b">
                                    <button onClick={() => handleEditDeal(deal)} className="bg-green-500 text-white px-2 py-1 rounded">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteDeal(deal._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateDeal
                dealData={selectedDeal}
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDealCreated={handleDealCreated}
                onDealUpdated={handleDealUpdated}
            />
        </div>
    );
};

export default Deals;
