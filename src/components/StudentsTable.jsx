// StudentsTable.jsx
import React from 'react';
import { useReactTable, createColumnHelper, getCoreRowModel } from '@tanstack/react-table';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/StudentsTable.module.css';

const StudentsTable = ({ data }) => {
    const {id} = useParams()
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((_, index) => index + 1, {
      id: 'lista',
      header: 'Lista',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('apellidos', {
      header: 'Apellidos',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('nombre', {
      header: 'Nombre(s)',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('correo', {
      header: 'Correo',
      cell: info => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles['table-container']}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={styles.tr}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={styles.th}>
                  {header.isPlaceholder ? null : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={styles.td}>
                  <Link 
                    to={`/student/group/${id}/${row.original.id}`} 
                    style={{ color: 'inherit', textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
                  >
                    {cell.renderValue()}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
