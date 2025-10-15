import { Bond } from '@/types';

interface BondsTableProps {
  bonds: Bond[];
  onDelete: (id: string) => void;
  onEdit: (bond: Bond) => void; // Новая функция для редактирования
}

export default function BondsTable({ bonds, onDelete, onEdit }: BondsTableProps) {
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  const getTotalPayoutPerYear = (bond: Bond) => {
    return bond.coupon * bond.quantity * bond.months.length;
  };

  const getMonthLabels = (payoutMonths: number[]) => {
    return payoutMonths.map(month => months[month]).join(', ');
  };

  if (bonds.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">Нет добавленных облигаций</div>
        <div className="text-gray-600 text-sm">Нажмите "Добавить облигацию" чтобы начать</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left p-4 text-gray-400 font-medium">Тикер</th>
            <th className="text-left p-4 text-gray-400 font-medium">Номинал</th>
            <th className="text-left p-4 text-gray-400 font-medium">Купон</th>
            <th className="text-left p-4 text-gray-400 font-medium">Месяцы выплат</th>
            <th className="text-left p-4 text-gray-400 font-medium">День</th>
            <th className="text-left p-4 text-gray-400 font-medium">Кол-во</th>
            <th className="text-left p-4 text-gray-400 font-medium">Год. доход</th>
            <th className="text-left p-4 text-gray-400 font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          {bonds.map((bond) => (
            <tr key={bond.id} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="p-4">
                <span className="font-mono text-blue-400">{bond.name}</span>
              </td>
              <td className="p-4">{bond.nominal.toLocaleString('ru-RU')} BYN</td>
              <td className="p-4">{bond.coupon.toLocaleString('ru-RU')} BYN</td>
              <td className="p-4">
                <div className="flex gap-1">
                  {bond.months.map(month => (
                    <span key={month} className="px-2 py-1 bg-gray-800 rounded text-xs border border-gray-700">
                      {months[month]}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4 text-center">{bond.day}</td>
              <td className="p-4 text-center">{bond.quantity}</td>
              <td className="p-4 text-green-400 font-semibold">
                +{getTotalPayoutPerYear(bond).toLocaleString('ru-RU')} BYN
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(bond)}
                    className="text-blue-400 hover:text-blue-300 px-2 py-1 rounded border border-blue-900 hover:border-blue-700 text-sm"
                  >
                    ✏️ Изменить
                  </button>
                  <button
                    onClick={() => onDelete(bond.id)}
                    className="text-red-400 hover:text-red-300 px-2 py-1 rounded border border-red-900 hover:border-red-700 text-sm"
                  >
                    🗑️ Удалить
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}