import React from 'react';
import { Badge } from '../common/Badge';

export const DealBadge = ({ dealType }) => {
  if (dealType === 'RENT') {
    return <Badge variant="rent">Ижара (Аренда)</Badge>;
  }
  if (dealType === 'BUY') {
    return <Badge variant="buy">Сатып алуу</Badge>;
  }
  return <Badge variant="primary">Ижара же Сатуу</Badge>;
};

export default DealBadge;
