import React, { useState } from 'react';
import { AdminUser } from '../types';
import { X, UserCheck } from 'lucide-react';

interface AssignAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAssign: (userId: number, userName: string) => void;
    users: AdminUser[];
    t: (key: any) => string;
}

const AssignAlertModal: React.FC<AssignAlertModalProps> = ({ isOpen, onClose, onAssign, users, t }) => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    if (!isOpen) return null;

    const assignableUsers = users.filter(u => u.role === 'monitor' || u.role === 'editor');
    
    const handleAssign = () => {
        if (selectedUserId) {
            const user = users.find(u => u.id === selectedUserId);
            if(user) {
                onAssign(selectedUserId, user.name);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <header className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-gray-800">{t('admin.alerts.assign_to')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </header>
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">اختر المستخدم المسؤول عن متابعة هذا التنبيه:</p>
                    <div className="space-y-2">
                        {assignableUsers.map(user => (
                            <label key={user.id} className={`flex items-center gap-3 p-3 rounded-md border-2 cursor-pointer transition-all ${selectedUserId === user.id ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="user-assignment" value={user.id} checked={selectedUserId === user.id} onChange={() => setSelectedUserId(user.id)} className="focus:ring-press-blue h-4 w-4 text-press-blue border-gray-300" />
                                <div>
                                    <span className="font-semibold text-gray-800">{user.name}</span>
                                    <span className="text-xs text-gray-500 block">{user.role}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
                 <footer className="flex justify-end items-center p-4 border-t bg-gray-50 space-x-2 space-x-reverse">
                    <button onClick={onClose} type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        {t('admin.crud.cancel')}
                    </button>
                    <button onClick={handleAssign} disabled={!selectedUserId} type="button" className="px-6 py-2 text-sm font-medium text-white bg-press-blue border border-transparent rounded-md shadow-sm hover:bg-blue-900 flex items-center gap-2 disabled:opacity-50">
                        <UserCheck className="w-4 h-4" />
                        {t('admin.alerts.assign')}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AssignAlertModal;