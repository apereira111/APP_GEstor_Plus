import React from 'react';
import type { Filters } from '../types';
import { brazilianStates, citiesByState } from '../data/locations';
import { Filter } from './icons';

interface FilterBarProps {
    filters: Filters;
    onFilterChange: (filterName: keyof Filters, value: string | number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        onFilterChange(name as keyof Filters, name.includes('Year') ? parseInt(value, 10) || 0 : value);
    };

    const currentCities = filters.state !== 'BR' ? citiesByState[filters.state] || [] : [];

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-blue-600" />
                <h4 className="text-md font-semibold text-gray-800">Filtros de Análise</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* State Filter */}
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                        id="state"
                        name="state"
                        value={filters.state}
                        onChange={handleInputChange}
                        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                    >
                        <option value="BR">Brasil</option>
                        {brazilianStates.map(state => (
                            <option key={state.uf} value={state.uf}>{state.name}</option>
                        ))}
                    </select>
                </div>
                {/* City Filter */}
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                    <select
                        id="city"
                        name="city"
                        value={filters.city}
                        onChange={handleInputChange}
                        disabled={filters.state === 'BR' || currentCities.length === 0}
                        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Todas as Cidades</option>
                         {currentCities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                 {/* Start Year Filter */}
                <div>
                    <label htmlFor="startYear" className="block text-sm font-medium text-gray-700 mb-1">Ano Inicial</label>
                    <input
                        type="number"
                        id="startYear"
                        name="startYear"
                        value={filters.startYear}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                        placeholder="Ex: 2020"
                        min="2010"
                        max={new Date().getFullYear()}
                    />
                </div>

                {/* End Year Filter */}
                <div>
                    <label htmlFor="endYear" className="block text-sm font-medium text-gray-700 mb-1">Ano Final</label>
                    <input
                        type="number"
                        id="endYear"
                        name="endYear"
                        value={filters.endYear}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                        placeholder="Ex: 2024"
                        min="2010"
                        max={new Date().getFullYear()}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
