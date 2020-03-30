import React, { Component } from  'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [], //storeProducts, // []
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        taxRate: 0.1,
    }

    componentDidMount() {
        this.setProducts()
    }

    // build products array of objects without refererencing 
    // values but instead copying them, preventing originals from being changed
    // (recall that if a reference rather than copy, if change is made it also
    // changes original, hence the need for copy)
    // provides new, original fresh copies of all the objects
    setProducts = () => {
        let tempProducts = []
        storeProducts.forEach(item => {
            const singleItem = {...item}
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState(() => {
            return { products: tempProducts }
        })
    }

    getItem = id => {
        const product = this.state.products.find(item => item.id === id)
        return product
    }

    handleDetail = (id) => {
       let product = this.getItem(id)
       this.setState(() => {
           return {detailProduct: product}
       })
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products] // don't want to mutate state yet
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index] // reference to array; changes to product change the array
        product.inCart = true
        product.count = 1
        const price = product.price
        product.total = price
        //console.log('tempProducts changed with product?', tempProducts)
        this.setState(
            () => {
                return { products: tempProducts,
                    cart: [...this.state.cart, product],
                    modalProduct: product,
                }
            },
            () => { 
                // setState callback to update cart subtotal, tax, & total
                this.addTotals()
            }
        )

    }

    openModal = id => {
        const product = this.getItem(id)
        this.setState(() => {
            return {
                modalProduct: product,
                modalOpen: true
            }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increment = (id) => {
       let tempCart = [...this.state.cart]
       const selectedProduct = tempCart.find(item=>item.id === id)
       const index = tempCart.indexOf(selectedProduct)
       const product = tempCart[index]
       product.count++
       product.total =  product.price * product.count
       this.setState(
           () => { return { cart: [...tempCart ]}}, 
            () => { this.addTotals()}  
       )      
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item=>item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        product.count--
        if (product.count < 1) {
            this.removeItem(id)
        } else {
            product.total =  product.price * product.count
            this.setState(
                () => { return { cart: [...tempCart ]}}, 
                () => { this.addTotals()}  
            )    
        }
       
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products]
        let tempCart = [...this.state.cart]

        tempCart = tempCart.filter(item => item.id !== id)

        const index = tempProducts.indexOf(this.getItem(id))
        let removedProduct = tempProducts[index]
        removedProduct.inCart = false
        removedProduct.count = 0
        removedProduct.total = 0

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            //update cart totals 
            this.addTotals()
        })
    }

    /* 
    remove all items from cart 
    */
    clearCart = () => {
        this.setState(() => {
           return {
               cart: [],
           }
        },
       // in callback after state is changed
        () => {
           // set all modified products from cart back to defaults
           this.setProducts();
           // reset totals for empty cart
           this.addTotals()
       })
    }

    addTotals = () => {
        let subTotal = 0
        // go through cart array, get all totals and add to subTotal
        this.state.cart.map(item => (subTotal += item.total))
        const tempTax = subTotal * this.state.taxRate
        const tax = parseFloat(tempTax.toFixed(2))
        const total = parseFloat((subTotal + tax).toFixed(2))
        subTotal = parseFloat(subTotal.toFixed(2))
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value= {{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}
            >
                { this.props.children }
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }