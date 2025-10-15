import { useState, useEffect } from 'react';
import { Bond, BondFormData } from '@/types';

interface BondModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bond: Bond) => void;
  onEdit?: (bond: Bond) => void; // Новая функция для редактирования
  editBond?: Bond | null; // Облигация для редактирования
}

export default function BondModal({ isOpen, onClose, onAdd, onEdit, editBond }: BondModalProps) {
  const [formData, setFormData] = useState<BondFormData>({
    name: '',
    nominal: 0,
    coupon: 1,
    day: 25,
    quantity: 1,
    months: []
  });
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  // Заполняем форму при редактировании
  useEffect(() => {
    if (editBond) {
      setFormData({
        name: editBond.name,
        nominal: editBond.nominal,
        coupon: editBond.coupon,
        day: editBond.day,
        quantity: editBond.quantity,
        months: editBond.months
      });
      setSelectedMonths(editBond.months);
    } else {
      // Сброс формы для добавления
      setFormData({
        name: '',
        nominal: 0,
        coupon: 1,
        day: 25,
        quantity: 1,
        months: []
      });
      setSelectedMonths([]);
    }
  }, [editBond, isOpen]);

  const toggleMonth = (monthIndex: number) => {
    setSelectedMonths(prev => 
      prev.includes(monthIndex) 
        ? prev.filter(m => m !== monthIndex)
        : [...prev, monthIndex]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bondData = {
      ...formData,
      months: selectedMonths
    };

    if (editBond && onEdit) {
      // Редактирование существующей облигации
      onEdit({
        ...bondData,
        id: editBond.id
      });
    } else {
      // Добавление новой облигации
      const newBond: Bond = {
        ...bondData,
        id: Math.random().toString(36).substr(2, 9)
      };
      onAdd(newBond);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  const isEditing = !!editBond;
  const title = isEditing ? 'Редактировать облигацию' : 'Добавить облигацию';
  const buttonText = isEditing ? 'Сохранить' : 'Добавить';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Тикер</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Тикер"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Номинал</label>
              <input
                type="number"
                value={formData.nominal}
                onChange={(e) => setFormData({...formData, nominal: +e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Купон</label>
              <input
                type="number"
                step={0.01}
                value={formData.coupon}
                onChange={(e) => setFormData({...formData, coupon: +e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">День выплаты</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.day}
                onChange={(e) => setFormData({...formData, day: +e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Количество</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: +e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Месяцы выплат</label>
            <div className="grid grid-cols-3 gap-2 max-h-42 overflow-y-hidden">
              {months.map((month, index) => (
                <label key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
                  <input
                    type="checkbox"
                    checked={selectedMonths.includes(index)}
                    onChange={() => toggleMonth(index)}
                    className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{month}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium border border-blue-500"
            >
              {buttonText}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg font-medium border border-gray-700"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}