import { useState, useEffect, useCallback } from 'react';
import { getAllPeople } from '@/shared/api/people.api'; // Для получения всех людей
import { searchPeople } from '@/shared/api/people.api'; // Для поиска по запросу
import { getAllDepartments, getAllDivisions } from '@/shared/api/additional.api'; // Для фильтров
import { Person } from '@/shared/interfaces/person.interface';

export const FindPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [divisions, setDivisions] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDepartmentsAndDivisions = async () => {
      try {
        const fetchedDepartments = await getAllDepartments();
        const fetchedDivisions = await getAllDivisions();
        setDepartments(fetchedDepartments);
        setDivisions(fetchedDivisions);
      } catch (err) {
        setError('Не удалось загрузить фильтры');
        console.error(err);
      }
    };

    fetchDepartmentsAndDivisions();
  }, []);

  useEffect(() => {
    const fetchAllPeople = async () => {
      setLoading(true);
      try {
        const fetchedPeople = await getAllPeople();
        setAllPeople(fetchedPeople);
        setPeople(fetchedPeople);
      } catch (err) {
        setError('Не удалось загрузить список людей');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPeople();
  }, []);

  const handleSearchChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    if (searchTerm.trim() === '') {
      setPeople(allPeople);
      return;
    }

    setLoading(true);
    try {
      const results = await searchPeople(searchTerm);
      setPeople(results);
    } catch (err) {
      setError('Не удалось выполнить поиск');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleFilterChange = useCallback(() => {
    const filteredPeople = allPeople.filter((person) => {
      const matchesDepartment =
        selectedDepartment ? person.department === selectedDepartment : true;
      const matchesDivision =
        selectedDivision ? person.division === selectedDivision : true;
      return matchesDepartment && matchesDivision;
    });
    setPeople(filteredPeople);
  }, [selectedDepartment, selectedDivision, allPeople]);

  useEffect(() => {
    handleFilterChange();
  }, [selectedDepartment, selectedDivision, handleFilterChange]);

  return (
    <div className="p-5 pt-20">
      <div className="mt-10 w-full max-w-screen-xl mx-auto p-5">
        <div className="flex justify-center gap-3">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Введите запрос..."
            className="w-96 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearchClick}
            className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none transform active:scale-95 transition-transform duration-200"
          >
            Поиск
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-5">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Все департаменты</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Все подразделения</option>
            {divisions.map((div, index) => (
              <option key={index} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10">
          {loading ? (
            <div>Загрузка...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {people.length > 0 ? (
                people.map((person) => (
                  <div
                    key={person.id}
                    className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-3"
                  >
                    <img
                      src={person.image}
                      alt={`${person.name} ${person.surname}`}
                      className="w-20 h-20 rounded-full mb-3"
                    />
                    <h3 className="text-lg font-semibold">
                      {person.name} {person.surname}
                    </h3>
                    <p className="text-sm text-gray-600">{person.jobtitle}</p>

                    {person.division && (
                      <p className="text-sm text-gray-500 mt-1">Отдел: {person.division}</p>
                    )}
                  </div>
                ))
              ) : (
                <div>Пользователи не найдены</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
