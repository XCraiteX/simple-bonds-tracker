'use client';
import { useEffect, useState } from 'react';
import BondsTable from '@/components/BondsTable';
import BondModal from '@/components/BondModal';
import { Bond } from '@/types';
import { api } from '@/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBond, setEditingBond] = useState<Bond | null>(null);

  const totalBalance = bonds.reduce((sum, bond) => 
    sum + (bond.nominal * bond.quantity), 0
  );

  const yearlyIncome = bonds.reduce((sum, bond) => 
    sum + (bond.coupon * bond.quantity * bond.months.length), 0
  );

  const handleAddBond = async (newBond: Bond) => {

    const response = await api.create_bond(newBond);

    if (response.status != 200) return

    setBonds([...bonds, newBond]);
    setIsModalOpen(false);
  };

  const handleEditBond = async (updatedBond: Bond) => {

    const response = await api.edit_bond(updatedBond);

    if (response.status != 200) return

    setBonds(bonds.map(bond => 
      bond.id === updatedBond.id ? updatedBond : bond
    ));
    setIsModalOpen(false);
    setEditingBond(null);
  };

  const handleDeleteBond = async (id: string) => {

    // Подтверждение удаления
    const isConfirmed = confirm('Вы действительно хотите удалить облигацию?');

    if (!isConfirmed) return

    const response = await api.delete_bond(id);

    if (response.status != 200) return
      
    setBonds(bonds.filter(bond => bond.id !== id));
  };

  const openEditModal = (bond: Bond) => {
    setEditingBond(bond);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingBond(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBond(null);
  };

  useEffect(() => {
    api.get_bonds().then(bonds => setBonds(bonds));
  }, [])

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок и статистика */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Учет облигаций
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm">Общий баланс</div>
              <div className="text-2xl font-bold text-white">
                {  
                  totalBalance ? 
                    (<>{totalBalance.toLocaleString('ru-RU')} BYN</>) : 
                    (<Skeleton className='h-7 w-26'/>) 
                }
              </div>
              {
                totalBalance ? 
                  (<p className='text-gray-500'>{(totalBalance * 0.337).toLocaleString('ru-RU')} $</p> ) : 
                  (<Skeleton className='h-5 w-20'/>)
              }
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm">Годовой доход</div>
              <div className="text-2xl font-bold text-green-400">
                { yearlyIncome ? 
                  (<>{yearlyIncome.toLocaleString('ru-RU')} BYN</>) : 
                  (<Skeleton className='h-7 w-26'/>)
                }
              </div>
              {
                yearlyIncome ? 
                  (<p className='text-gray-500'>{(yearlyIncome / 12).toLocaleString('ru-RU')} BYN</p>) : 
                  (<Skeleton className='h-5 w-20'/>)
              }
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-gray-400 text-sm">Облигаций</div>
              <div className="text-2xl font-bold text-blue-400">
                {
                  bonds.length ? 
                    (<>{(bonds.map(bond => bond.quantity).reduce((a, b) => a + b, 0)).toLocaleString('ru-RU')} шт</>) : 
                    (<Skeleton className='h-7 w-26'/>)
                }
              </div>
              {
                bonds.length ? 
                  (<p className='text-gray-500'>{bonds.length} выпусков</p>) : 
                  (<Skeleton className='h-5 w-20'/>)
              }
            </div>
          </div>
        </div>

        {/* Таблица и кнопка добавления */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Мои облигации</h2>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium border border-blue-500"
            >
              + Добавить облигацию
            </button>
          </div>

          <BondsTable 
            bonds={bonds} 
            onDelete={handleDeleteBond}
            onEdit={openEditModal}
          />
        </div>
      </div>

      <BondModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddBond}
        onEdit={handleEditBond}
        editBond={editingBond}
      />
    </div>
  );
}