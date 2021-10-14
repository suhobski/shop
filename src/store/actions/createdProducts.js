import { CREATE_PRODUCT_ERROR, CREATE_PRODUCT_SUCCESS } from './actionTypes';

export function createProductSuccess(product) {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    product,
  };
}

export function createProductError(e) {
  return {
    type: CREATE_PRODUCT_ERROR,
    error: e,
  };
}

// export function createProduct(product) {
//   return async (dispatch) => {
//     try {
//       const response = await fetch('https://fakestoreapi.com/products', {
//         method: 'POST',
//         body: JSON.stringify(product),
//       });
//       const data = await response.json();

//       const { _id } = data;
//       const newProduct = { ...product, id: _id };

//       const cachedCreatedProducts =
//         window.localStorage.getItem('createdProducts');

//       if (cachedCreatedProducts) {
//         const storageProducts = JSON.parse(cachedCreatedProducts);
//         storageProducts.push(newProduct);
//         window.localStorage.setItem(
//           'createdProducts',
//           JSON.stringify(storageProducts)
//         );
//       } else {
//         window.localStorage.setItem(
//           'createdProducts',
//           JSON.stringify([newProduct])
//         );
//       }

//       dispatch(createProductSuccess(newProduct));
//       return;
//     } catch (e) {
//       dispatch(createProductError(e));
//     }
//   };
// }
