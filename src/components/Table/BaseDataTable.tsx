import classNames from 'classnames';
import { DataTable, DataTableProps } from 'primereact/datatable';
import React, { CSSProperties, PropsWithChildren } from 'react';

const defaultProps: DataTableProps = {
  className: 'p-datatable-sm p-datatable-gridlines shadow-lg',
  rowHover: true,
  paginator: true,
  autoLayout: true,
  stripedRows: true,
  currentPageReportTemplate: '{totalRecords} registros totales',
  paginatorTemplate:
    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown',
  rows: 20,
  sortMode: 'multiple',
  rowsPerPageOptions: [10, 20, 40, 60, 80, 100],
  emptyMessage: 'No se han encontrado resultados',
};

export interface BaseDataTableProps extends PropsWithChildren<DataTableProps> {
  style?: CSSProperties;
}

const BaseDataTable: React.FC<BaseDataTableProps> = React.forwardRef(
  (props, ref) => {
    return (
      <DataTable
        {...defaultProps}
        {...props}
        className={classNames(defaultProps.className, props.className)}
        //@ts-ignore
        ref={ref}
      >
        {props.children}
      </DataTable>
    );
  },
);

BaseDataTable.defaultProps = defaultProps;

export default BaseDataTable;
