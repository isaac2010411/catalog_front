import { useContext } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSupplierProductsListPage } from '../../redux/actions/supplierActions'
import { AppContext } from '../../contexts/AppContext'

export default function PaginationComponent({ supplierGetProductsData }) {
  const dispatch = useDispatch()
  const { navigate } = useContext(AppContext)
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page'))

  const handlePage = (e, value) => {
    navigate(`/?page=${value}`)
    dispatch(getSupplierProductsListPage(value))
  }
  return (
    <Stack spacing={2}>
      {supplierGetProductsData && (
        <Pagination
          page={page}
          count={supplierGetProductsData.metadata[0].pages}
          color='secondary'
          onChange={handlePage}
        />
      )}
    </Stack>
  )
}
