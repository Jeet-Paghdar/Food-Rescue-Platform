import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { getDistance } from 'geolib';
import toast from 'react-hot-toast';
import { useFood } from '../context/FoodContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AvailableFoodPage.css';
import { FaList, FaMapMarkerAlt, FaRegSadTear, FaTimes } from 'react-icons/fa';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const MapView = React.lazy(() => import('./MapView'));

let DefaultIcon = L.icon({
    iconUrl: icon, iconRetinaUrl: iconRetina, shadowUrl: iconShadow,
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const FoodDetailModal = ({ item, onClose, onConfirmClaim }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onClose}><FaTimes /></button>
            <h3>{item.title}</h3>
            <div className="modal-details">
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Pickup Location:</strong> {item.location}</p>
                <p><strong>Distance:</strong> {item.distanceInKm} km away</p>
                <p><strong>Expires At:</strong> {new Date(item.expiresAt).toLocaleString('en-IN')}</p>
            </div>
            <button className="modal-confirm-btn" onClick={() => onConfirmClaim(item)}>Confirm Claim</button>
        </div>
    </div>
);

const FoodCard = React.memo(({ item, onViewClick }) => (
    <div className="food-card-enhanced">
        <div className="card-content">
            <h4>{item.title}</h4>
            <div className="card-info">
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Pickup:</strong> {item.location}</p>
                {item.distanceInKm && (<p className="distance-tag"><FaMapMarkerAlt /> <strong>{item.distanceInKm} km away</strong></p>)}
            </div>
            <button className="claim-btn" onClick={() => onViewClick(item)}>View & Claim</button>
        </div>
    </div>
));

const SkeletonCard = () => ( <div className="skeleton-card"><div className="skeleton-content"><div className="skeleton-line"></div><div className="skeleton-line short"></div><div className="skeleton-line btn"></div></div></div>);
const EmptyState = () => ( <div className="empty-state"><div className="empty-state-icon"><FaRegSadTear /></div><h4>No Listings Found</h4><p>Try adjusting your search or filter settings.</p></div>);

function AvailableFoodPage() {
    const { contributions, addClaim } = useFood();
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState('list');
    const [sortBy, setSortBy] = useState('nearest');
    const [searchTerm, setSearchTerm] = useState('');
    const [userLocation] = useState({ latitude: 18.5204, longitude: 73.8567 }); // Pune
    const [filters, setFilters] = useState({ prepared: true, bakery: true, produce: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 800);
    }, []);

    const filteredListings = useMemo(() => {
        const filtered = contributions
            .filter(item => item.status === 'Pending Pickup' && item.type === 'Donation')
            .map(item => ({
                ...item,
                distanceInKm: (getDistance(userLocation, { latitude: item.coords[0], longitude: item.coords[1] }) / 1000).toFixed(1)
            }))
            // ### THE FIX IS HERE ###
            // This now checks the correct 'foodType' property
            .filter(item => filters[item.foodType])
            .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

        const sorted = [...filtered];
        sorted.sort((a, b) => {
            if (sortBy === 'nearest') {
                return parseFloat(a.distanceInKm) - parseFloat(b.distanceInKm);
            }
            if (sortBy === 'expiresSoon') {
                return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
            }
            return 0;
        });
        
        return sorted;
    }, [searchTerm, filters, contributions, sortBy, userLocation]);

    const handleOpenModal = useCallback((item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedItem(null);
    }, []);

    const handleConfirmClaim = useCallback((claimedItem) => {
        addClaim(claimedItem);
        toast.success('Food claimed successfully!');
        handleCloseModal();
    }, [addClaim, handleCloseModal]);
    
    const handleFilterChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    };

    return (
        <div className="available-food-page">
            <aside className="filters-sidebar">
                <h3>Filter & Search</h3>
                <input type="text" placeholder="Search for food..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <h4>Food Type</h4>
                <div className="filter-group">
                    <label><input type="checkbox" name="prepared" checked={filters.prepared} onChange={handleFilterChange} /> Prepared Meals</label>
                    <label><input type="checkbox" name="bakery" checked={filters.bakery} onChange={handleFilterChange} /> Bakery</label>
                    <label><input type="checkbox" name="produce" checked={filters.produce} onChange={handleFilterChange} /> Produce</label>
                </div>
            </aside>
            <main className="results-panel">
                <div className="results-panel-header">
                    <h2>Available Food for Pickup</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <select className="sorting-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="nearest">Sort by: Nearest</option>
                            <option value="expiresSoon">Sort by: Expires Soon</option>
                        </select>
                        <div className="view-toggle">
                            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><FaList /></button>
                            <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}><FaMapMarkerAlt /></button>
                        </div>
                    </div>
                </div>
                {view === 'list' ? (
                    <div className="listings-grid">
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
                        ) : filteredListings.length > 0 ? (
                            filteredListings.map(item => (
                                <FoodCard key={item.id} item={item} onViewClick={handleOpenModal} />
                            ))
                        ) : (
                            <EmptyState />
                        )}
                    </div>
                ) : (
                    <Suspense fallback={<div className="map-container"><p>Loading Map...</p></div>}>
                        <MapView
                            listings={filteredListings}
                            userLocation={userLocation}
                            onMarkerClick={handleOpenModal}
                        />
                    </Suspense>
                )}
            </main>
            
            {isModalOpen && selectedItem && (
                <FoodDetailModal 
                    item={selectedItem}
                    onClose={handleCloseModal}
                    onConfirmClaim={handleConfirmClaim}
                />
            )}
        </div>
    );
}

export default AvailableFoodPage;