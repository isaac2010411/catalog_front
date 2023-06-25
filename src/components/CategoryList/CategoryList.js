import { useContext, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Tabs, Tab, Box } from '@mui/material'
import { AppContext } from '../../contexts/AppContext'
import styles from './styles/categoryListStyles'

const useStyles = makeStyles(styles)

export default function CategotyList() {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const [categories, setCategories] = useState([
    {
      _id: '0',
      name: 'Todos',
    },
    {
      _id: '1',
      name: 'Sustratos',
    },
    {
      _id: '2',
      name: 'Parafernalia',
    },
    {
      _id: '3',
      name: 'Carpas',
    },
    {
      _id: '4',
      name: 'Iluminacion',
    },
    {
      _id: '5',
      name: 'Funguicidas',
    },
    {
      _id: '6',
      name: 'Fertilizantes',
    },
    {
      _id: '7',
      name: 'Bandejas',
    },
    {
      _id: '8',
      name: 'Indumentaria',
    },
    {
      _id: '9',
      name: 'Papelillos',
    },
    {
      _id: '10',
      name: 'Macetas',
    },
    {
      _id: '12',
      name: 'Sustratos',
    },
    {
      _id: '13',
      name: 'Fertilizantes',
    },
    {
      _id: '14',
      name: 'Bandejas',
    },
    {
      _id: '15',
      name: 'Indumentaria',
    },
    {
      _id: '16',
      name: 'Papelillos',
    },
    {
      _id: '17',
      name: 'Macetas',
    },
    {
      _id: '18',
      name: 'Sustratos',
    },
  ])

  const { productGetAllData, loadingProductGetAll } = useContext(AppContext)

  // useEffect(() => {
  //   if (productGetAllData) {
  //     setCategories((prev) => [...prev, ...productGetAllData.categories])
  //   }
  // }, [productGetAllData])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      {loadingProductGetAll ? (
        <div />
      ) : (
        <Tabs
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
          indicatorColor='secondary'
          textColor='secondary'
          style={{
            backgroundColor: 'white',
            margin: '.1rem 0 .1rem 0',
            borderRadius: '13px',
          }}
          aria-label='scrollable auto tabs example'
        >
          {categories.map((category) => (
            <Tab key={category._id} className={classes.indicator} label={category.name} />
          ))}
        </Tabs>
      )}
    </Box>
  )
}
