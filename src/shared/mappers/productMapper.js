import ProductTableActions from '../../screens/ProductScreen/components/ProductTableActions'
import { formatNumToCurrency } from '../helpers/commonsFunctions'

const productMapper = (products, setUpdateProductState, setUpdateProductModal) => {
  const data = products.map((item) => {
    return {
      id: item._id,
      name: item.name,
      category: item.category.name,
      brand: item.brand.name,
      publicPrice: formatNumToCurrency(item.publicPrice),
      published: item.published,
      image: item.image,
      actions: (
        <>
          <ProductTableActions
            item={item}
            setUpdateProductState={setUpdateProductState}
            setUpdateProductModal={setUpdateProductModal}
          />
        </>
      ),
    }
  })
  return data
}

export default productMapper
