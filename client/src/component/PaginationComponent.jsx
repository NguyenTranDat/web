import React, { useContext } from 'react';
import { Layout, Pagination } from 'antd';

import { PageContext } from './consequence';

export const PaginationComponent = () => {
    const { currentPage, setCurrentPage, itemsPerPage, searchResults } = useContext(PageContext);

    const onChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <Layout>
            <div className="d-flex justify-content-center mt-4">
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={searchResults.length}
                    onChange={onChange}
                />
            </div>
        </Layout>
        
    );
};
