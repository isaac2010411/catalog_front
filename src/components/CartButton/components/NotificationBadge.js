import { useContext, useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Notifications } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import { formatDistance } from 'date-fns'
import es from 'date-fns/locale/es'
import { useDispatch, useSelector } from 'react-redux'
import { SocketContext } from '../../../contexts/socketContext'
import { getNotificationList } from '../../../redux/actions/notificationActions'
import CartBadge from './CartBadge'
import NotificationModal from './NotificationModal'
import { Link } from 'react-router-dom'

const ITEM_HEIGHT = 48

export default function NotificationsBadge() {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const { socket } = useContext(SocketContext)

  const [notificationModal, setNotificationModal] = useState(false)
  const [showNotificationInfo, setShowNotificationInfo] = useState({})
  const [notificationsd, setNotifications] = useState([])

  const { notificationListData } = useSelector((state) => state.notificationList)

  useEffect(() => {
    dispatch(getNotificationList())
  }, [dispatch])

  useEffect(() => {
    if (notificationListData) {
      setNotifications(notificationListData)
    }
  }, [notificationListData])

  useEffect(() => {
    socket.on('new-notification', (payload) => {
      setNotifications((prev) => [payload, ...prev])
    })
  }, [socket])

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <CartBadge badgeContent={notificationsd.map((i) => i.view === false).length} color='secondary'>
          <Notifications />
        </CartBadge>
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
          },
        }}
      >
        {notificationsd.map((option) => (
          <MenuItem key={option._id}>
            <Link to={`/notifications?#${option._id}`} style={{textDecoration:'none',color:'inherit'}}>
              <Grid container>
                <Grid item xs={11} style={{ padding: 'l0px', margin: '8px 0' }}>
                  <Typography noWrap fontWeight='bold' style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <option.icon style={{ marginRight: '8px' }} /> */}
                    {option.title}
                  </Typography>
                  <Typography noWrap>{option.message.slice(0, 50)}</Typography>
                  <Typography noWrap textAlign='end'>
                    {formatDistance(new Date(option.created), new Date(), { addSuffix: true, locale: es })}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          </MenuItem>
        ))}
        <MenuItem>Ver todos</MenuItem>
      </Menu>
      {notificationModal && (
        <NotificationModal
          showNotificationInfo={showNotificationInfo}
          handleCloseNotificationModal={() => [
            setAnchorEl(null),
            setNotificationModal(false),
            setShowNotificationInfo({}),
          ]}
          notificationModal={notificationModal}
        />
      )}
    </div>
  )
}
