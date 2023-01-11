import { SelectComponent } from 'components/FormComponents/SelectComponent';
import { Pagination } from 'components/pagination/Pagination';
import { FC } from 'react';

interface INavigationProps {
  currentPage: number;
  teamsPlayersCount: number;
  PageSize: number;
  onPageChange: (Page: number) => void;
  onPaginationSelectChange: (pageSize: string) => void;
}

export const Navigation: FC<INavigationProps> = ({
  currentPage,
  teamsPlayersCount,
  PageSize,
  onPageChange,
  onPaginationSelectChange,
}) => {
  const pagesAmount = Math.ceil(teamsPlayersCount / PageSize);

  const paginationSelectOptions = [
    { value: 6, label: 6, isDisabled: PageSize === 6 },
    { value: 12, label: 12, isDisabled: PageSize === 12 },
    { value: 24, label: 24, isDisabled: PageSize === 24 },
  ];

  const paginationSelectDefaultValue = paginationSelectOptions.find((option) => option.value === 6);
  const paginationSelectValue = paginationSelectOptions.find((option) => option.value === PageSize);

  return (
    <>
      <Pagination currentPage={currentPage} pagesAmount={pagesAmount} onPageChange={onPageChange} />
      <SelectComponent<'pagination_select'>
        name="pagination_select"
        isMulti={false}
        options={paginationSelectOptions}
        menuPlacement={'top'}
        defaultValue={paginationSelectDefaultValue}
        value={paginationSelectValue}
        border={true}
        onChange={onPaginationSelectChange}
      />
    </>
  );
};
