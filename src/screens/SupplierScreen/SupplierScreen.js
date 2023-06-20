import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles'
import { Card, IconButton, TextField } from '@mui/material'
import { FilterList, UploadFile } from '@mui/icons-material'
import ReactTable from '../../components/CustomReactTable/CustomReactTable'
import Loader from '../../components/Loader/Loader'
import CustomPageTable from '../../components/CustomPageTable/CustomPageTable'
import RegisterBrandModal from './components/RegisterBrandModal'
import DeleteBrandModal from './components/DeleteBrandModal'
import ViewBrandModal from './components/ViewBrandModal'
import UpdateBrandModal from './components/UpdateBrandModal'
import { getBrandList, uploadProductsFromSupplier } from '../../redux/actions/supplierActions'
import brandScreenStyles from './styles/brandScreenStyles'

const useStyles = makeStyles(brandScreenStyles)

const TableButtons = ({ item }) => {
  console.log(item)
  const dispatch = useDispatch()

  const onChange = (e) => {
    e.preventDefault()
    const supplierData = {
      _id: e.target.id,
      simpleNoteFile: e.target.files[0],
    }
    dispatch(uploadProductsFromSupplier(supplierData))
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <IconButton color='primary' aria-label='upload picture' component='label'>
        <input hidden accept='text/plain' onChange={onChange} id={item._id} type='file' />
        <UploadFile />
      </IconButton>
      <ViewBrandModal item={item} />
      <UpdateBrandModal item={item} />
      <DeleteBrandModal item={item} />
    </div>
  )
}

const SupplierScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const { brandRegisterData } = useSelector((state) => state.brandRegister)
  const { brandUpdateData } = useSelector((state) => state.brandUpdate)
  const { brandGetListData, successBrandGetList, loadingBrandGetList } = useSelector((state) => state.brandGetList)
  const { brandDeleteData } = useSelector((state) => state.brandDelete)

  useEffect(() => {
    dispatch(getBrandList())
  }, [dispatch])

  useEffect(() => {
    if (successBrandGetList) {
      const brandData = brandGetListData.map((item) => {
        return {
          id: item._id,
          supplierName: item.supplierName,
          supplierPhone: item.supplierPhone,
          supplierAddress: item.supplierAddress,
          actions: <TableButtons item={item} />,
        }
      })
      setData(brandData)
    }
  }, [successBrandGetList, brandGetListData])
  useEffect(() => {
    if (brandRegisterData) {
      setData((prev) => [
        ...prev,
        {
          id: brandRegisterData._id,
          supplierName: brandRegisterData.supplierName,
          supplierPhone: brandRegisterData.supplierPhone,
          supplierAddress: brandRegisterData.supplierAddress,
          actions: <TableButtons item={brandRegisterData} />,
        },
      ])
    } else if (brandUpdateData) {
      setData((prev) =>
        prev.map((item) => {
          if (item.id === brandUpdateData.brand._id) {
            return {
              ...item,
              id: brandUpdateData.brand._id,
              name: brandUpdateData.brand.name,
              categoryId: brandUpdateData.category._id,
              category: brandUpdateData.category.name,
              actions: <TableButtons item={{ ...brandUpdateData.brand, category: brandUpdateData.category }} />,
            }
          }
          return item
        })
      )
    } else if (brandDeleteData) {
      setData((prev) => prev.filter((item) => item.id !== brandDeleteData._id))
    }
  }, [brandRegisterData, brandUpdateData, brandDeleteData])

  return (
    <CustomPageTable pageName={'Proveedores'}>
      <div className={classes.brandTitleContainer}>
        <h4 className={classes.brandTitle}>Proveedores</h4>
        <RegisterBrandModal />
      </div>
      {loadingBrandGetList ? (
        <div className={classes.brandLoader}>
          <Loader />
        </div>
      ) : (
        <Card>
          <div className={classes.brandTableHeader}>
            <TextField id='brand' label='Buscar marca' variant='outlined' />
            <IconButton>
              <FilterList />
            </IconButton>
          </div>
          <ReactTable
            columns={[
              {
                Header: 'Nombre',
                accessor: 'supplierName',
              },
              {
                Header: 'Telefono',
                accessor: 'supplierPhone',
              },
              {
                Header: 'Direccion',
                accessor: 'supplierAddress',
              },

              {
                Header: '',
                accessor: 'actions',
                Cell: (prop) => <div style={{ textAlign: 'end' }}>{prop.row.original.actions}</div>,
              },
            ]}
            data={data}
          />
        </Card>
      )}
    </CustomPageTable>
  )
}

export default SupplierScreen
