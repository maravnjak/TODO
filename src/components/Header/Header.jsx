import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'common/i18n'

const Header = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Button component={Link} to='/register' style={{ color: 'grey', fontSize: '20px' }}>{t('Register')}</Button>
    </div>
  )
}

export default Header
