import { useContext } from 'react';
import { ContentContext } from './ContentContext';
import { ContentHome, ContentTrinhTham, ContentVan } from './index';

function Content() {
  const { content } = useContext(ContentContext);

  switch (content) {
    case 'van':
      return <ContentVan />;
    case 'trinhtham':
      return <ContentTrinhTham />;
    default:
      return <ContentHome />;
  }
}

export default Content;
