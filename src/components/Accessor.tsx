import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
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
// name,city,phone,websit
const columns = [
  // 第2引数をからのオブジェクトにすると、headerはaccessor、idはheader、cellはaccessorに紐づく値(cellのgetValue)、footerは未指定になる
  columnHelper.accessor('name', {}),
  // nameを指定してカラム定義
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
  }),
  // headerを上書き(headerが指定されていない場合はaccessorの値になる)
  columnHelper.accessor('name', {
    header: 'ヘッダーを編集',
    cell: (info) => info.getValue(),
  }),
  // idを指定
  columnHelper.accessor('name', {
    id: 'id編集',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  // idが指定されていない場合headerの値がidとなる
  columnHelper.accessor('name', {
    cell: (info) => info.column.id,
  }),
  // footerを指定
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    footer: 'フッターを指定',
  }),
  // 行の情報を合成して新しい行を作成する。第一引数がcellの中身になる
  columnHelper.accessor((row) => `${row.name}/${row.username}`, {
    header: 'ほこり',
  }),
  columnHelper.accessor('city', {
    cell: (info) => {
      console.log(info.row.getValue('name'));
      return 'デバック用列';
    },
  }),
  // オブジェクトの入れ子はやり方不明
];

export const Accessor = () => {
  // state
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

  // table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // jsx
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <button type="button" onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
};

export default Accessor;
