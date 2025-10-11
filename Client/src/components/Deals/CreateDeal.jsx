import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateDeal = ({ dealData, isVisible, onClose, onDealCreated, onDealUpdated }) => {
    const [formData, setFormData] = useState({
        title: '',
        value: '',
        stage: 'Prospecting',
        closingDate: '',
        contactPerson: '',
        organization: '',
    });

    useEffect(() => {
        if (dealData) {
            setFormData({
                title: dealData.title || '',
                value: dealData.value || '',
                stage: dealData.stage || 'Prospecting',
                closingDate: dealData.closingDate ? new Date(dealData.closingDate).toISOString().split('T')[0] : '',
                contactPerson: dealData.contactPerson || '',
                organization: dealData.organization || '',
            });
        }
    }, [dealData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (dealData) {
                const response = await axios.patch(`/api/deals/${dealData._id}`, formData);
                onDealUpdated(response.data.deal);
            } else {
                const response = await axios.post('/api/deals', formData);
                onDealCreated(response.data.deal);
            }
            onClose();
        } catch (error) {
            console.error('Error saving deal:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{dealData ? 'Edit Deal' : 'Create Deal'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mt-2">
                        <input type="number" name="value" value={formData.value} onChange={handleChange} placeholder="Value" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mt-2">
                        <select name="stage" value={formData.stage} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="Prospecting">Prospecting</option>
                            <option value="Qualification">Qualification</option>
                            <option value="Needs Analysis">Needs Analysis</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Closed Won">Closed Won</option>
                            <option value="Closed Lost">Closed Lost</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <input type="date" name="closingDate" value={formData.closingDate} onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>
                    <div className="mt-2">
                        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Contact Person" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mt-2">
                        <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization" className="w-full p-2 border rounded" />
                    </div>
                    <div className="items-center px-4 py-3">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Save
                        </button>
                    </div>
                </form>
                <div className="items-center px-4 py-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateDeal;
