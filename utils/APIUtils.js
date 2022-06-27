class APIUtils{

 constructor(Apicontext,loginPayload){
this.Apicontext = Apicontext;
this.loginPayload = loginPayload;

}

async getToken(){
    const loginResponse = await this.Apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data:this.loginPayload
    });
    const responseData = await loginResponse.json();
    this.token = responseData.token
    return  responseData.token;
}

async createOrder(orderPayload){
    const orderReponse = await this.Apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,
        headers: {
            'Authorization': this.token,
            'Content-Type': 'application/json'
        },
    })
    const orderData = await orderReponse.json();
   return  orderData.orders[0];
}

}

module.exports = {APIUtils};