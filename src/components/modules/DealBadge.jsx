import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../common/Badge';

export const DealBadge = ({ dealType }) => {
  const { t } = useTranslation('common');

  if (dealType === 'RENT') {
    return <Badge variant="rent">{t('dealType.rent')}</Badge>;
  }
  if (dealType === 'BUY') {
    return <Badge variant="buy">{t('dealType.buy')}</Badge>;
  }
  return <Badge variant="primary">{t('dealType.both')}</Badge>;
};

export default DealBadge;
