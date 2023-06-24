import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatDistance } from 'date-fns'
import { Check, DoneAll, Money } from '@mui/icons-material'
import { Button, Divider, Grid, Typography } from '@mui/material'
import CustomPageTable from '../../components/CustomPageTable/CustomPageTable'
import Loader from '../../components/Loader/Loader'
import es from 'date-fns/locale/es'
import { LocalShipping, Paid, Link } from '@mui/icons-material'

const NotificationScreen = () => {
  const [data, setData] = useState([])

  const { userInfo } = useSelector((state) => state.userLogin)
  const { notificationListData, loadingNotificationList } = useSelector((state) => state.notificationList)

  useEffect(() => {
    if (notificationListData) {
      setData(notificationListData)
    }
  }, [notificationListData])
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const href = window.location.href.substring(
      window.location.href.lastIndexOf('#') + 1,
    );
    if (window.location.href.lastIndexOf('#') > 0) {
      document.getElementById(href)?.scrollIntoView();
    }
   });

  return (
    <CustomPageTable pageName='Notificaciones'>
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '40px',
            alignItems: 'center',
          }}
        >
          <h4 style={{ fontSize: '2rem', fontWeight: '600' }}>Notificaciones</h4>
          {userInfo && userInfo.role === 'superadministrator' && (
            <Button startIcon={<Money />} variant='contained' color='secondary'>
              Nueva notificacion
            </Button>
          )}
        </div>
        {loadingNotificationList ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </div>
        ) : (
          <>
            <Grid container justifyContent='center'>
              {data.map((item) => (
                <Grid item xs={11} id={item._id} style={{ padding: 'l0px', margin: '12px 0' }} key={item._id}>
                  <Typography noWrap fontWeight='bold' style={{ display: 'flex', alignItems: 'center' }}>
                    <Link style={{ marginRight: '8px' }} color='primary' />
                    {item.title}
                  </Typography>
                  <Typography noWrap>{item.message}</Typography>
                  <Typography noWrap textAlign='end'>
                    {formatDistance(new Date(item.created), new Date(), { addSuffix: true, locale: es })}
                  </Typography>
                  <Typography noWrap variant='body2' textAlign='end'>
                    {!item.view ? 'No leido' : <DoneAll color='success' />}
                  </Typography>
                  <Divider variant='middle' style={{ paddingBottom: '14px' }} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </>
    </CustomPageTable>
  )
}

export default NotificationScreen
