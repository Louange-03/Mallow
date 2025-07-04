
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, MessageCircle, Phone, ArrowLeft, Star, ChevronRight } from 'lucide-react';
import ReviewModal from './ReviewModal';
import MessageModal from './MessageModal';
import ProfileView from './ProfileView';

const AppointmentsList = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const upcomingAppointments = [
    {
      id: 1,
      date: '22 mars 2022',
      time: '11h30',
      institute: 'Nails Lab',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,8 km',
      service: 'Pose vernis semi permanent',
      status: 'confirmed',
      logo: '💅'
    }
  ];

  const pastAppointments = [
    {
      id: 2,
      date: '16 mars 2022',
      time: '11h30',
      institute: 'Nails Lab',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,8 km',
      service: 'Pose vernis semi permanent',
      status: 'completed',
      logo: '💅'
    },
    {
      id: 3,
      date: '02 mars 2022',
      time: '9h30',
      institute: 'Nails Lab',
      address: 'Vernis semi permanent pieds',
      distance: '1,8 km',
      service: 'Vernis semi permanent pieds',
      status: 'completed',
      logo: '💅'
    },
    {
      id: 4,
      date: '18 février 2022',
      time: '17h30',
      institute: 'Nails Lab',
      address: '12 Rue Alexandre Boutin, 69100 Villeurbanne',
      distance: '1,8 km',
      service: 'Manucure complète',
      status: 'completed',
      logo: '💅'
    }
  ];

  const handleMoreDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleMessage = (appointment) => {
    setSelectedAppointment(appointment);
    setShowMessageModal(true);
  };

  const handleReview = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReviewModal(true);
  };

  if (showProfile) {
    return <ProfileView onBack={() => setShowProfile(false)} />;
  }

  const renderAppointment = (appointment, isPast = false) => (
    <div key={appointment.id} className="bg-white mx-4 mb-3 rounded-lg">
      <div className="flex items-center p-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center">
            <span className="text-pink-500 text-lg">{appointment.logo}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-gray-900">{appointment.institute}</h3>
              <button 
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center bg-white"
                onClick={() => handleMoreDetails(appointment)}
              >
                <ChevronRight size={12} className="text-gray-400" />
              </button>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <MapPin size={12} className="mr-1" />
              <span>{appointment.distance}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{appointment.address}</p>
            <p className="text-sm text-pink-600 cursor-pointer">Plus de détails ∨</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">{appointment.time}</div>
            <div className="text-sm text-gray-500">{appointment.date}</div>
          </div>
        </div>
      </div>

      {isPast && (
        <div className="px-4 pb-4 flex space-x-3">
          <button 
            onClick={() => handleReview(appointment)}
            className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-full text-sm font-medium"
          >
            📅 Renouveler
          </button>
          <button 
            onClick={() => handleReview(appointment)}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-full text-sm font-medium"
          >
            💬 Laisser un avis
          </button>
        </div>
      )}

      {!isPast && (
        <div className="px-4 pb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleMessage(appointment)}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <MessageCircle size={18} className="text-gray-600" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Phone size={18} className="text-gray-600" />
            </button>
          </div>
          <button className="flex items-center justify-center w-10 h-10 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors">
            <ChevronRight size={18} className="text-pink-600" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-center p-4 relative">
          <button onClick={onBack} className="absolute left-4">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Mes RDV</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 px-6 text-center font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500'
            }`}
          >
            À venir
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 px-6 text-center font-medium transition-colors ${
              activeTab === 'past'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500'
            }`}
          >
            Effectué
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4 pb-20">
        {activeTab === 'upcoming' && (
          <div>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => renderAppointment(appointment, false))
            ) : (
              <div className="text-center py-12 px-4">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun rendez-vous à venir</h3>
                <p className="text-gray-600">Vos prochains rendez-vous apparaîtront ici</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div>
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => renderAppointment(appointment, true))
            ) : (
              <div className="text-center py-12 px-4">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun rendez-vous effectué</h3>
                <p className="text-gray-600">Vos rendez-vous passés apparaîtront ici</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <button className="flex flex-col items-center space-y-1 py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">🏠</div>
            <span className="text-xs">Feed</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">🔍</div>
            <span className="text-xs">Rechercher</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2 text-pink-500">
            <Calendar size={20} />
            <span className="text-xs font-medium">MES RDV</span>
          </button>
          <button 
            onClick={() => setShowProfile(true)}
            className="flex flex-col items-center space-y-1 py-2 text-gray-400"
          >
            <div className="w-6 h-6 flex items-center justify-center">👤</div>
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      {showReviewModal && (
        <ReviewModal
          appointment={selectedAppointment}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      {showMessageModal && (
        <MessageModal
          appointment={selectedAppointment}
          onClose={() => setShowMessageModal(false)}
        />
      )}
    </div>
  );
};

export default AppointmentsList;
