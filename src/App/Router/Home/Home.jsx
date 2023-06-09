import React, { memo } from 'react'
import { useTranslation } from 'common/i18n'
import { Typography } from '@mui/material'

const Home = () => {

  const { t } = useTranslation()

  return (
    <Typography variant='h2' align='center' color='grey'>
      {t('Welcome to TODO')}
    </Typography>
  )

}

export default memo(Home)
