import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import CustomPageTable from '../../components/CustomPageTable/CustomPageTable'
import { getSupplierProductsList } from '../../redux/actions/supplierActions'
import ProductGrid from '../../components/ProductsGrid/ProductsGrid'
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent'
import { useSearchParams } from 'react-router-dom'
import { SUPPLIER_GET_LIST_RESET } from '../../redux/constants/supplierConstants'
import ProductFilterDatabase from './components/ProductFilerDatabase'

const SupplierProducstScreen = () => {
  const classes = {}
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page'))

  const [data, setData] = useState([])
  const [dataPage, setDataPage] = useState([])

  const { supplierGetProductsData, loadingSupplierGetProducts } = useSelector((state) => state.supplierGetProducts)
  const { loadingSupplierGetProductsPage, supplierGetProductsPageData } = useSelector(
    (state) => state.supplierGetProductsPage
  )

  useEffect(() => {
    if (!supplierGetProductsData) {
      dispatch(getSupplierProductsList())
    }
  }, [supplierGetProductsData, dispatch])

  useEffect(() => {
    if (supplierGetProductsData) {
      const brandData = supplierGetProductsData.data.map((item) => {
        const pricee =
          item.supplier.supplierName === '1422'
            ? item.price.replace('$', '')
            : item.price.replaceAll(',', '*').replaceAll('.', ',').replaceAll('*', '')
        
        const percentage = parseFloat(pricee) * 0.8 + parseFloat(pricee)
        

        return {
          ...item,
          price: parseFloat(percentage).toFixed(2),
          image: item.image,
          supplierName: item.supplier.supplierName,
          //   actions: <TableButtons item={item} />,
        }
      })
      setData(brandData)
    }

    return () => dispatch({ type: SUPPLIER_GET_LIST_RESET })
  }, [supplierGetProductsData, dispatch])

  useEffect(() => {
    if (supplierGetProductsPageData) {
      const brandData = supplierGetProductsPageData.data.map((item) => {
        const pricee =
          item.supplier.supplierName === '1422'
            ? item.price.replace('$', '')
            : item.price.replaceAll(',', '*').replaceAll('.', ',').replaceAll('*', '')
    
        const percentage = parseFloat(pricee) * 0.8 + parseFloat(pricee)
       

        return {
          ...item,
          price: parseFloat(percentage).toFixed(2),
          image: item.image,
          supplierName: item.supplier.supplierName,
          //   actions: <TableButtons item={item} />,
        }
      })
      setDataPage(brandData)
    }
  }, [supplierGetProductsPageData])

  return (
    <>
      <ProductFilterDatabase />
      <CustomPageTable pageName={'Productos'}>
        {loadingSupplierGetProducts || loadingSupplierGetProductsPage ? (
          <div className={classes.brandLoader}>
            <Loader />
          </div>
        ) : (
          <>
            {!page ? <ProductGrid data={data} /> : <ProductGrid data={dataPage} />}
            {!loadingSupplierGetProducts && !loadingSupplierGetProductsPage && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PaginationComponent supplierGetProductsData={supplierGetProductsData} />
              </div>
            )}
          </>
        )}
      </CustomPageTable>
    </>
  )
}

export default SupplierProducstScreen
