exports.setProductDiscount = (member, product, product_detail) => {
    product.price_gross = product.price_netto;
    // *get discount
    product_detail.discounts.map(obj => {
        var memberStatus = obj.members.find(o => o._id === member.id);
        var levelStatus = obj.members.find(o => o._id === member.level[0]._id);
        if((obj.members.length == 0 && obj.levels.length == 0) || (obj.members.length == 0)||
            (memberStatus && !levelStatus)||(!memberStatus && levelStatus)||(memberStatus && levelStatus)){
            if(obj.type == 'percent'){ 
                product.discount_percent += obj.value;
            } else {
                product.discount_price += obj.value; 
            }
            product.discounts.push(obj);
        }
    });
    if(product.discount_percent > 0){
        product.price_gross = product.price_gross - ((product.price_gross * product.discount_percent)/100);
    }
    product.price_gross = product.price_gross - product.discount_price;
    product.total_price = product.price_gross * product.quantity;
    return product;
};