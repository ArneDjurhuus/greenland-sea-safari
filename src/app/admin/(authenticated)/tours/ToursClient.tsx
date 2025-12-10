"use client";

import { useState, useEffect } from 'react';
import { Heading } from '@/components/ui/Typography';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { TourData } from './types';
import Modal from '@/components/ui/Modal';
import { createTour, updateTour, deleteTour, toggleTourStatus } from '@/app/actions/tourActions';

interface ToursClientProps {
    initialTours: TourData[];
}

export default function ToursClient({ initialTours }: ToursClientProps) {
    const [tours, setTours] = useState<TourData[]>(initialTours);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTour, setEditingTour] = useState<TourData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTours(initialTours);
    }, [initialTours]);

    const handleOpenModal = (tour?: TourData) => {
        setEditingTour(tour || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTour(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            if (editingTour) {
                await updateTour(editingTour.id, formData);
            } else {
                await createTour(formData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error saving tour:', error);
            alert('Failed to save tour');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this tour?')) return;
        try {
            await deleteTour(id);
        } catch (error) {
            console.error('Error deleting tour:', error);
            alert('Failed to delete tour');
        }
    };

    const handleToggleStatus = async (tour: TourData) => {
        try {
            await toggleTourStatus(tour.id, !tour.is_active);
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Failed to update status');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Heading level={1} className="text-arctic-blue">Tours</Heading>
                    <p className="text-arctic-night/60">Manage your tour offerings</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-arctic-blue text-white rounded-lg text-sm font-medium hover:bg-arctic-blue/90 shadow-lg shadow-arctic-blue/20"
                >
                    <Plus className="w-4 h-4" />
                    Add New Tour
                </button>
            </div>

            {/* Tours Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
                        No tours found. Add your first tour to get started.
                    </div>
                ) : (
                    tours.map((tour) => (
                        <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                            {/* Tour Image Placeholder */}
                            <div className="h-32 bg-linear-to-br from-arctic-blue to-arctic-night flex items-center justify-center">
                                <span className="text-white/50 text-sm">Tour Image</span>
                            </div>
                            
                            {/* Tour Info */}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-gray-900 leading-tight">{tour.title}</h3>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                        tour.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {tour.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                    {tour.description || 'No description available.'}
                                </p>
                                
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">{tour.duration || 'Duration TBD'}</span>
                                    <span className="font-bold text-arctic-blue">DKK {tour.price_dkk.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <button 
                                    onClick={() => handleOpenModal(tour)}
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-arctic-blue transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleToggleStatus(tour)}
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-arctic-blue transition-colors"
                                >
                                    {tour.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                    {tour.is_active ? 'Disable' : 'Enable'}
                                </button>
                                <button 
                                    onClick={() => handleDelete(tour.id)}
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingTour ? 'Edit Tour' : 'Add New Tour'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={editingTour?.title}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arctic-blue focus:border-transparent"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                        <input
                            type="text"
                            name="slug"
                            defaultValue={editingTour?.slug}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arctic-blue focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            defaultValue={editingTour?.description || ''}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arctic-blue focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (DKK)</label>
                            <input
                                type="number"
                                name="price_dkk"
                                defaultValue={editingTour?.price_dkk}
                                required
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arctic-blue focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                            <input
                                type="number"
                                name="max_guests"
                                defaultValue={editingTour?.max_guests || 7}
                                required
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arctic-blue focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            defaultValue={editingTour?.duration || ''}
                            placeholder="e.g. 3 hours"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-arctic-blue focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_active"
                            id="is_active"
                            defaultChecked={editingTour?.is_active ?? true}
                            className="rounded border-gray-300 text-arctic-blue focus:ring-arctic-blue"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active (visible to public)</label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-arctic-blue rounded-lg hover:bg-arctic-blue/90 disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Tour'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
