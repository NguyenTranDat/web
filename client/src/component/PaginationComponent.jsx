import React, { useContext } from 'react';
import { Pagination } from 'antd';

import { PageContext } from './consequence';

export const PaginationComponent = () => {
    const { currentPage, setCurrentPage, itemsPerPage, searchResults } = useContext(PageContext);

    const onChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={searchResults.length}
            onChange={onChange}
        />
    );
};
