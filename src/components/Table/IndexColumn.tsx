import { Column, ColumnProps } from 'primereact/column';
import { CSSProperties, PropsWithChildren } from 'react';

export interface IndexColumnProps extends PropsWithChildren<ColumnProps> {
  style?: CSSProperties;
}

const defaultProps: IndexColumnProps = {
  style: { width: '100px' },
  className: 'text-center font-weight-bold index-column',
};

export const IndexColumn: React.FC<IndexColumnProps> = (props = null) => {
  return (
    <Column
      header="#"
      headerClassName="text-center"
      //   @ts-ignore
      body={(rowData, { rowIndex }) => rowIndex + 1}
      style={{ width: '100px' }}
      className="text-center font-weight-bold index-column"
      {...props}
    />
  );
};

IndexColumn.defaultProps = defaultProps;
