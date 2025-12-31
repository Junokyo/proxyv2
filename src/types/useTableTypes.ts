// ----------------------------------------------------------------------

export type TableProps = {
  dense: boolean;
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  //
  selected: string[];
  // eslint-disable-next-line no-unused-vars
  onSelectRow: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  //
  onResetPage: VoidFunction;
  // eslint-disable-next-line no-unused-vars
  onSort: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onChangePage: (event: unknown, newPage: number) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onUpdatePageDeleteRow: (totalRowsInPage: number) => void;
  onUpdatePageDeleteRows: ({
    // eslint-disable-next-line no-unused-vars
    totalRows,
    // eslint-disable-next-line no-unused-vars
    totalRowsInPage,
    // eslint-disable-next-line no-unused-vars
    totalRowsFiltered,
  }: {
    totalRows: number;
    totalRowsInPage: number;
    totalRowsFiltered: number;
  }) => void;
  //
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

export type TOptionType = { label: string; value: string & number }[];

export type TOptionTypeGeneral = { label: string; value: string | number }[];
