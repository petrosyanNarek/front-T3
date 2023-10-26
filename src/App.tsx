import React, { useState } from 'react';
import SearchForm from './components/searchForm/SearchForm';
import DataTable from './components/dataTable/DataTable';
export interface User {
  email: string;
  number: string;
  searchCount: number;
  key: number;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div>
      <SearchForm setUsers={setUsers} />
      <DataTable users={users} />
    </div>
  );
};

export default App;
