import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useEffect, useReducer, useState } from 'react';
import '../index.css';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.accessor('name', {}),
  columnHelper.accessor('phone', {}),
  columnHelper.accessor('website', {}),
];

/**
 * 使い方
 * ・sortの状態を定義
 * ・useReactTableにsortの状態と、sortのセット関数、TanstackTableから提供されているAPIのgetCoreRowModelを渡す
 * ・
 */
export const Sort = () => {
  // state
  const [sorting, setSorting] = useState<SortingState>([]); // ★ソート状態を定義

  const [data, setData] = useState<User[]>([]);
  const rerender = useReducer(() => ({}), {})[1];

  // データロード
  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const result = await response.json();
      setData(result);
    };
    fetcher();
  }, []);

  // テーブル
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting, // ★ソート状態を渡す
    },
    onSortingChange: setSorting, // ★ソートセット関数を渡す
    getSortedRowModel: getSortedRowModel(), // ★ソートに必要な値を渡す
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  // jsx
  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {/* ソートのためのクリックイベントを定義 */}
                    {header.isPlaceholder ? null : (
                      <button
                        {...{
                          type: 'button',
                          className: header.column.getCanSort() ? 'cursor_pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {/* {console.log('getCanSort', header.column.getCanSort())} */}
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                        {/* {console.log('getIsSorted', header.column.getIsSorted())} */}
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button type="button" onClick={() => rerender()}>
          Force Rerender
        </button>
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  );
};

export default Sort;
