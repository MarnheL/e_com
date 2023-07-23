let quantity = parseInt(document.getElementById('quantity').value)
let product_price = parseInt(document.getElementById('product_price').value)
let shipping_fee = '<%- shipping_fee %>'
document.getElementById('total').value = (quantity * product_price) + parseInt(shipping_fee)
function increment(){
    if(quantity < '<%- item.product_stock %>'){
        document.getElementById('product_price').value = product_price * quantity
        quantity++
        document.getElementById('quantity').value = quantity
                document.getElementById('total').value = (document.getElementById('product_price').value = product_price * quantity) + parseInt(shipping_fee)
    }else{
        document.getElementById('add').disabled = true
    }
}
function decrement(){
    document.getElementById('product_price').value = product_price * quantity
    if(quantity > 1){
    quantity--
    }
    document.getElementById('quantity').value = quantity
    document.getElementById('total').value = (document.getElementById('product_price').value = product_price * quantity) + parseInt(shipping_fee)
    document.getElementById('add').disabled = false
}

function cod(){
    document.getElementById('image').style.display = 'none'
    document.getElementById('image').required = false
}
function gGash(){
    document.getElementById('image').style.display = 'block'
    document.getElementById('image').required = true
}
